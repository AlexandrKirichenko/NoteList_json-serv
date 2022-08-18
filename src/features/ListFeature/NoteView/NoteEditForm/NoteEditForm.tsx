import IconButton from '@mui/material/IconButton';
import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import AddIcon from '@mui/icons-material/Add';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Button } from '../Button';
import { NoteEditFormValues } from '../types';
import styles from './NoteEditForm.module.scss';
import TextField from '@mui/material/TextField';

interface NoteEditFormProps {
  initialValues: NoteEditFormValues;
  onSubmit: (values: NoteEditFormValues) => void;
  onCancel?: () => void;
  placeholder: string;
  autoFocus: boolean;
  id: string;
}

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
        id="outlined-multiline-flexible"
        label="List fild"
        variant="standard"
        fullWidth
        multiline
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
      <IconButton type={'submit'} id={id} aria-label="add" size="large">
        <NoteAddIcon sx={{ fontSize: 36 }} />
      </IconButton>
    </form>
  );
};
