import { logger } from '../logger.js'
import { app } from './config/app.js'

const upServer = () => {
	const { address, port } = app.address()
	logger.info(`Started at http://${address}:${port}`)
}

app.listen(3000, upServer)
