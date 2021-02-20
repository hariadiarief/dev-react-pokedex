import * as Type from 'Types'

const initalState = {
	detailList: {
		isHasMore: true,
		items: [],
	},
}

export default (state = initalState, { type, payload }) => {
	switch (type) {
		case Type.GET_POKEMON_DETAIL_LIST:
			return {
				...state,
				detailList: {
					...state.detailList,
					items: state.detailList.items.concat(payload),
				},
			}
		case Type.GET_POKEMON_DETAIL_LIST_IS_HAS_MORE:
			return {
				...state,
				detailList: {
					...state.detailList,
					isHasMore: payload,
				},
			}
		default:
			break
	}
	return state
}
