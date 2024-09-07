import {lazy, StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {
	createBrowserRouter,
	defer,
	RouterProvider
} from 'react-router-dom';
import App from './App.tsx';
import Cart from './pages/Cart/Cart.tsx';
import Error from './pages/Error/Error.tsx';
import Layout from './layout/Menu/Menu.tsx';
import Product from './pages/Product/Product.tsx';
import Login from './pages/Login/Login.tsx';
import AuthLayout from './layout/Auth/AuthLayout.tsx';
import RequireAuth from './helpers/RequireAuth.tsx';
import axios from 'axios';
import {PREFIX} from './helpers/api.ts';
import {Provider} from 'react-redux';
import {store} from './store/store.ts';
import Register from './pages/Register/Register.tsx';
import SuccessPage from './pages/Success/Success.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<p>Loading...</p>}>
						<Menu />
					</Suspense>
				)
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/success',
				element: <SuccessPage />
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <div>Error</div>,
				loader: async ({params}) => {
					return defer({
						data: await axios
							.get(PREFIX + '/products/' + params.id)
							.then(response => response.data)
					});
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register/>
			}
		]
	},
	{
		path: '*',
		element: <Error />
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
			<App />
		</Provider>
	</StrictMode>
);
