import { expect, jest } from '@jest/globals'
import { GameResultService } from '../../../src/presentation/services/gameResultService.js'
import { mockGameList } from '../../mocks/gameList.js'
import { badResquest } from '../../../src/presentation/shared/http-helpers/errors.js'
import { InvalidParamError } from '../../../src/presentation/shared/errors/invalidParams.js'

const sut = new GameResultService()
const mocks = {
	wrongRequestData: mockGameList,
	validRequestData: mockGameList.splice(0, 8),
}

describe('GameResultService', () => {
	test('should throw expection if provided data length greater than 8', async () => {
		const { wrongRequestData } = mocks

		const result = await sut.generateResult(wrongRequestData)
		expect(result.statusCode).toBe(400)
		expect(result).toEqual(
			badResquest(new InvalidParamError('Maximum choices exceeded'))
		)
	})

	test('shoudl have a 7 rounds to get gaming result', async () => {
		const { validRequestData } = mocks

		const expectedCalls = 5

		const spyHandlerResultRounds = jest.spyOn(sut, 'handlerResultRounds')
		await sut.generateResult(validRequestData)
		expect(spyHandlerResultRounds).toHaveBeenCalledTimes(expectedCalls)
	})

	test('should return The Legend of Zelda: Ocarina of Time (N64) in the first position', async () => {
		const { validRequestData } = mocks
		const result = await sut.generateResult(validRequestData)
		expect(result[0].titulo).toEqual(
			'The Legend of Zelda: Ocarina of Time (N64)'
		)
	})
})
