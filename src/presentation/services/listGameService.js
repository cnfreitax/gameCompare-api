import axios from 'axios'
import { serverError } from '../shared/http-helpers/errors.js'

export default class GameService {
	async getGameList() {
		try {
			const resultList = await axios.get(
				'https://l3-processoseletivo.azurewebsites.net/api/Competidores?copa=games'
			)
			return {data: resultList.data}


		} catch (error) {
			return serverError(error)
		}
	}
}


