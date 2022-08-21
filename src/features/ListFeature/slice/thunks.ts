import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { NoteItem } from '../types';
import { SLICE_NAME } from './types';

export const fetchNoteListThunk = createAsyncThunk(`${SLICE_NAME}/fetchNoteThunks`, async () => {
  return api.notes.fetchNoteList();
});

export const addNoteItemThunk = createAsyncThunk(
  `${SLICE_NAME}/addNoteItemThunk`,
  async (noteItem: NoteItem, { dispatch }) => {
    const response = await api.notes.addNoteItem(noteItem);
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
