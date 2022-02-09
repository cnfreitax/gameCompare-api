import { expect, afterEach } from '@jest/globals'
import { mockGameList } from '../../mocks/gameList.js'
import ListGameService from '../../../src/presentation/services/listGameService.js'
import axios from 'axios'
import axiosAdapter from 'axios/lib/adapters/http'
import nock from 'nock'

const sut = new ListGameService()

axios.defaults.adapter = axiosAdapter
const mocks = {
	gameList: mockGameList,
	mockRequest: nock('https://l3-processoseletivo.azurewebsites.net/api').get(
		'/Competidores?copa=games'
	),
}

describe('GameService', () => {
	afterEach(() => {
		nock.cleanAll()
	})

	describe('getGameList', () => {
		test('should return an game list', async () => {
			const { gameList: expectedResult, mockRequest } = mocks

			const expectedData  = {
				data: expectedResult
			}

			mockRequest.reply(200, expectedResult)

			const response = await sut.getGameList()
			expect(response).toEqual(expectedData)
		})

		test('should throw serverError with statusCode 500 if throws', async () => {
			const { mockRequest } = mocks

			mockRequest.replyWithError({
				message: 'error',
				code: 'error',
			})

			const response = await sut.getGameList()
			expect(response.statusCode).toBe(500)
		})
	})
})
