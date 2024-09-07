import s from './Product.module.css';
import {Await, NavLink, useLoaderData} from 'react-router-dom';
import {Product} from '../../interfaces/product.interface';
import {Suspense} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import arrow from '../../assets/arrow.svg';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import cartWhite from '../../assets/cart-white.svg';
import star from '../../assets/star.svg';
import List from '../../components/List/List';

const PizzaProduct = () => {
	const {data} = useLoaderData() as {data: Product};
	const dispatch = useDispatch<AppDispatch>();

	const handleClick = () => {
		dispatch(cartActions.add(data.id));
	};

	return (
		<Suspense fallback={'Loading...'}>
			<Await resolve={data}>
				<div className={s.container}>
					<div className={s.header}>
						<div className={s.wrapper}>
							<NavLink to="/" className={s.back}>
								<img src={arrow} alt="Вернуться назад" />
							</NavLink>
							<Title>{data.name}</Title>
						</div>

						<div className={s.cart}>
							<Button onClick={handleClick}>
								<img src={cartWhite} alt='' className={s.img} />
							&nbsp; В корзину
							</Button>
						</div>
					</div>
					<div className={s.product}>
						<div style={{backgroundImage: `url(${data.image})`}} className={s.productImage}/>
						<div className={s.info}>
							<div className={`${s.flex} ${s.price}`}>
								<p className={s.text}>Цена</p>
								<p>{data.price} <span>₽</span></p>
							</div>
							<div className={`${s.flex}`}>
								<p className={s.text}>Рейтинг</p>
								<p className={s.rating}>{data.rating} <img src={star} alt='Звездочка' /></p>
							</div>
							<div className={s.receipt}>
								<p className={s.text}>Состав:</p>
								<List ingredients={data.ingredients} className={s.list}/>
							</div>

							
							<div className={s.forMobile}>
								<Button onClick={handleClick}>
									<img src={cartWhite} alt='' className={s.img} />
										&nbsp; В корзину
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Await>
		</Suspense>
	);
};

export default PizzaProduct;
