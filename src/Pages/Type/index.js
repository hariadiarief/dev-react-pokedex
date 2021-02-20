import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector, useDispatch } from 'react-redux'

import * as ActionPokemon from 'Redux/Action/Pokemon'
import * as Type from 'Types'
import { Layout } from 'Components'

import ImgBroken from 'Assets/broken.png'
import ImgLoader from 'Assets/loader.gif'
import pokemon from '../../Redux/Reducer/pokemon'
import { getPokemonDetail } from '../../Redux/Action/Pokemon'

export default function Home() {
	const dispatch = useDispatch()

	const limit = 30
	const [offset, setOffset] = useState(0)
	// const pokemon = {
	// 	items: useSelector((state) => state.pokemon.detailList),
	// 	isHasMore: useSelector((state) => state.pokemon.isHasMore),
	// }

	// const fetchPokemon = () => {
	// 	dispatch(ActionPokemon.getPokemonDetailList({ offset, limit }))
	// }
	// useEffect(fetchPokemon, [])

	// useEffect(() => {
	// 	if (pokemon.items.length !== 0) fetchPokemon({ offset, limit })
	// }, [offset])

	const [pokemonByType, setPokemonByType] = useState([])
	const [detailPokemonType, setDetailPokemonType] = useState([])

	useEffect(() => {
		dispatch(ActionPokemon.getPokemonType({}))
	}, [])

	useEffect(() => {
		if (pokemonByType?.length === 0)
			dispatch(ActionPokemon.getPokemonType({})).then((response) => {
				setPokemonByType(response)
			})
	}, [pokemonByType])

	useEffect(() => {
		if (pokemonByType?.length !== 0) {
			let temp = []
			for (let index = 0; index < limit; index++) {
				dispatch(ActionPokemon.getPokemonDetail(pokemonByType[index + offset + 1].pokemon.name)).then((response) => {
					temp = temp.concat(response)
					setDetailPokemonType(temp)
				})
			}
		}
	}, [pokemonByType, offset])

	useEffect(() => {
		if (pokemonByType?.length !== 0) {
			let temp = detailPokemonType
			for (let index = 0; index < limit; index++) {
				dispatch(ActionPokemon.getPokemonDetail(pokemonByType[index + offset + 1].pokemon.name)).then((response) => {
					temp = temp.concat(response)
					setDetailPokemonType(temp)
				})
			}
		}
	}, [offset])

	console.log('pokemonByType', detailPokemonType.length)

	return (
		<Layout>
			<div className='home'>
				<div className='home__title'>Poke List</div>

				<InfiniteScroll className='home__grid container' dataLength={detailPokemonType.length} next={() => setOffset(offset + limit)} hasMore={true} loader={renderLoader()}>
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
