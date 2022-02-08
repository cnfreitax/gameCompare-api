import { ServerError } from '../errors/server-error.js'

const serverError = (error) => ({
	statusCode: 500,
	body: new ServerError(error.stack),
})

export { serverError }
