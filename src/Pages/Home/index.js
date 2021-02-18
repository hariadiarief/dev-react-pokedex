import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import * as ActionPokemon from 'Redux/Action/Pokemon'
import { Layout } from 'Components'

import ImgBroken from 'Assets/broken.png'
import ImgLoader from 'Assets/loader.gif'

export default function Home() {
	const dispatch = useDispatch()

	const [offset, setOffset] = useState(0)
	const [limit, setLimit] = useState(20)

	useEffect(() => {
		dispatch(ActionPokemon.getPokemon({ offset, limit }))
	}, [])

	const pokemons = useSelector((state) => state.pokemon.pokemons)

	return (
		<Layout>
			<div className='home'>
				<div className='home__title'>Poke List</div>
				<div className='home__grid container'>
					{pokemons.length === 0
						? null
						: pokemons.map((pokemon, index) => {
								return (
									<div className='home__grid__item' key={index}>
										<Link className='home__grid__item__content' to={`/pokemon/${offset + index + 1}`}>
											<img
												className='home__grid__item__content__image'
												src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${offset + index + 1}.png` ?? ImgLoader}
												onError={(e) => {
													e.target.onError = null
													e.target.src = ImgBroken
												}}
											/>
											<span>{pokemon.name}</span>
										</Link>
									</div>
								)
						  })}
				</div>
			</div>
		</Layout>
	)
}
