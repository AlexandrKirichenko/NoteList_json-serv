import { FC } from 'react';
import { HomeMainForm } from '../features/HomeMainForm';
import { P404page } from '../pages/P404page';
import { LoginPage } from '../pages/LoginPage';

interface RouteItem {
  path: string;
  component: FC;
  isPrivate: boolean;
  isNotInPrivate: boolean;
}

export const routeNameList = ['HomePage', 'LoginPage', 'Page404'] as const;

export type Routes = typeof routeNameList[number];

export const routeList: Record<Routes, RouteItem> = {
  HomePage: {
    path: '/',
    component: HomeMainForm,
    isPrivate: true,
    isNotInPrivate: false,
  },

  LoginPage: {
    path: '/login',
    component: LoginPage,
    isPrivate: false,
    isNotInPrivate: true,
  },

  Page404: {
    path: '*',
    component: P404page,
    isPrivate: false,
    isNotInPrivate: false,
  },
};
