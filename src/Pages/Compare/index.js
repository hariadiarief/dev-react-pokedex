import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from 'Components'
import queryString from 'query-string'
import Select from 'react-select'

import * as ActionPokemon from 'Redux/Action/Pokemon'
import ImgLoader from 'Assets/loader.gif'
import ImgBroken from 'Assets/broken.png'

export default function Compare({ match, history }) {
	const pokemon = queryString.parse(history.location.search).pokemon
		? typeof queryString.parse(history.location.search).pokemon === 'object'
			? queryString.parse(history.location.search).pokemon
			: [queryString.parse(history.location.search).pokemon]
		: []
	const dispatch = useDispatch()

	const selected = useSelector((state) => state.pokemon.selected)
	const options = useSelector((state) => state.pokemon.list).map((item) => ({ value: item.name, label: item.name }))

	const fetchPokemon = () => {
		dispatch(ActionPokemon.getPokemonSimpleList({ offset: 0, limit: 100 }))
	}
	useEffect(fetchPokemon, [])

	const handleCompare = (e) => {
		history.push({ pathname: '/compare', search: `?${queryString.stringify({ pokemon: e.map((item) => item.value) })}` })
	}

	useEffect(() => {
		if (history.location.search && pokemon[0]) pokemon.map((item) => dispatch(ActionPokemon.selectPokemon(item)))
	}, [history.location.search])

	console.log(pokemon.map((item) => ({ value: item })))

	return (
		<Fragment>
			<Layout>
				<h1>Compare</h1>
				<Select
					defaultValue={pokemon.map((item) => ({ value: item, label: item }))}
					options={options}
					isMulti
					onChange={(e) => {
						handleCompare(e)
					}}
				/>
				<div className='container detail'>
					{selected.map((detailPokemon) => (
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
			</Layout>
		</Fragment>
	)
}
