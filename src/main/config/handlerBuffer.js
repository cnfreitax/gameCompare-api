export const handlerBuffer = async (request) => {
	const buffers = []

	for await (const chunk of request) {
		buffers.push(chunk)
	}

	// eslint-disable-next-line
  return { body: JSON.parse(Buffer.concat(buffers).toString()) };
}
