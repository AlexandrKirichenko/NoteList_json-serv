import React, { FC, useEffect, useState } from 'react';
import { getUnicId } from '../../utils/getUnicId';
import styles from './ListFeature.module.scss';
import { NoteItem, NoteList } from './types';
import { deleteItemFromNodeList, getNoteViewList } from './helpers';
import { NoteView } from './NoteView';

const LS_KEY_MAX_ORDER = 'LS_KEY_MAX_ORDER';
const LS_KEY_NOTE_LIST = 'LS_KEY_NOTE_LIST';

export const ListFeature: FC = () => {
  const [noteList, setNoteList] = useState<NoteList>(() => {
    const noteListStr: string | null = localStorage.getItem(LS_KEY_NOTE_LIST);
    if (noteListStr === null) {
      return {
        1: { parentId: null, title: '', isEnableSubList: false, order: 1 },
      };
    }
    return JSON.parse(noteListStr);
  });

  const [maxOrder, setMaxOrder] = useState<number>(() => {
    const maxOrderStr: string | null = localStorage.getItem(LS_KEY_MAX_ORDER);
    if (maxOrderStr === null) {
      return 1;
    }
    return JSON.parse(maxOrderStr);
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY_MAX_ORDER, JSON.stringify(maxOrder));
  }, [maxOrder]);

  useEffect(() => {
    localStorage.setItem(LS_KEY_NOTE_LIST, JSON.stringify(noteList));
  }, [noteList]);

  const noteViewList = getNoteViewList(noteList);

  const handleAddItem = (parentId: string, title: string) => {
    const newId = getUnicId();

    const newMaxOrder = maxOrder + 1;

    setMaxOrder(newMaxOrder);

    const newNoteItem: NoteItem = {
      parentId,
      title,
      order: newMaxOrder,
      isEnableSubList: false,
    };
    setNoteList((prevState) => ({ ...prevState, [newId]: newNoteItem }));
  };

  const handleAddSubList = (id: string) => {
    setNoteList((prev) => ({
      ...prev,
      [id]: { ...prev[id], isEnableSubList: true },
    }));
  };

  const handleChangeOrder = (idA: string, idB: string) => {
    const orderA = noteList[idA].order;
    const orderB = noteList[idB].order;
    setNoteList((prev) => ({
      ...prev,
      [idA]: { ...noteList[idA], order: orderB },
      [idB]: { ...noteList[idB], order: orderA },
    }));
  };

  const handleDeleteItem = (id: string) => {
    const newNodeList = deleteItemFromNodeList(id, noteList, noteViewList, true);
    setNoteList(newNodeList);
  };

  const handleDeleteSublist = (id: string) => {
    const newNodeList = deleteItemFromNodeList(id, noteList, noteViewList, false);
    setNoteList({
      ...newNodeList,
      [id]: { ...noteList[id], isEnableSubList: false },
    });
  };

  return (
    <>
      <div>
        <NoteView
          noteViewItem={noteViewList[1]}
          noteViewList={noteViewList}
          onAddItem={handleAddItem}
          id={'1'}
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
