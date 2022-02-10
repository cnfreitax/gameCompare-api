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

	test('should return Grand Theft Auto IV (PS3) in the first position', async () => {
		const { validRequestData } = mocks
		const result = await sut.generateResult(validRequestData)

		expect(result[0].titulo).toEqual('Grand Theft Auto IV (PS3)')
	})
})
