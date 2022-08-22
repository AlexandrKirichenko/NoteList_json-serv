import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { NoteItem } from '../types';
import { RootState } from '../../../store/types';
import { authSlice } from '../../../store/auth';
import { SLICE_NAME } from './types';

export const fetchNoteListThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchNoteThunks`,
  async (_, { getState }) => {
    const loginRequest = authSlice.selectors.getLoginRequest(getState() as RootState);
    let userId = 0;
    if (loginRequest.data?.id) {
      userId = loginRequest.data.id;
    }

    return api.notes.fetchNoteList(userId);
  },
);

export const addNoteItemThunk = createAsyncThunk(
  `${SLICE_NAME}/addNoteItemThunk`,
  async (noteItem: NoteItem, { dispatch, getState }) => {
    const loginRequest = authSlice.selectors.getLoginRequest(getState() as RootState);
    let userId = 0;
    if (loginRequest.data?.id) {
      userId = loginRequest.data.id;
    }
    const response = await api.notes.addNoteItem(noteItem, userId);
    dispatch(fetchNoteListThunk());
    return response;
  },
);

interface PatchNoteItemThunk {
  noteItem: NoteItem;
  id: string;
}

export const patchNoteItemThunk = createAsyncThunk(
  `${SLICE_NAME}/patchNoteItemThunk`,
  async ({ noteItem, id }: PatchNoteItemThunk, { dispatch }) => {
    const response = await api.notes.patchNoteItem(noteItem, id);
    dispatch(fetchNoteListThunk());

    return response;
  },
);
