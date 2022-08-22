import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { NoteItem } from './types';
import { getDeleteItemIdListFromNodeList, getNoteViewList } from './helpers';
import { NoteView } from './NoteView';
import { notesSlice } from './slice';

export const ListFeature: FC = () => {
  const dispatch = useAppDispatch();
  const noteListRequest = useAppSelector(notesSlice.selectors.getFetchNoteListRequest);

  useEffect(() => {
    dispatch(notesSlice.thunks.fetchNoteListThunk());
  }, []);

  if (noteListRequest.data === null) {
    return null;
  }
  const noteViewList = getNoteViewList(noteListRequest.data);

  const handleAddItem = (parentId: string, title: string) => {
    const noteItem: NoteItem = {
      parentId,
      title,
      order: new Date().getTime(),
      isEnableSubList: false,
    };

    dispatch(notesSlice.thunks.addNoteItemThunk(noteItem));
  };

  const handleAddSubList = (id: string) => {
    if (noteListRequest.data) {
      const currentNoteItem = noteListRequest.data[id];
      if (currentNoteItem) {
        const noteItem: NoteItem = {
          ...currentNoteItem,
          isEnableSubList: true,
        };
        dispatch(notesSlice.thunks.patchNoteItemThunk({ noteItem, id }));
      }
    }
  };

  const handleChangeOrder = (idA: string, idB: string) => {
    // const orderA = noteList[idA].order;
    // const orderB = noteList[idB].order;
    // setNoteList((prev) => ({
    //   ...prev,
    //   [idA]: { ...noteList[idA], order: orderB },
    //   [idB]: { ...noteList[idB], order: orderA },
    // }));
    console.log(idA, idB);

    dispatch(notesSlice.thunks.changeOrderThunk({ idA, idB }));
  };

  const handleDeleteItem = (id: string) => {
    if (noteListRequest.data) {
      const deleteItemIdListFromNodeList = getDeleteItemIdListFromNodeList(
        id,
        noteListRequest.data,
        noteViewList,
        true,
      );

      dispatch(notesSlice.thunks.deleteNodeListThunk(deleteItemIdListFromNodeList));
    }
  };

  const handleDeleteSublist = (id: string) => {
    if (noteListRequest.data) {
      const deleteItemIdListFromNodeList = getDeleteItemIdListFromNodeList(
        id,
        noteListRequest.data,
        noteViewList,
        false,
      );

      dispatch(notesSlice.thunks.deleteNodeListThunk(deleteItemIdListFromNodeList));
    }
  };

  const handleUpdateButton = () => {
    dispatch(notesSlice.thunks.fetchNoteListThunk());
  };

  return (
    <>
      <div>
        <button onClick={handleUpdateButton}>ЭТО КНОПКА ОБНОВЛЕНИЯ СПИСКА</button>
        <NoteView
          noteViewItem={noteViewList[0]}
          noteViewList={noteViewList}
          onAddItem={handleAddItem}
          id={'0'}
          onAddSublist={handleAddSubList}
          onChangeOrder={handleChangeOrder}
          isEnableDeleteItem={false}
          onDeleteItem={handleDeleteItem}
          onDeleteSublist={handleDeleteSublist}
        />
      </div>
    </>
  );
};
