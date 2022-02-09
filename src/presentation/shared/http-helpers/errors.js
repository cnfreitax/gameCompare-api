import { ServerError } from '../errors/serverError.js'

const serverError = (error) => ({
	statusCode: 500,
	body: new ServerError(error.stack),
})

export { serverError }
