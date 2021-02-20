import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector, useDispatch } from 'react-redux'

import * as ActionPokemon from 'Redux/Action/Pokemon'
import { Layout } from 'Components'

import ImgBroken from 'Assets/broken.png'
import ImgLoader from 'Assets/loader.gif'

export default function Home() {
	const dispatch = useDispatch()

	const limit = 30
	const [offset, setOffset] = useState(0)
	const pokemon = useSelector((state) => state.pokemon.detailList)

	const fetchPokemon = () => {
		dispatch(ActionPokemon.getPokemonDetailList({ offset, limit }))
	}
	useEffect(fetchPokemon, [])

	useEffect(() => {
		if (pokemon.items.length !== 0) fetchPokemon({ offset, limit })
	}, [offset])

	return (
		<Layout>
			<div className='home'>
				<div className='home__title'>Poke List</div>
				<InfiniteScroll
					className='home__grid container'
					dataLength={pokemon.items.length}
					next={() => setOffset(offset + limit)}
					hasMore={pokemon.isHasMore}
					loader={renderLoader()}>
					{pokemon.items.length === 0
						? null
						: pokemon.items.map((pokemon, index) => {
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
				</InfiniteScroll>
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
