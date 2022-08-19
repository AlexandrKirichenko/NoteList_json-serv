import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './types';

const initialState: AppState = {
  redirectUrl: null,
};

export const { actions, reducer } = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // в компоненте RedirectExecutor отслеживаю изменение redirectUrl и делаю redirect
    // чтобы не привязывать компоненты к роутер и была возможность делать переадресацию
    // из redux-middleware без доступа напрямую к HISTORY API
    redirect: (state, action: PayloadAction<string>) => {
      state.redirectUrl = {
        path: action.payload,
      };
    },
  },
});
