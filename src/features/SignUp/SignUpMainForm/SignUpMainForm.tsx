import { FC, MouseEvent } from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { appSlice } from '../../../store/app';
import { getRoutePath } from '../../../router';
import { useAppDispatch } from '../../../store/hooks';
import { SignUpData } from '../types';
import { authSlice } from '../../../store/auth';

const theme = createTheme();

const INITIAL_VALUES: SignUpData = {
  email: 't@t.ru',
  password: 'asdasdasdasd',
  firstName: 'xxx',
  lastName: 'yyy',
};

const VALIDATION_SCHEMA = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

export const SignUpMainForm: FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik<SignUpData>({
    initialValues: INITIAL_VALUES,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => {
      // dispatch(authSlice.thunks.loginThunk(values));
      console.log(values);
    },
  });

  const handleGoToSignIn = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(appSlice.actions.redirect(getRoutePath('LoginPage')));
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
              onSubmit={formik.handleSubmit}
              autoComplete={'off'}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    {...formik.getFieldProps('firstName')}
                  />
                  {Boolean(formik.touched.firstName) && Boolean(formik.errors.firstName) ? (
                    <div className="msg-error">{formik.errors.firstName}</div>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="family-name"
                    {...formik.getFieldProps('lastName')}
                  />
                  {Boolean(formik.touched.lastName) && Boolean(formik.errors.lastName) ? (
                    <div className="msg-error">{formik.errors.lastName}</div>
                  ) : null}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    {...formik.getFieldProps('email')}
                  />
                  {Boolean(formik.touched.email) && Boolean(formik.errors.email) ? (
                    <div className="msg-error">{formik.errors.email}</div>
                  ) : null}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...formik.getFieldProps('password')}
                  />
                  {Boolean(formik.touched.password) && Boolean(formik.errors.password) ? (
                    <div className="msg-error">{formik.errors.password}</div>
                  ) : null}
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2" onClick={handleGoToSignIn}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};
