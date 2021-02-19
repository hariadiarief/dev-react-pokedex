import Home from './Pages/Home'
import Detail from './Pages/Detail'
import Compare from './Pages/Compare'

export const publicRoutes = [
	{
		component: Home,
		path: '/',
		exact: true,
	},

	{
		component: Compare,
		path: '/compare',
		exact: true,
	},
	{
		component: Detail,
		path: '/pokemon/:id',
		exact: true,
	},
]
