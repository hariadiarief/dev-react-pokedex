import axios from 'axios'
import * as Type from 'Types'

export const getPokemonSimpleList = (params) => async (dispatch) => {
	return new Promise((resolve) => {
		const { limit, offset } = params
		axios
			.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data)
				}
			})
			.catch((err) => console.log(err))
	})
}

export const getType = (params) => async (dispatch) => {
	return new Promise((resolve) => {
		return axios
			.get(`https://pokeapi.co/api/v2/type`)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data)
				}
			})
			.catch((err) => console.log(err))
	})
}

export const getPokemonByType = (type) => async (dispatch) => {
	return new Promise((resolve) => {
		return axios
			.get(`https://pokeapi.co/api/v2/type/${type}`)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data)
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
				}
			})
			.catch((err) => console.log(err))
	})
}

export const getPokemonDetailList = (params) => (dispatch) => {
	const { limit, offset } = params

	axios
		.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
		.then((response1) => {
			if (response1.status === 200) {
				response1.data.results.forEach((_, index) => {
					axios.get(`https://pokeapi.co/api/v2/pokemon/${index + offset + 1}`).then((response2) => {
						if (response2.status === 200) {
							dispatch({
								type: Type.GET_POKEMON_DETAIL_LIST,
								payload: {
									items: response2.data,
									isHasMore: response1.data.next !== null,
								},
							})
						}
					})
				})
			}
		})
		.catch((err) => console.log(err))
}

export const selectPokemonForCompare = (id) => async (dispatch) => {
	return new Promise((resolve) => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data)
				}
			})
			.catch((err) => console.log(err))
	})
}
