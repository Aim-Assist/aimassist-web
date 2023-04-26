import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from 'react';
import firebase from '../../../lib/firebase'
import { getAuth, updateProfile } from "firebase/auth"
import router from "next/router";

export const AccountGeneralSettings = (props) => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const user = {
    //avatar: "/static/mock-images/avatars/avatar-anika_visser.png",

    // name: sessionStorage.getItem("name"),
    // email: sessionStorage.getItem("userEmail")
    name: localStorage.getItem("name"),
    email: localStorage.getItem("userEmail")
  };

  const [name, setName] = useState('');

  const updateName = () => {
    updateProfile(getAuth(firebase).currentUser, {
      displayName: name
    }).then(() => {
      localStorage.setItem("name", name),
        router.push('/dashboard/account');
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Basic details</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  mt: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  defaultValue={user.name}
                  label="Full Name"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                  //value={}
                  onChange={e => setName(e.target.value)}
                />
                <Button onClick={updateName}  >Save</Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  defaultValue={user.email}
                  disabled
                  label="Email Address"
                  required
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderStyle: "dashed",
                    },
                  }}
                />
                <Button>Edit</Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Delete Account</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography sx={{ mb: 3 }} variant="subtitle1">
                Delete your account and all of your source data. This is
                irreversible.
              </Typography>
              <Button color="error" variant="outlined">
                Delete account
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
