import {PizzaCardProps} from './Card.props';
import s from './Card.module.css';
import cart from '../../assets/cart_card.svg';
import star from '../../assets/star.svg';
import {useNavigate} from 'react-router-dom';
import {CSSProperties, MouseEvent} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

const PizzaCard = ({
	description,
	title,
	rate,
	price,
	img,
	uid
}: PizzaCardProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const add = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(cartActions.add(uid));
	};
  
	const handleClick = () => {
		navigate('/product/' + uid);
	};

	const style: CSSProperties = {
		backgroundImage: `url(${img})`
	};

	return (
		<div className={s.card} onClick={handleClick}>
			<div className={s.imageWrapper} style={style}>
				<div className={s.mainPart}>
					<div className={s.price}>
						<span>{price}</span> ₽
					</div>
					<span className={s.cart} onClick={add}>
						<img src={cart} alt='Добавить в корзину' />
					</span>
				</div>

				<div className={s.rating}>
					<p className={s.wrapRating}>
						<span>{rate}</span> <img src={star} alt='Звездочка' />
					</p>
				</div>
			</div>
			<div className={s.info}>
				<p className={s.title}>{title}</p>
				<p className={s.description}>{description}</p>
			</div>
		</div>
	);
};

export default PizzaCard;
