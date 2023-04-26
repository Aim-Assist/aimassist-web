import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';
import firebase from '../../lib/firebase'
import { API_SERVICE, API_SERVICE_1 } from '../../config';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"

export const FirebaseRegister = (props) => {
  const [phone, setPhone] = useState("");
  const isMounted = useMounted();
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      policy: true,
      submit: null,
      phone: ''
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .min(7)
        .max(255)
        .required('Password is required'),
      policy: Yup
        .boolean()
        .oneOf([true], 'This field must be checked')
    }),
    onSubmit: async (values, helpers) => {
      try {
        //   await createUserWithEmailAndPassword(values.email, values.password);
        //   console.log(values);
        //   if (isMounted()) {
        //     const returnUrl = router.query.returnUrl || '/dashboard';
        //     router.push(returnUrl);
        //   }
        // } catch (err) {
        //   console.error(err);

        //   if (isMounted()) {
        //     helpers.setStatus({ success: false });
        //     helpers.setErrors({ submit: err.message });
        //     helpers.setSubmitting(false);
        //   }
        // }
        //sessionStorage.setItem("userType", userType);

        // sessionStorage.setItem("name",values.name);
        // sessionStorage.setItem("loginType","register");
        localStorage.setItem("name", values.name);
        localStorage.setItem("phone", values.phone);
        localStorage.setItem("loginType", "register");

        createUserWithEmailAndPassword(getAuth(firebase), values.email, values.password)
          .then((userCredential) => {
            const user = userCredential.user;
            // sessionStorage.setItem("userId",user.uid);
            // sessionStorage.setItem("userEmail",user.email);
            localStorage.setItem("userId", user.uid);
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("connectedAccountId", "");
            localStorage.setItem("role", "employee");
            const user2 = getAuth(firebase).currentUser;
            setPhone(values.phone)
            addUser();
            updateProfile(getAuth(firebase).currentUser, {
              displayName: values.name
            }).then(() => {
              // console.log(user2.displayName);
              if (localStorage.getItem("role") == "employee") {
                const returnUrl = '/dashboard/startsession';
                router.push(returnUrl);
              } else {
                const returnUrl = '/dashboard';
                router.push(returnUrl);
              }
            }).catch((error) => {
              console.log(error);
            })
          })
      } catch (err) {
        console.error(err);
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  const addUser = async () => {

    var dataSend = {
      firebaseId: localStorage.getItem("userId"),
      email: localStorage.getItem("userEmail"),
      name: localStorage.getItem("name"),
      password: "aimassist",
      phoneno: localStorage.getItem("phone"),
    }

    const res = await fetch(`${API_SERVICE_1}/user/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataSend)
    })

    if (res.status === 200) {
      console.log("User Added")
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
      {/* <Button
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        sx={{
          backgroundColor: 'common.white',
          color: 'common.black',
          '&:hover': {
            backgroundColor: 'common.white',
            color: 'common.black'
          }
        }}
        variant="contained"
      >
        <Box
          alt="Google"
          component="img"
          src="/static/icons/google.svg"
          sx={{ mr: 1 }}
        />
        Google
      </Button>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mt: 2
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Divider orientation="horizontal" />
        </Box>
        <Typography
          color="textSecondary"
          sx={{ m: 2 }}
          variant="body1"
        >
          OR
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Divider orientation="horizontal" />
        </Box>
      </Box> */}
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <TextField
          error={Boolean(formik.touched.name && formik.errors.name)}
          fullWidth
          helperText={formik.touched.name && formik.errors.name}
          label="Name"
          margin="normal"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.name}
        />
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
          error={Boolean(formik.touched.phone && formik.errors.phone)}
          fullWidth
          helperText={formik.touched.phone && formik.errors.phone}
          label="Phone Number"
          margin="normal"
          name="phone"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.phone}
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
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            ml: -1,
            mt: 2
          }}
        >
          <Checkbox
            checked={formik.values.policy}
            name="policy"
            onChange={formik.handleChange}
          />
          <Typography
            color="textSecondary"
            variant="body2"
          >
            I have read the
            {' '}
            <Link
              component="a"
              href="#"
            >
              Terms and Conditions
            </Link>
          </Typography>
        </Box>
        {Boolean(formik.touched.policy && formik.errors.policy) && (
          <FormHelperText error>
            {formik.errors.policy}
          </FormHelperText>
        )}
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
            Register
          </Button>
        </Box>
      </form>
    </div>
  );
};
