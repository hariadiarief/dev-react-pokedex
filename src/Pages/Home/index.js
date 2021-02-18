import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as ActionPokemon from 'Redux/Action/Pokemon'
import { Layout } from 'Components'

export default function Home() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(ActionPokemon.getPokemon({}))
	}, [])

	const pokemon = useSelector((state) => state.pokemon)

	return (
		<Layout>
			<div className='home'>
				<h1>ini home</h1>
			</div>
		</Layout>
	)
}
