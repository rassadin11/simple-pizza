import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/Title/Title';
import { AppDispatch, RootState } from '../../store/store';
import { Product } from '../../interfaces/product.interface';
import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/api';
import s from './Cart.module.css';
import CartItem from '../../components/CartItem/CartItem';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

const delivery_fee = 169;

const Cart = () => {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const total = items.map(i => {
		const product = cartProducts.find(p => p.id === i.id);
		if (!product) {
			return 0;
		}

		return i.count * product.price;
	}).reduce((acc, i) => acc += i, 0);

	const getItem = async (id: number) => {
		const {data} = await axios.get<Product>(PREFIX + '/products/' + id);
		return data;
	};

	const loadAllItems = useCallback(async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCartProducts(res);
	}, [items, setCartProducts]);

	const checkout = async () => {
		try {
			await axios.post(PREFIX + '/order', {
				products: items
			}, {
				headers: {
					'Authorization': `Bearer ${jwt}`,
					'Content-Type': 'application/json'
				}
			});

			dispatch(cartActions.clean());
			navigate('/success');
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}

			console.log(e);
		}
	};

	useEffect(() => {
		if (items.length === 0) {
			navigate('/');
		}

		loadAllItems();
	}, [items, loadAllItems, navigate]);

	return (
		<div className={s.container}>
			<Title className={s.headling}>Корзина</Title>
			{items.map(i => {
				const product = cartProducts.find(p => p.id === i.id);
				if (!product) return;
				return <CartItem key={product.id} count={i.count} {...product}/>;
			})}
			<div className={s.line}>
				<p className={s.text}>Итог</p>
				<p className={s.price}>{total}&nbsp;<span className={s.currency}>₽</span></p>
			</div>
			<hr className={s.hr}/>
			<div className={s.line}>
				<p className={s.text}>Доставка</p>
				<p className={s.price}>{delivery_fee}&nbsp;<span className={s.currency}>₽</span></p>
			</div>
			<hr className={s.hr}/>
			<div className={s.line}>
				<p className={s.text}>Итог &ndash; {items.length} т.</p>
				<p className={s.price}>{total + delivery_fee}&nbsp;<span className={s.currency}>₽</span></p>
			</div>
			<div className={s.center}>
				<Button isUpper onClick={checkout}>Оформить</Button>
			</div>
		</div>
	);
};

export default Cart;
