import Home from './Pages/Home'
import Detail from './Pages/Detail'
import Compare from './Pages/Compare'
import Type from './Pages/Type'

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
	{
		component: Type,
		path: '/type',
		exact: true,
	},
]
