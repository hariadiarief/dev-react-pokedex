import Home from './Pages/Home'
import Detail from './Pages/Detail'

export const publicRoutes = [
	{
		component: Home,
		path: '/',
		exact: true,
	},
	{
		component: Detail,
		path: '/pokemon/:id',
		exact: true,
	},
]
