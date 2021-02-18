import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import storeRedux from './Redux'
import './Style/Main.scss'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={storeRedux}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
