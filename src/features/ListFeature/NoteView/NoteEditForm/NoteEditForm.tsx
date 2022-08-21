import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { Button } from '../Button';
import { NoteEditFormValues } from '../types';
import styles from './NoteEditForm.module.scss';

interface NoteEditFormProps {
  initialValues: NoteEditFormValues;
  onSubmit: (values: NoteEditFormValues) => void;
  onCancel?: () => void;
  placeholder: string;
  autoFocus: boolean;
  id: string;
}

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

const validationSchema = yup.object({
  title: yup.string().required(),
});

export const NoteEditForm: FC<NoteEditFormProps> = ({
  initialValues,
  autoFocus,
  id,
  onSubmit,
  placeholder,
}) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate autoComplete={'off'} className={styles.wrap}>
      <TextField
        sx={{ width: '35%', height: 20, marginLeft: '1em' }}
        id="outlined-multiline-flexible"
        label="Add new note"
        variant="standard"
        fullWidth
        // multiline
        maxRows={4}
        {...formik.getFieldProps('title')}
        autoFocus={autoFocus}
      />
      {/*<input*/}
      {/*  className={styles.input}*/}
      {/*  type="text"*/}
      {/*  placeholder={placeholder}*/}
      {/*  {...formik.getFieldProps('title')}*/}
      {/*  autoFocus={autoFocus}*/}
      {/*/>*/}
      <LightTooltip title="Add note" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
        <IconButton type={'submit'} id={id} aria-label="add" size="large">
          <AddIcon
            sx={{
              // #2D3843FF
              fontSize: 36,
              color: '#2D3843FF',
              '&:hover': {
                color: 'blue',
              },
            }}
          />
        </IconButton>
      </LightTooltip>
    </form>
  );
};
