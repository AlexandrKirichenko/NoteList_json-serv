import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCredentials } from '../../features/login/types';
import { api } from '../../api';
import { SLICE_NAME } from './types';
import { authSlice } from './index';

export const loginThunk = createAsyncThunk(
  `${SLICE_NAME}/loginThunk`,
  async (credential: LoginCredentials, store) => {
    const response = await api.auth.login(credential);

    store.dispatch(authSlice.actions.setIsAuth(true));

    return response;
  },
);
