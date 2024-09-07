import {FC} from 'react';
import userProfile from '../../assets/user_profile.jpg';
import s from './Header.module.css';
import Layout from '../../layout/Menu/Menu';
import Button from '../Button/Button';
import logout from '../../assets/logout.svg';

const Header: FC = () => {
	return (
		<header className={s.header}>
			<div>
				<img src={userProfile} alt='User profile icon' />

				<p className={s.name}>Артём Рассадин</p>
				<p className={s.email}>artem.rassadin.05@mail.ru</p>
			</div>
			<div className={s.nav}>
				<Layout />
			</div>
			<div className={s.logoutButton}>
				<Button>
					<img src={logout} alt='' className={s.img} />
          &nbsp; Выход
				</Button>
			</div>
		</header>
	);
};

export default Header;
