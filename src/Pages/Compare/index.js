import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from 'Components'
import queryString from 'query-string'
import Select from 'react-select'

import * as ActionPokemon from 'Redux/Action/Pokemon'
import ImgLoader from 'Assets/loader.gif'
import ImgBroken from 'Assets/broken.png'

export default function Compare({ history }) {
	const dispatch = useDispatch()

	//List Pokemon
	const listOptions = useSelector((state) => state.pokemon.list).map((item) => ({ value: item.name, label: item.name }))
	const fetchPokemon = () => {
		dispatch(ActionPokemon.getPokemonSimpleList({ offset: 0, limit: 100 }))
	}
	useEffect(fetchPokemon, [])

	// Selected Pokemon
	const selectedList = queryString.parse(history.location.search).pokemon
		? typeof queryString.parse(history.location.search).pokemon === 'object'
			? queryString.parse(history.location.search).pokemon
			: [queryString.parse(history.location.search).pokemon]
		: []
	const selectedDetail = useSelector((state) => state.pokemon.selected)

	const handleCompare = (e) => {
		history.push({ pathname: '/compare', search: `?${queryString.stringify({ pokemon: e.map((item) => item.value) })}` })
	}

	useEffect(() => {
		if (history.location.search && selectedList[0]) selectedList.map((item) => dispatch(ActionPokemon.selectPokemon(item)))
	}, [history.location.search])

	return (
		<Fragment>
			<Layout>
				<div className='container detail'>
					<div className='detail__title'>Compare Pokemon</div>

					<Select
						placeholder='Select Pokemon'
						defaultValue={selectedList.map((item) => ({ value: item, label: item }))}
						options={listOptions}
						isMulti
						onChange={(e) => {
							handleCompare(e)
						}}
					/>

					<div className='detail__grid'>
						{selectedList.length === 0
							? null
							: selectedDetail.map((detailPokemon) => (
									<div className='detail__sprites'>
										<div className='detail__title'>{detailPokemon?.name}</div>
										<img
											className='detail__sprites__img'
											src={detailPokemon?.sprites.front_default ?? ImgLoader}
											onError={(e) => {
												e.target.onError = null
												e.target.src = ImgBroken
											}}
											alt='sprites.front_default'
										/>

										<table className='detail__table'>
											<tr>
												<th>Info</th>
												<th>Value</th>
											</tr>
											<tr>
												<td>species</td>
												<td>{detailPokemon?.species.name}</td>
											</tr>
											<tr>
												<td>Moves</td>
												<td>{detailPokemon?.moves.map((item) => item.move.name).join(', ')}.</td>
											</tr>
											<tr>
												<td>Types</td>
												<td>{detailPokemon?.types.map((item) => item.type.name).join(', ')}.</td>
											</tr>
											<tr>
												<td>Abilities</td>
												<td>{detailPokemon?.abilities.map((item) => item.ability.name).join(', ')}.</td>
											</tr>
										</table>
									</div>
							  ))}
					</div>
				</div>
			</Layout>
		</Fragment>
	)
}
