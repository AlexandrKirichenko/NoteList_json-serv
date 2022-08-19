import { RootState } from '../types';

export const getIsAuth = (state: RootState): boolean => state.auth.isAuth;

export const getLoginRequest = (state: RootState) => state.auth.loginRequest;

export const getSignUpRequest = (state: RootState) => state.auth.signUpRequest;
