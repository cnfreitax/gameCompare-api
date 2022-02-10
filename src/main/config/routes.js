import { GameResultService } from '../../presentation/services/gameResultService.js'
import ListGameService from '../../presentation/services/listGameService.js'
import { handlerBuffer } from './handlerBuffer.js'

export default class Routes {
	constructor() {
		this.listGameService = new ListGameService()
		this.gameResultService = new GameResultService()
	}

	async notFound(request, response) {
		response.end('Not found')
	}

	async options(request, response) {
		response.writeHead(204)
		response.end()
	}

	async post(request, response) {
		const { body } = await handlerBuffer(request)

		console.log('opa')

		const result = await this.gameResultService.generateResult(body.data)

		response.writeHead(result.statusCode || 200)
		response.end(JSON.stringify(result))
	}

	async get(_request, response) {
		const result = await this.listGameService.getGameList()
		
		response.writeHead(result.statusCode || 200)
		response.end(JSON.stringify(result))
	}

	handler(request, response) {
		response.setHeader('Access-Control-Allow-Origin', '*')
		const chosen = this[request.method.toLowerCase()] || this.notFound
		return chosen.apply(this, [request, response])
	}
}
