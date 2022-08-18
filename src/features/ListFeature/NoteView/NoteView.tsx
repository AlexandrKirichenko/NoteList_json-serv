import Typography from "@mui/material/Typography";
import React, { FC, ReactNode, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import IconButton from '@mui/material/IconButton';
// import FolderDeleteIcon from '@mui/icons-material/FolderDelete';

// import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { positions } from '@mui/system';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { NoteViewItem, NoteViewList } from '../types';
import { NoteEditFormValues } from './types';
import { NoteEditForm } from './NoteEditForm';
import styles from './NoteView.module.scss';
import { UpIcon } from './Icon';

interface NoteViewProps {
  noteViewItem: NoteViewItem;
  noteViewList: NoteViewList;
  onAddItem: (parentId: string, title: string) => void;
  id: string;
  onAddSublist: (id: string) => void;
  onChangeOrder: (idA: string, idB: string) => void;
  children?: ReactNode;
  isEnableDeleteItem: boolean;
  onDeleteItem: (id: string) => void;
  onDeleteSublist: (id: string) => void;
}

const NOTE_EDIT_FORM_INITIAL_STATE: NoteEditFormValues = {
  title: '',
  formReinitializeKey: 0,
};

export const NoteView: FC<NoteViewProps> = ({
  noteViewItem,
  noteViewList,
  onAddItem,
  onAddSublist,
  id,
  children,
  onChangeOrder,
  isEnableDeleteItem,
  onDeleteItem,
  onDeleteSublist,
}) => {
  const [noteEditFormInitialState, setNoteEditFormInitialState] = useState<NoteEditFormValues>({
    ...NOTE_EDIT_FORM_INITIAL_STATE,
  });

  const handleFormSubmit = (values: NoteEditFormValues) => {
    setNoteEditFormInitialState((prev) => ({
      ...NOTE_EDIT_FORM_INITIAL_STATE,
      formReinitializeKey: prev.formReinitializeKey + 1,
    }));
    onAddItem(id, values.title);
  };

  const handleFormCancel = () => {
    setNoteEditFormInitialState((prev) => ({
      ...NOTE_EDIT_FORM_INITIAL_STATE,
      formReinitializeKey: prev.formReinitializeKey + 1,
    }));
  };

  const childListView = [...noteViewItem.childIdList].sort(
    (a, b) => noteViewList[a].order - noteViewList[b].order,
  );

  return (
    <ul className={styles.wrapper}>
      <li className={styles.listItemWrap}>
        {/*<div className={styles.itemTitle}>{noteViewItem.title}</div>*/}
        <Typography variant="h4" component="h4" sx={{ fontSize: 24 }}>
          {noteViewItem.title}
        </Typography>
        {isEnableDeleteItem && (
          <div>
            <IconButton onClick={() => onDeleteItem(id)} id={id} aria-label="delete" size="large">
              <DeleteIcon sx={{ fontSize: 36 }} />
            </IconButton>
            {noteViewItem.isEnableSubList && (
              <IconButton
                onClick={() => onDeleteSublist(id)}
                id={id}
                aria-label="delete"
                size="large"
              >
                <FolderDeleteIcon sx={{ fontSize: 36 }} />
              </IconButton>
            )}
          </div>
        )}
        {children && <div>{children}</div>}
        <div>
          {noteViewItem.isEnableSubList ? (
            <>
              <NoteEditForm
                initialValues={noteEditFormInitialState}
                onSubmit={handleFormSubmit}
                placeholder={'Type here...'}
                autoFocus={false}
                onCancel={handleFormCancel}
                id={id}
              />
            </>
          ) : (
            <IconButton onClick={() => onAddSublist(id)} id={id} aria-label="add" size="large">
              <CreateNewFolderIcon sx={{ fontSize: 36 }} />
            </IconButton>
          )}
        </div>
        <div>
          {childListView.map((childId, index) => (
            <NoteView
              noteViewItem={noteViewList[childId]}
              key={childId}
              noteViewList={noteViewList}
              onAddItem={onAddItem}
              id={childId}
              onAddSublist={onAddSublist}
              onChangeOrder={onChangeOrder}
              isEnableDeleteItem={true}
              onDeleteItem={onDeleteItem}
              onDeleteSublist={onDeleteSublist}
            >
              {index > 0 && (
                <IconButton
                  onClick={() => onChangeOrder(childListView[index], childListView[index - 1])}
                  id={id}
                  aria-label="delete"
                  size="large"
                >
                  <KeyboardArrowUpIcon sx={{ fontSize: 36 }} />
                </IconButton>
              )}
              {index < childListView.length - 1 && (
                // <div
                //   className={styles.buttonUp}
                //   onClick={() =>
                //     onChangeOrder(
                //       childListView[index + 1],
                //       childListView[index],
                //     )
                //   }
                // >
                //   <UpIcon Icon={RiArrowDownSLine} />
                // </div>
                <IconButton
                  // sx={{ zIndex: 'top' }}
                  // position="absolute"
                  onClick={() => onChangeOrder(childListView[index], childListView[index - 1])}
                  id={id}
                  aria-label="delete"
                  size="large"
                >
                  <KeyboardArrowDownIcon sx={{ fontSize: 36 }} />
                </IconButton>
              )}
            </NoteView>
          ))}
        </div>
      </li>
    </ul>
  );
};
