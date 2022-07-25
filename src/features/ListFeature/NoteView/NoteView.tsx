import { FC, ReactNode, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { NoteViewItem, NoteViewList } from '../types';
import { UpIcon } from './Icon';
import styles from './NoteView.module.scss';
import { NoteEditForm } from './NoteEditForm';
import { NoteEditFormValues } from './types';
import { Button } from './Button';

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
  const [noteEditFormInitialState, setNoteEditFormInitialState] =
    useState<NoteEditFormValues>({ ...NOTE_EDIT_FORM_INITIAL_STATE });

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
        <div className={styles.itemTitle}>{noteViewItem.title}</div>
        {isEnableDeleteItem && (
          <div>
            <Button onClick={onDeleteItem} id={id}>
              Remove{' '}
            </Button>
            {noteViewItem.isEnableSubList && (
              <Button onClick={onDeleteSublist} id={id}>
                Remove Sublist
              </Button>
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
            <Button onClick={onAddSublist} id={id}>
              {' '}
              Add Sublist
            </Button>
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
                <div
                  className={styles.buttonDown}
                  onClick={() =>
                    onChangeOrder(
                      childListView[index],
                      childListView[index - 1],
                    )
                  }
                >
                  <UpIcon Icon={RiArrowUpSLine} />
                </div>
              )}
              {index < childListView.length - 1 && (
                <div
                  className={styles.buttonUp}
                  onClick={() =>
                    onChangeOrder(
                      childListView[index + 1],
                      childListView[index],
                    )
                  }
                >
                  <UpIcon Icon={RiArrowDownSLine} />
                </div>
              )}
            </NoteView>
          ))}
        </div>
      </li>
    </ul>
  );
};
