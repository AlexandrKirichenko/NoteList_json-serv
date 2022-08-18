import { FC } from 'react';
import { P404page } from '../pages/P404page';
import { LoginPage } from '../pages/LoginPage';
import { ListFeaturePage } from '../pages/ListFeaturePage';

interface RouteItem {
  path: string;
  component: FC;
  isPrivate: boolean;
  isNotInPrivate: boolean;
}

export const routeNameList = ['ListFeaturePage', 'LoginPage', 'Page404'] as const;

export type Routes = typeof routeNameList[number];

export const routeList: Record<Routes, RouteItem> = {
  ListFeaturePage: {
    path: '/',
    component: ListFeaturePage,
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
