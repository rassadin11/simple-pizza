import { Outlet, useNavigate } from 'react-router-dom';
import menu from '../../assets/menu.svg';
import cart from '../../assets/cart.svg';
import s from './Menu.module.scss';
import Button from '../../components/Button/Button';
import logout from '../../assets/logout.svg';
import userProfile from '../../assets/user_profile.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';
import MenuItem from './MenuItem';

export interface MenuElem {
	icon: string,
	text: string
	to: string
	items?: boolean
}

const menuItems: MenuElem[] = [
	{
		icon: menu,
		text: 'Меню',
		to: '/'
	},
	{
		icon: cart,
		text: 'Корзина',
		to: '/cart',
		items: true
	}
];

const Layout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { profile } = useSelector((s: RootState) => s.user);

	const handleLogout = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	return (
		<div className={s.flex}>
			<div className={s.info}>
				<div className={s.profile}>
					<img src={userProfile} alt='User profile icon' />

					<div>
						<p className={s.name}>{profile?.name}</p>
						<p className={s.email}>{profile?.email}</p>
					</div>
				</div>
				<nav className={s.nav}>
					<ul className={s.list}>
						{menuItems.map(elem => 
							<MenuItem {...elem}/>
						)}
					</ul>
				</nav>
				<div className={s.logoutButton}>
					<Button onClick={handleLogout}>
						<img src={logout} alt='Выход' className={s.img} />
						&nbsp; Выход
					</Button>
				</div>
			</div>

			<div className={s.outlet}>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
