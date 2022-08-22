import React, { FC, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { notesSlice } from '../../features/ListFeature/slice';
import { authSlice } from '../../store/auth';
import styles from './Spinner.module.scss';

export const Spinner: FC = () => {
  const fetchNoteListRequest = useAppSelector(notesSlice.selectors.getFetchNoteListRequest);
  const addNoteItemRequest = useAppSelector(notesSlice.selectors.getAddNoteItemRequest);
  const patchNoteItemRequest = useAppSelector(notesSlice.selectors.getPatchNoteItemRequest);
  const deleteNodeListRequest = useAppSelector(notesSlice.selectors.getDeleteNodeListRequest);
  const changeOrderRequest = useAppSelector(notesSlice.selectors.getChangeOrderRequest);

  const loginRequest = useAppSelector(authSlice.selectors.getLoginRequest);
  const signUpRequest = useAppSelector(authSlice.selectors.getSignUpRequest);

  const isLoading =
    fetchNoteListRequest.isLoading ||
    addNoteItemRequest.isLoading ||
    patchNoteItemRequest.isLoading ||
    loginRequest.isLoading ||
    signUpRequest.isLoading ||
    deleteNodeListRequest.isLoading ||
    changeOrderRequest.isLoading;

  return isLoading ? <div className={styles.Spinner} /> : null;
};
