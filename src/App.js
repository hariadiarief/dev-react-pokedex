import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NotFound from './Pages/NotFound'
import { publicRoutes } from './Routes'

function App() {
	return (
		<Router>
			<Switch>
				{publicRoutes.map((route, index) => (
					<Route exact={route.exact} path={route.path} component={route.component} key={index} />
				))}
				<Route exact component={NotFound} key='404' />
			</Switch>
		</Router>
	)
}

export default App
