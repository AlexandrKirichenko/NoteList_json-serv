import Typography from '@mui/material/Typography';
import React, { FC, ReactNode, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import IconButton from '@mui/material/IconButton';
// import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import Box from '@mui/material/Box';
import { shadows } from '@mui/system';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
// import Zoom from '@mui/material/Zoom'
import Fade from '@mui/material/Fade';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { positions } from '@mui/system';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ListItemText from '@mui/material/ListItemText';
import { NoteViewItem, NoteViewList } from '../types';
import { NoteEditFormValues } from './types';
import { NoteEditForm } from './NoteEditForm';
import styles from './NoteView.module.scss';
import { UpIcon } from './Icon';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

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
        <Box sx={{ display: 'flex', flex: 'wrap', alignItems: 'center' }}>
          <Box sx={{ width: '90%' }}>
            <ListItemText
              sx={{
                fontSize: 24,
                border: '1px solid red',
                color: '#2d3843',
                backgroundColor: 'white',
                wordBreak: 'break-all',
              }}
            >
              {noteViewItem.title}
            </ListItemText>
          </Box>
          {isEnableDeleteItem && (
            <div>
              {noteViewItem.isEnableSubList && (
                <LightTooltip
                  title="Delete sublist"
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                >
                  <IconButton
                    onClick={() => onDeleteSublist(id)}
                    id={id}
                    aria-label="delete"
                    size="large"
                  >
                    <PlaylistRemoveIcon
                      sx={{
                        // #2d3843
                        fontSize: 28,
                        color: '#2d3843',
                        '&:hover': {
                          color: '#be0000',
                        },
                      }}
                    />
                  </IconButton>
                </LightTooltip>
              )}
              {!noteViewItem.isEnableSubList && (
                <LightTooltip
                  title="Add sublist"
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                >
                  <IconButton
                    onClick={() => onAddSublist(id)}
                    id={id}
                    aria-label="add"
                    size="large"
                  >
                    <PlaylistAddIcon sx={{ fontSize: 36, color: '#2d3843' }} />
                  </IconButton>
                </LightTooltip>
              )}
              <LightTooltip
                title="Delete list"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <IconButton
                  onClick={() => onDeleteItem(id)}
                  id={id}
                  aria-label="delete"
                  size="large"
                >
                  <DeleteOutlineIcon
                    sx={{
                      fontSize: 20,
                      color: '#2d3843',
                      '&:hover': {
                        color: '#be0000',
                      },
                    }}
                  />
                </IconButton>
              </LightTooltip>
            </div>
          )}
        </Box>
        {children && <div>{children}</div>}
        {noteViewItem.isEnableSubList && (
          <NoteEditForm
            initialValues={noteEditFormInitialState}
            onSubmit={handleFormSubmit}
            placeholder={'Type here...'}
            autoFocus={false}
            onCancel={handleFormCancel}
            id={id}
          />
        )}
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
              {/*{index > 0 && (*/}
              {/*  <IconButton*/}
              {/*    onClick={() => onChangeOrder(childListView[index], childListView[index - 1])}*/}
              {/*    id={id}*/}
              {/*    aria-label="delete"*/}
              {/*    size="large"*/}
              {/*  >*/}
              {/*    <KeyboardArrowUpIcon sx={{ fontSize: 36 }} />*/}
              {/*  </IconButton>*/}
              {/*)}*/}
              {/*{index < childListView.length - 1 && (*/}
              {/*  // <div*/}
              {/*  //   className={styles.buttonUp}*/}
              {/*  //   onClick={() =>*/}
              {/*  //     onChangeOrder(*/}
              {/*  //       childListView[index + 1],*/}
              {/*  //       childListView[index],*/}
              {/*  //     )*/}
              {/*  //   }*/}
              {/*  // >*/}
              {/*  //   <UpIcon Icon={RiArrowDownSLine} />*/}
              {/*  // </div>*/}
              {/*  <IconButton*/}
              {/*    // sx={{ zIndex: 'top' }}*/}
              {/*    // position="absolute"*/}
              {/*    onClick={() => onChangeOrder(childListView[index], childListView[index - 1])}*/}
              {/*    id={id}*/}
              {/*    aria-label="delete"*/}
              {/*    size="large"*/}
              {/*  >*/}
              {/*    <KeyboardArrowDownIcon sx={{ fontSize: 36 }} />*/}
              {/*  </IconButton>*/}
              {/*)}*/}
              {index > 0 && (
                <div
                  className={styles.buttonDown}
                  onClick={() => onChangeOrder(childListView[index], childListView[index - 1])}
                >
                  <UpIcon Icon={RiArrowUpSLine} />
                </div>
              )}
              {index < childListView.length - 1 && (
                <div
                  className={styles.buttonUp}
                  onClick={() => onChangeOrder(childListView[index + 1], childListView[index])}
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
