import { RegistrationData, RegistrationResponse } from './../interfaces/registration.interface';
import {
	createAsyncThunk,
	createSlice
} from '@reduxjs/toolkit';
import {loadState} from './storage';
import axios, {AxiosError} from 'axios';
import {LoginResponse} from '../interfaces/auth.interface';
import {PREFIX} from '../helpers/api';
import {Profile} from '../interfaces/user.interface';
import {RootState} from './store';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
  jwt: string | null
}

export interface userState {
  jwt: string | null
  loginErrorMessage?: string
  registerErrorMessage?: string
  profile?: Profile
}

const initialState: userState = {
	jwt:
    loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const login = createAsyncThunk(
	'user/login',
	async ({email, password}: {email: string; password: string}) => {
		try {
			const {data} = await axios.post<LoginResponse>(
				PREFIX + '/auth/login',
				{
					email,
					password
				}
			);

			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const registration = createAsyncThunk('user/register', async ({email, password, name}: RegistrationData) => {
	try {
		const response = await axios.post<RegistrationResponse>(PREFIX + '/auth/register', {
			email, password, name
		});

		return response.data;
	} catch (e) {
		if (e instanceof AxiosError) {
			throw new Error(e.response?.data.message);
		}
	}
});

export const getProfile = createAsyncThunk<
  Profile,
  void,
  {state: RootState}
>('user/profile', async (_, thunkApi) => {
	try {
		const {data} = await axios.get(PREFIX + '/user/profile', {
			headers: {
				Authorization: `Bearer ${thunkApi.getState().user.jwt}`
			}
		});

		return data;
	} catch (e) {
		if (e instanceof AxiosError) {
			throw new Error(e.response?.data.message);
		}
	}
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: state => {
			state.jwt = null;
		},
		clearLoginError: state => {
			state.loginErrorMessage = undefined;
		},
		clearRegisterError: state => {
			state.registerErrorMessage = undefined;
		}
	},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.jwt = action.payload.access_token;
		});

		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});

		builder.addCase(getProfile.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.profile = {
				email: action.payload.email,
				name: action.payload.name
			};
		});

		builder.addCase(getProfile.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});

		// registration

		builder.addCase(registration.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.jwt = action.payload.access_token;
		});

		builder.addCase(registration.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});
	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
