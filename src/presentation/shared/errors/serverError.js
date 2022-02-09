export class ServerError extends Error {
	constructor(stack) {
		super('Server error')
		this.name = 'serverError'
		this.stack = stack
	}
}