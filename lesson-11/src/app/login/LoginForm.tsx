'use client'

import React from 'react';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import { TextField, Link } from '@mui/material';
import Button from '@mui/joy/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

interface LoginFormProps {
  onSubmit: (values: { username: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  return (
    <>
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1" sx={{ textAlign: 'center', mb: 1 }}>
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm" sx={{ textAlign: 'center' }}>
            Sign in to continue.
          </Typography>
        </div>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Field
                sx={{ marginBottom: '16px' }}
                name="username"
                as={TextField}
                label="Username"
                variant="outlined"
                fullWidth
                margin="none"
                size="small"
                error={touched.username && Boolean(errors.username)}
                helperText={<ErrorMessage name="username" />}
              />

              <Field
                sx={{ marginBottom: '16px' }}
                name="password"
                type="password"
                as={TextField}
                label="Password"
                variant="outlined"
                fullWidth
                margin="none"
                size="small"
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
              />

              <Button sx={{ marginBottom: '16px' }} type="submit">
                Login
              </Button>
            </Form>
          )}
        </Formik>

        <Typography endDecorator={<Link href="/register">Sign up</Link>} sx={{ fontSize: 'sm', alignSelf: 'center' }}>
          Don't have an account?
        </Typography>
      </Sheet>
    </>
  );
};

export default LoginForm;