import { RequestSliceStateProperty, RootState } from '../../../store/types';
import { NoteList } from '../types';

export const getNoteList = (store: RootState): RequestSliceStateProperty<NoteList> =>
  store.notes.fetchNoteListRequest;
