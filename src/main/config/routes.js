import ListGameService from '../../presentation/services/listGameService.js'

export default class Routes {
	constructor() {
		this.listGameService = new ListGameService()
	}

	async notFound(request, response) {
		response.end('Not found')
	}

	async options(request, response) {
		response.writeHead(204)
		response.end()
	}

	async post(request, response) {
		response.end()
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
