export class InvalidParamError extends Error {
	constructor(stack) {
		super('Inavlid Params')
		this.stack = stack
		this.name = 'InvalidParamError'
	}
}
  