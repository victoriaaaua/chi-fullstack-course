'use client'

import React from "react";
import { Box, TextField } from "@mui/material";
import { Button, Sheet, CssBaseline, Typography } from "@mui/joy";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .max(4, 'Username cannot be more than 4 characters')
    .required('Username is required'),
  password: Yup.string()
    .max(4, 'Password cannot be more than 4 characters')
    .required('Password is required'),
});

interface RegisterFormProps {
  onSubmit: (values: { username: string, password: string }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  return (
    <main>
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
            <b>Registration</b>
          </Typography>
          <Typography level="body-sm" sx={{ textAlign: 'center' }}>Sign up to continue.</Typography>
        </div>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={RegisterSchema}
          onSubmit={onSubmit}
        >
          {({ touched, errors }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Field
                name="username"
                variant="outlined"
                fullWidth
                as={TextField}
                margin="none"
                size="small"
                type="text"
                label="username"
                sx={{ mb: 2 }}
                helperText={<ErrorMessage name="username" />}
                error={touched.username && Boolean(errors.username)}
              />
              <Field
                name="password"
                as={TextField}
                variant="outlined"
                fullWidth
                margin="none"
                size="small"
                type="password"
                helperText={<ErrorMessage name="password" />}
                error={touched.password && Boolean(errors.password)}
              />
              <Box sx={{ mt: 2 }}>
                <Button type="submit" sx={{ width: '100%' }}>Sign up</Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Sheet>
    </main>
  );
};

export default RegisterForm;
