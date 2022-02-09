import { ServerError } from '../errors/serverError.js'

const serverError = (error) => ({
	statusCode: 500,
	body: new ServerError(error.stack),
})

const badResquest = (error) => ({
	statusCode: 400,
	body: error,
}) 

export { serverError, badResquest }
