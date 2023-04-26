import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Alert, Box, Button, Divider, FormHelperText, TextField, Typography } from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';
import firebase from '../../lib/firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from 'react';
import { API_SERVICE, API_SERVICE_1 } from '../../config';

export const FirebaseLogin = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  // const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();
  const [role, setRole] = useState("");

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        signInWithEmailAndPassword(getAuth(firebase), values.email, values.password)
          .then(async () => {
            const user2 = getAuth(firebase).currentUser;
            localStorage.setItem("userEmail", user2.email);
            localStorage.setItem("name", user2.displayName);
            localStorage.setItem("userId", user2.uid);
            const res = await getUser(localStorage.getItem("userEmail"))
            console.log(res)
            if (res.data) {
              console.log(resizeBy.data)
              setRole();
              localStorage.setItem("role", res.data.role)
              localStorage.setItem("connectedAccountId", "");
              console.log(localStorage.getItem("role"))
              if (isMounted()) {
                if (localStorage.getItem("role") == "employee") {
                  const returnUrl = '/dashboard/startsession';
                  router.push(returnUrl);
                } else if (localStorage.getItem("role") == "admin") {
                  const returnUrl = '/dashboard';
                  router.push(returnUrl);
                } else if (localStorage.getItem("role") == "customer") {
                  const returnUrl = '/dashboard/customers/dashboard';
                  router.push(returnUrl);
                }
              }
            }
          })
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  const getUser = async (userEmail) => {
    try {
      const response = await fetch(`${API_SERVICE_1}/user/getUserByEmail?email=${userEmail}`);
      const data = await response.json();
      return data;

    } catch (err) {
      console.log(err);
    }
  }

  const handleGoogleClick = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div {...props}>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <TextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email Address"
          margin="normal"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
        />
        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        />
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>
              {formik.errors.submit}
            </FormHelperText>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Button
            disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Log In
          </Button>
        </Box>
      </form>
    </div>
  );
};
