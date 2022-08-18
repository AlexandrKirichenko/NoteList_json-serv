import { RootState } from '../types';

export const getIsAuth = (state: RootState): boolean => state.auth.isAuth;
