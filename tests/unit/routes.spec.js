import Routes from '../../src/main/config/routes.js'
import { jest, expect } from '@jest/globals'

describe('Routes', () => {
	const sut = new Routes()

	describe('handler', () => {
		const defaultParams = {
			request: {
				headers: {
					'Content-Type': 'application/json',
				},
				method: '',
				body: '',
			},
			response: {
				setHeader: jest.fn(),
				writeHead: jest.fn(),
				end: jest.fn(),
			},
			values: () => Object.values(defaultParams),
		}

		test('given an inexistent route, should return NOT FOUND route', async () => {
			const params = {
				...defaultParams,
			}

			params.request.method = 'invalid-method'
			await sut.handler(...params.values())

			expect(params.response.end).toHaveBeenCalledWith('Not found')
		})

		test('should set any request with CORS enable', async () => {
			const params = {
				...defaultParams,
			}

			params.request.method = 'invalid-method'
			await sut.handler(...params.values())
			
			expect(params.response.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*')
		})

		test('should method OPTIONS it should choose options route', async () => {
			const params = {
				...defaultParams,
			}

			params.request.method = 'OPTIONS'
			await sut.handler(...params.values())
			
			expect(params.response.writeHead).toHaveBeenCalledWith(204)
			expect(params.response.end).toHaveBeenCalled()
		})

		test('should method POST it should choose options route', async () => {
			const params = {
				...defaultParams,
			}

			const spyMethod = jest.spyOn(sut, 'post').mockResolvedValue()
			params.request.method = 'POST'
			await sut.handler(...params.values())

			expect(spyMethod).toHaveBeenCalled()
		})

		test('should method GET it should choose options route', async () => {
			const params = {
				...defaultParams,
			}

			const spyMethod = jest.spyOn(sut, 'get').mockResolvedValue()
			params.request.method = 'GET'
			await sut.handler(...params.values())

			expect(spyMethod).toHaveBeenCalled()
		})
	})
})
