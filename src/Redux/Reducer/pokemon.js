import * as Type from 'Types'

const initalState = {
	pokemons: [],
	isHasMore: null,
	pokemonDetail: null,
}

export default (state = initalState, { type, payload }) => {
	switch (type) {
		case Type.GET_IS_HAS_MORE:
			return {
				...state,
				isHasMore: payload,
			}
		case Type.GET_POKEMON:
			return {
				...state,
				pokemons: state.pokemons.concat(payload),
			}
		case Type.GET_POKEMON_DETAIL:
			return {
				...state,
				pokemonDetail: payload,
			}
		default:
			break
	}
	return state
}
