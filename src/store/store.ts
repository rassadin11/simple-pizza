import {configureStore} from '@reduxjs/toolkit';
import userSlice, {JWT_PERSISTENT_STATE} from './user.slice';
import {cacheCart, saveState} from './storage';
import cartSlice, { ITEMS_DATA } from './cart.slice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		cart: cartSlice
	}
});

store.subscribe(() => {
	saveState(JWT_PERSISTENT_STATE, {jwt: store.getState().user.jwt});
	cacheCart(ITEMS_DATA, {items: store.getState().cart.items});
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
