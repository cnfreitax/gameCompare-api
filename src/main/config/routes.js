export default class Routes {
	constructor() {}

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

	async get(request, response) {
		response.end()
	}

	handler(request, response) {
		response.setHeader('Access-Control-Allow-Origin', '*')
		const chosen = this[request.method.toLowerCase()] || this.notFound
		return chosen.apply(this, [request, response])
	}
}
