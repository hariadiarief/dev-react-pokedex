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
					items: state.detailList.items.concat(payload.items),
					isHasMore: payload.isHasMore,
				},
			}
		default:
			break
	}
	return state
}
