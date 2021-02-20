import axios from 'axios'
import * as Type from 'Types'

export const getPokemonSimpleList = (params) => (dispatch) => {
	const { limit, offset } = params
	axios
		.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
		.then((response) => {
			if (response.status === 200) {
				dispatch({
					type: Type.GET_POKEMON_SIMPLE_LIST,
					payload: response.data.results,
				})
			}
		})
		.catch((err) => console.log(err))
}

export const getPokemonType = (params) => async (dispatch) => {
	return new Promise((resolve) => {
		const { type = 1 } = params
		return axios
			.get(`https://pokeapi.co/api/v2/type/1`)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data.pokemon)

					dispatch({
						type: Type.GET_POKEMON_BY_TYPE,
						payload: response.data.pokemon,
					})
				}
			})
			.catch((err) => console.log(err))
	})
}

export const getPokemonDetail = (id) => async (dispatch) => {
	return new Promise((resolve) => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data)

					dispatch({
						type: Type.GET_POKEMON_DETAIL,
						payload: response.data,
					})
				}
			})
			.catch((err) => console.log(err))
	})
}

export const getPokemonDetailList = (params) => (dispatch) => {
	const { limit, offset } = params
	axios
		.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
		.then((response) => {
			getPokemonDetail(offset + 1)
			if (response.status === 200) {
				response.data.results.forEach((_, index) =>
					axios.get(`https://pokeapi.co/api/v2/pokemon/${index + offset + 1}`).then((response) => {
						if (response.status === 200) {
							dispatch({
								type: Type.GET_POKEMON_DETAIL_LIST,
								payload: response.data,
							})
						}
					})
				)

				dispatch({
					type: Type.GET_IS_HAS_MORE,
					payload: response.data.next !== null,
				})
			}
		})
		.catch((err) => console.log(err))
}

export const selectPokemon = (id) => (dispatch) => {
	dispatch({ type: Type.RESET_SELECT_POKEMON_DETAIL })
	axios
		.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then((response) => {
			if (response.status === 200) {
				dispatch({
					type: Type.SELECT_POKEMON_DETAIL,
					payload: response.data,
				})
			}
		})
		.catch((err) => console.log(err))
}
