import { GET_POKEMON } from 'Types'

const initalState = {
	pokemons: [],
}

export default (state = initalState, action) => {
	switch (action.type) {
		case GET_POKEMON:
			return {
				...state,
				pokemons: action.payload,
			}
		default:
			break
	}
	return state
}
