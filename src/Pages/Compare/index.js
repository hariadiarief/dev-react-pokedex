import React, { useEffect, Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Layout } from 'Components'
import queryString from 'query-string'
import Select from 'react-select'

import * as ActionPokemon from 'Redux/Action/Pokemon'
import ImgLoader from 'Assets/loader.gif'
import ImgBroken from 'Assets/broken.png'

export default function Compare({ history }) {
	const dispatch = useDispatch()

	//List Option Pokemon
	const [listOptions, setListOptions] = useState([])
	const fetchListOptions = () => {
		dispatch(ActionPokemon.getPokemonSimpleList({ offset: 0, limit: 100 })).then((response) =>
			setListOptions(response.results.map((item) => ({ value: item.name, label: item.name })))
		)
	}
	useEffect(fetchListOptions, [dispatch])

	// Action Select Pokemon
	const selectedList = queryString.parse(history.location.search).pokemon
		? typeof queryString.parse(history.location.search).pokemon === 'object'
			? queryString.parse(history.location.search).pokemon
			: [queryString.parse(history.location.search).pokemon]
		: []
	const [selectedListDetail, setSelectedDetail] = useState([])
	const totalAbility = selectedListDetail.map((item) => item.abilities.length).reduce((total, number) => total + number, 0)

	useEffect(() => {
		if (history.location.search && selectedList[0]) {
			let temp = []
			selectedList.forEach((item) =>
				dispatch(ActionPokemon.selectPokemonForCompare(item)).then((response) => {
					temp = temp.concat(response)
					setSelectedDetail(temp)
				})
			)
		}
		// eslint-disable-next-line
	}, [history.location.search, dispatch])

	const handleCompare = (e) => {
		history.push({ pathname: '/compare', search: `?${queryString.stringify({ pokemon: e.map((item) => item.value) })}` })
	}

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

					<div className='compare__detail__grid'>
						{selectedList.length === 0
							? null
							: selectedListDetail.map((detailPokemon) => (
									<div className='detail__sprites'>
										<div className='detail__sprites__title'>{detailPokemon?.name}</div>
										<img
											className='detail__sprites__img'
											src={detailPokemon?.sprites.front_default ?? ImgLoader}
											onError={(e) => {
												e.target.onError = null
												e.target.src = ImgBroken
											}}
											alt='sprites.front_default'
										/>

										<table className='detail__table__compare'>
											<tr>
												<td>Win Rate</td>
												<td>{((detailPokemon.abilities.length / totalAbility) * 100).toFixed(2)} %</td>
											</tr>
											<tr>
												<td>Species</td>
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
