import axios from 'axios'
import { serverError } from '../shared/http-helpers/errors.js'

export default class ListGameService {
	async getGameList() {
		try {
			const resultList = await axios.get(
				'https://l3-processoseletivo.azurewebsites.net/api/Competidores?copa=games'
			)
			return {games: resultList.data}


		} catch (error) {
			return serverError(error)
		}
	}
}


