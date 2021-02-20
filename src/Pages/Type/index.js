import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector, useDispatch } from 'react-redux'

import * as ActionPokemon from 'Redux/Action/Pokemon'
import { Layout } from 'Components'

import ImgBroken from 'Assets/broken.png'
import ImgLoader from 'Assets/loader.gif'

export default function Type() {
	const dispatch = useDispatch()

	const [pokemonByType, setPokemonByType] = useState([])
	const [detailPokemonType, setDetailPokemonType] = useState([])

	useEffect(() => {
		dispatch(ActionPokemon.getPokemonType({}))
	}, [])

	useEffect(() => {
		dispatch(ActionPokemon.getPokemonType({})).then((response) => {
			setPokemonByType(response)
		})
	}, [])

	useEffect(() => {
		if (pokemonByType.length !== 0) {
			let temp = detailPokemonType
			pokemonByType.forEach((item) => {
				dispatch(ActionPokemon.getPokemonDetail(item.pokemon.name)).then((response) => {
					temp = temp.concat(response)
					setDetailPokemonType(temp)
				})
			})
		}
	}, [pokemonByType])

	return (
		<Layout>
			<div className='home'>
				<div className='home__title'>Poke List</div>
				<div className='home__grid container'>
					{detailPokemonType.length === 0
						? null
						: detailPokemonType.map((pokemon, index) => {
								return (
									<div className='home__grid__item' key={index}>
										<Link className='home__grid__item__content' to={`/pokemon/${pokemon.name}`}>
											<img
												alt={pokemon.name}
												className='home__grid__item__content__image'
												src={pokemon.sprites.front_default || ImgLoader}
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
				`
			</div>
		</Layout>
	)

	function renderLoader() {
		return Array.apply(null, Array(6)).map(() => (
			<div className='home__grid__item'>
				<Link className='home__grid__item__content'>
					<img className='home__grid__item__content__image' src={ImgLoader} alt='loader' />
					<span>Loading ...</span>
				</Link>
			</div>
		))
	}
}
