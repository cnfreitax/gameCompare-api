import axios from 'axios'
import { serverError } from '../shared/http-helpers/errors'

export default class GameService {
	async getGameList() {
		try {
			const { data } = await axios.get(
				'https://l3-processoseletivo.azurewebsites.net/api/Competidores?copa=games'
			)
			return data
		} catch (error) {
			return serverError(error)
		}
	}
}


