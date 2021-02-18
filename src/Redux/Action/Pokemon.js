import axios from 'axios'
import { GET_POKEMON } from 'Types'

export const getPokemon = (params) => (dispatch) => {
	const { limit = 20, offset = 0 } = params
	axios
		.get(`https://pokeapi.co/api/v2/pokemon?limit=${20}&offset=${0}`)
		.then((response) => {
			if (response.status === 200) {
				dispatch({
					type: GET_POKEMON,
					payload: response.data.results,
				})
			}
		})
		.catch((err) => console.log(err))
}
