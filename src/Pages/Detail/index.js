import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from 'Components'

import * as ActionPokemon from 'Redux/Action/Pokemon'
import ImgLoader from 'Assets/loader.gif'
import ImgBroken from 'Assets/broken.png'

export default function DetailPokemon({ match }) {
	const dispatch = useDispatch()

	const detailPokemon = useSelector((state) => state.pokemon.detail)
	useEffect(() => {
		dispatch(ActionPokemon.getPokemonDetail(match.params.id))
	}, [])

	return (
		<Fragment>
			<Layout>
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
				</div>
			</Layout>
		</Fragment>
	)
}
