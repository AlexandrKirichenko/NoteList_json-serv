import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LoginCredentials } from '../types';
import { useAppDispatch } from '../../../store/hooks';
import { api } from '../../../api';
import { authSlice } from '../../../store/auth';
import styles from './LoginMainForm.module.scss';

const INITIAL_VALUES: LoginCredentials = {
  email: 'test@test.com',
  password: 'bestTestPassw0rd',
};

const VALIDATION_SCHEMA = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginMainForm: FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik<LoginCredentials>({
    initialValues: INITIAL_VALUES,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => {
      dispatch(authSlice.thunks.loginThunk(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate autoComplete={'off'} className={styles.wrap}>
      <div>
        <label>Email</label>
        <input type="text" placeholder={'please input email'} {...formik.getFieldProps('email')} />
        {Boolean(formik.touched.email) && Boolean(formik.errors.email) ? (
          <div className="msg-error">{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder={'please input password'}
          {...formik.getFieldProps('password')}
        />
        {Boolean(formik.touched.password) && Boolean(formik.errors.password) ? (
          <div className="msg-error">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className={styles.controlPanelWrap}>
        <button type={'submit'}>save</button>
        {/*<button type={'button'} onClick={onCancel}>*/}
        {/*  cancel*/}
        {/*</button>*/}
      </div>
    </form>
  );
};
