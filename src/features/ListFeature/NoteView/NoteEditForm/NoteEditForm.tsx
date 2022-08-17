import IconButton from '@mui/material/IconButton';
import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
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
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete={'off'}
      className={styles.wrap}
    >
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        {...formik.getFieldProps('title')}
        autoFocus={autoFocus}
      />
      <IconButton type={'submit'} id={id} aria-label="add" size="large">
        <AddIcon fontSize="inherit" />
      </IconButton>
    </form>
  );
};
