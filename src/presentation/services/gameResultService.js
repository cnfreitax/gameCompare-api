import { Positions } from '../../domain/models/competitionPosition.js'
import { InvalidParamError } from '../shared/errors/invalidParams.js'
import { badResquest, serverError } from '../shared/http-helpers/errors.js'
import { fake } from './fake.js'

export class GameResultService {
	#compareByNote(games) {
		return games.sort((a, b) => (a.nota > b.nota ? -1 : 1))[0]
	}

	#compareByReleaseYear(games) {
		return games.sort((a, b) => (a.ano > b.ano ? -1 : 1))[0]
	}

	#compareByName(games) {
		return games.sort((a, b) => (a.titulo > b.titulo ? 1 : -1))[0]
	}

	#availableToCompareByReleaseYear(games) {
		return games[0].nota === games[1].nota && games[0].ano !== games[1].ano
	}

	#availableToCompareByNote(games) {
		return games[0].nota !== games[1].nota
	}

	async generateResult(selectedGames = fake) {
		try {
			const fases = [[...selectedGames], [], []]

			const validGame = selectedGames.length != 8
			if (validGame)
				return badResquest(new InvalidParamError('Maximum choices exceeded'))

			for (let faseIndex = 0; faseIndex < fases.length; faseIndex++) {
				const currentFase = fases[faseIndex]
				const nextFase = fases[faseIndex + 1]

				for (let i = 0; i < currentFase.length / 2; i++) {
					const games = [
						currentFase[i],
						currentFase[currentFase.length - (1 + i)],
					]

					let roundResult

					if (this.#availableToCompareByReleaseYear(games)) {
						roundResult = this.#compareByReleaseYear(games)
					} else if (this.#availableToCompareByNote(games)) {
						roundResult = this.#compareByNote([games[0], games[1]])
					} else {
						roundResult = this.#compareByName([games[0], games[1]])
					}

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
}
