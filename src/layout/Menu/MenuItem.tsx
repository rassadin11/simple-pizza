import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import s from './Menu.module.scss';
import { MenuItemProps } from './Menu.props';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const MenuItem = ({icon, text, items, to}: MenuItemProps) => {
	const elems = useSelector((s: RootState) => s.cart.items);

	return (
		<li>
			<NavLink
				to={to}
				className={({ isActive }) =>
					cn({
						[s.active]: isActive
					})
				}
			>
				<img src={icon} alt={text} />
				{text}
				{items ? <span className={s.itemCount}>
					{elems.reduce((acc, item) => (acc += item.count), 0)}
				</span> : null}
			</NavLink>
		</li>
	);
};

export default MenuItem;