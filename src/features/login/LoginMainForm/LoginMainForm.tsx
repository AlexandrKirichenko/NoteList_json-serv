import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { authSlice } from '../../../store/auth';
import { useAppDispatch } from '../../../store/hooks';
import { LoginCredentials } from '../types';

const theme = createTheme();

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
    <ThemeProvider theme={theme}>
      <Container component="div" maxWidth="xs">
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
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={formik.handleSubmit}
            autoComplete={'off'}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...formik.getFieldProps('email')}
            />
            {Boolean(formik.touched.email) && Boolean(formik.errors.email) ? (
              <div className="msg-error">{formik.errors.email}</div>
            ) : null}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...formik.getFieldProps('password')}
            />
            {Boolean(formik.touched.password) && Boolean(formik.errors.password) ? (
              <div className="msg-error">{formik.errors.password}</div>
            ) : null}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/singup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
