import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from 'Components'
import queryString from 'query-string'
import Select from 'react-select'

import * as ActionPokemon from 'Redux/Action/Pokemon'
import ImgLoader from 'Assets/loader.gif'
import ImgBroken from 'Assets/broken.png'

export default function Compare({ match, history }) {
	const { pokemon } = queryString.parse(history.location.search)
	const dispatch = useDispatch()

	const detailPokemon = useSelector((state) => state.pokemon.pokemonDetail)
	const options = useSelector((state) => state.pokemon.pokemons).map((item) => ({ value: item.name, label: item.name }))

	const fetchPokemon = () => {
		dispatch(ActionPokemon.getPokemon({ offset: 0, limit: 1 }))
	}
	useEffect(fetchPokemon, [])

	useEffect(() => {
		dispatch(ActionPokemon.getPokemonDetail(pokemon[0]))
	}, [history.location.search])

	return (
		<Fragment>
			<Layout>
				<h1>Compare</h1>
				<Select options={options} />
				<div className='container detail'>
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

					<div className='detail__sprites'>
						<div className='detail__title'>Add Pokemon +</div>
					</div>
				</div>
			</Layout>
		</Fragment>
	)
}