import { Positions } from '../../domain/models/competitionPosition.js'
import { InvalidParamError } from '../shared/errors/invalidParams.js'
import { badResquest, serverError } from '../shared/http-helpers/errors.js'

export class GameResultService {
	async generateResult(selectedGames) {
		try {
			const fases = [selectedGames, [], []]
		
			const validGame = selectedGames.length != 8
			if (validGame)
				return badResquest(new InvalidParamError('Maximum choices exceeded'))

			for (let faseIndex = 0; faseIndex < fases.length; faseIndex++) {
				const currentFase = fases[faseIndex]
				const nextFase = fases[faseIndex + 1]

				for (let i = 0; i < currentFase.length / 2; i++) {
					const roundResult = this.handlerResultRounds([
						currentFase[i],
						currentFase[currentFase.length - (1 + i)],
					])

					if (nextFase) {
						nextFase.push(roundResult)
						currentFase.splice(currentFase.indexOf(roundResult), 1)
					}
				}
			}

			const result = [].concat
				.apply([], fases)
				.reverse()
				.map(({ titulo, nota, ano }) => new Positions({ titulo, nota, ano }))

			return result
		} catch (error) {
			return serverError(error)
		}
	}

	#compareByAttribute(games, attribute) {
		return games.sort((a, b) => (a[attribute] > b[attribute] ? -1 : 1))[0]
	}


	#availableToCompareByReleaseYear(games) {
		return games[0].nota === games[1].nota && games[0].ano !== games[1].ano
	}

	#availableToCompareByNote(games) {
		return games[0].nota !== games[1].nota
	}

	handlerResultRounds(games) {
		let roundResult

		if (this.#availableToCompareByReleaseYear(games)) {
			roundResult = this.#compareByAttribute(games, 'ano')
		} else if (this.#availableToCompareByNote(games)) {
			roundResult = this.#compareByAttribute(games, 'nota')
		} else {
			roundResult = this.#compareByAttribute(games, 'titulo')
		}

		return roundResult
	}
}
