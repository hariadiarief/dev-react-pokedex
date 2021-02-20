import React, { useEffect, Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Layout } from 'Components'

import * as ActionPokemon from 'Redux/Action/Pokemon'
import ImgLoader from 'Assets/loader.gif'
import ImgBroken from 'Assets/broken.png'

export default function DetailPokemon({ match }) {
	const dispatch = useDispatch()

	const [detailPokemon, setDetailPokemon] = useState(null)
	useEffect(() => {
		dispatch(ActionPokemon.getPokemonDetail(match.params.id)).then((response) => setDetailPokemon(response))
	}, [])

	return (
		<Fragment>
			<Layout>
				<div className='container detail'>
					<div className='detail__title'>{detailPokemon?.name}</div>

					<div className='detail__sprites'>
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
