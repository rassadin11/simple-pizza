import SearchInput from '../../components/SearchInput/SearchInput';
import Title from '../../components/Title/Title';
import s from './Menu.module.css';
import {PREFIX} from '../../helpers/api';
import {Product} from '../../interfaces/product.interface';
import {useEffect, useRef, useState} from 'react';
import axios, {AxiosError} from 'axios';
import MenuList from './MenuList/MenuList';

const Menu = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<string>('');
	const [filter, setFilter] = useState<string>('');
	const ref = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		getMenu('');
	}, []);

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name: string) => {
		try {
			setIsLoading(true);
			const {data} = await axios.get<Product[]>(PREFIX + '/products', {
				params: {
					name
				}
			});
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) setIsError(e.message);
			setIsLoading(false);
			return;
		}
	};

	const searchChange = () => {
		if (ref.current) setFilter(ref.current.value);
	};

	return (
		<div>
			<div className={s.wrapper}>
				<Title>Меню</Title>
				<SearchInput placeholder='Введите блюдо или состав' ref={ref} onChange={searchChange}/>
			</div>
			<div>
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{!isLoading && products.length === 0 && <p>Продукты не найдены</p>}
				{isLoading && <p>Products are loading...</p>}
				{isError && <p>{isError}</p>}
			</div>
		</div>
	);
};

export default Menu;
