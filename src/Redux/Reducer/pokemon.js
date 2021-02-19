import * as Type from 'Types'

const initalState = {
	isHasMore: null,
	list: [],
	detail: null,
	detailList: [],
	selected: [],
}

export default (state = initalState, { type, payload }) => {
	switch (type) {
		case Type.GET_IS_HAS_MORE:
			return {
				...state,
				isHasMore: payload,
			}
		case Type.GET_POKEMON_SIMPLE_LIST:
			return {
				...state,
				list: state.detailList.concat(payload),
			}
		case Type.GET_POKEMON_DETAIL:
			return {
				...state,
				detail: payload,
			}
		case Type.GET_POKEMON_DETAIL_LIST:
			return {
				...state,
				detailList: state.detailList.concat(payload),
			}
		case Type.SELECT_POKEMON_DETAIL:
			return {
				...state,
				selected: state.selected.concat(payload),
			}
		default:
			break
	}
	return state
}
