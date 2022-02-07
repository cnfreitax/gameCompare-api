import { logger } from '../../logger.js'

export default class Routes {
	constructor() {}

	async notFound(request, response) {
		response.end('Not found')
	}

	async options(request, response) {
		response.writeHeader(204)
	}

	async post(request, response) {
		logger.info('oi')
		response.end()
	}

	async get(request, response) {
		logger.info('opa')
		response.end()
	}

	handler(request, response) {
		response.setHeader('Access-Control-Allow-Origin', '*')
		const chosen = this[request.method.toLowerCase()] || this.notFound
		return chosen.apply(this, [request, response])
	}
}
