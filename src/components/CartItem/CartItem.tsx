import s from './CartItem.module.css';
import {CSSProperties, MouseEvent} from 'react';
import { CartItemProps } from './CartItem.props';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';
import cross from '../../assets/cross.svg'; 
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';

const CartItem = ({
	count,
	name,
	price,
	image,
	id
}: CartItemProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const increase = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(id));
	};

	const decrease = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.remove(id));
	};

	const del = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.delete(id));
	};
	
	const style: CSSProperties = {
		backgroundImage: `url(${image})`
	};

	return (
		<div className={s.item}>
			<div style={style} className={s.image}></div>
			<div className={s.wrapper}>
				<div className={s.description}>
					<p className={s.name}>{name}</p>
					<div className={s.price}>
						<span>{price}</span> ₽
					</div>
				</div>
				<div className={s.actions}>
					<button className={s.minus} onClick={decrease}>
						<img src={minus} alt="Удалить" />
					</button>
					<span className={s.value}>{count}</span>
					<button className={s.plus} onClick={increase}>
						<img src={plus} alt="Добавить" />
					</button>
					<button className={s.remove} onClick={del}>
						<img src={cross} alt="Удалить все" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
