import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCredentials } from '../../features/login/types';
import { api } from '../../api';
import { SignUpData } from '../../features/SignUp/types';
import { SLICE_NAME } from './types';
import { authSlice } from './index';

export const loginThunk = createAsyncThunk(
  `${SLICE_NAME}/loginThunk`,
  async (credential: LoginCredentials, { dispatch, rejectWithValue }) => {
    //решение из доки тулкита, чтоб достучаться до msg Response от сервера, т.к. по умолчанию оно не попадает в error
    try {
      const response = await api.auth.login(credential);

      dispatch(authSlice.actions.setIsAuth(true));

      return response;
    } catch (e: any) {
      // axios прикрепляет ответ от сервера
      if (!e?.response?.data) {
        throw e;
      }
      // f от редакса которая эмулирует доп. обработчик ошибок и в него можно написать, что угодно в payload в хелперах
      return rejectWithValue(e?.response?.data);
    }
  },
);

interface SingUpThunkPayload {
  signUpData: SignUpData;
  successCb: () => void;
}

export const singUpThunk = createAsyncThunk(
  `${SLICE_NAME}/singUpThunk`,
  async ({ signUpData, successCb }: SingUpThunkPayload, { rejectWithValue }) => {
    try {
      const response = await api.auth.signUp(signUpData);
      successCb();
      return response;
    } catch (e: any) {
      if (!e?.response?.data) {
        throw e;
      }
      return rejectWithValue(e?.response?.data);
    }
  },
);
