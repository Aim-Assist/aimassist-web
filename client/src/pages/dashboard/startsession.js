import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { gtm } from '../../lib/gtm';
import { API_SERVICE, API_SERVICE_1 } from '../../config';
import date from 'date-and-time';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  Stack,
  DialogActions,
  DialogTitle,
  TextField,
} from '@mui/material';

const CheckIn = () => {
  const router = useRouter();
  const [todaytime, settodaytime] = useState("");
  const [loading, setloading] = useState(true);
  const [today, settoday] = useState("");
  const [checkStatus, setCheckStatus] = useState("");
  const [sessionStatus, setSessionStatus] = useState(false);
  const [distance, setDistance] = useState(10)
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState("1")

  useEffect(() => {
    gtm.push({ event: 'page_view' });
    getToday();
    getUser(localStorage.getItem("userEmail"))
    setInterval(() => {
      getSessionDetails();
      getUser(localStorage.getItem("userEmail"))
    }, 2000);
  }, []);

  // const getUserDailyStatus = async (email, dates, month, year) => {
  //   try {
  //     const response = await fetch(`${API_SERVICE}/getuserorgdatalogstatus/${email}/${dates}/${month}/${year}`);
  //     const data = await response.json();
  //     setCheckStatus(data.data)
  //     if(data.data == "Started Work"){
  //       toast.success('You have already checked in');
  //       router.push("/dashboard/checkout")
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const getSessionDetails = async () => {
    try {
      const response = await fetch(`${API_SERVICE_1}/session/getsession?device=1`);
      const data = await response.json();
      setSessionStatus(data.data.session_started)
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDevice(value);
  };

  const handleChangeDistance = (event) => {
    const {
      target: { value },
    } = event;
    setDistance(value);
  };

  const getToday = () => {
    const now = new Date();
    const patternDate = date.compile('dddd, MMM DD YYYY, HH:mm A');
    const patternTime = date.compile('HH:mm A');

    settodaytime(date.format(now, patternTime));
    settoday(date.format(now, patternDate));
  }

  // const handleCheckIn = (status) => {
  //   if (checkStatus == "Clocked Out") {
  //     toast.error("You've already clocked out for today. Clock in tomorrow")
  //   } else (userTimeLogged(status))
  // }

  const getUser = async (userEmail) => {
    try {
      const response = await fetch(`${API_SERVICE_1}/user/getUserByEmail?email=${userEmail}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  const startSession = async () => {
    try {
      var dataSend = {
        userid: localStorage.getItem("userId"),
        distance: distance,
        device: device,
        email: localStorage.getItem("userEmail")
      }
      const resDataLog = await fetch(`${API_SERVICE_1}/session/startsession`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSend)
      })
      if (resDataLog.status === 200) {
        toast.success('Session Started! Start Shooting');
        router.push("/dashboard/session")
      }
    } catch (err) {
      console.log(err);
    }
  }

  // const userTimeLogged = async (status) => {

  //   var clockInStatus = '';
  //   if (status === "Started Work") {
  //     clockInStatus = "Clocked In";
  //   } else if (status === "Clocked Out") {
  //     clockInStatus = "Clocked Out";
  //   }

  //   try {
  //     // handleToggle();
  //     // const res = await fetch(API_IPADDRESS);
  //     // const resIp = await res.json();
  //     const now = new Date();

  //     // const os = getOS();

  //     var dataSend = {
  //       // loc: resUserIpData.loc,
  //       // country: resUserIpData.country,
  //       // state: resUserIpData.region,
  //       // city: resUserIpData.city,
  //       // postal: resUserIpData.postal,
  //       // timezone: resUserIpData.timezone,
  //       day: date.format(now, date.compile('dddd')),
  //       month: date.format(now, date.compile('MMM')),
  //       date: date.format(now, date.compile('DD')),
  //       year: date.format(now, date.compile('YYYY')),
  //       time: date.format(now, date.compile('HH:mm')),
  //       timeMeridiem: date.format(now, date.compile('A')),
  //       // userId: userWorkId,
  //       email: localStorage.getItem("userEmail"),
  //       name: localStorage.getItem("name"),
  //       // userName: localStorage.getItem("fullName"),
  //       // orgName: organizationInfo.organization_name,
  //       // orgId: organizationInfo.organization_id,
  //       clockInStatus,
  //       // os
  //     }
  //     const resDataLog = await fetch(`${API_SERVICE}/addemployeeorgdatalog`, {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(dataSend)
  //     })
  //     if (resDataLog.status === 200) {
  //       const returnUrl = '/dashboard/checkout';
  //       router.push(returnUrl);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        maxWidth='md'
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Fill Details to start session
        </DialogTitle>
        <DialogContent>
          <>
            <Box sx={{ p: 3 }}>
              <Stack
                direction="row"
                spacing={2}
                marginBottom={4}
              >
                <select
                  style={{
                    float: 'right',
                    width: '100%',
                    padding: '10px',
                    fontSize: '15px',
                    borderRadius: '10px'
                  }}
                  value={device}
                  onChange={handleChange}
                >
                  <option selected disabled>Device</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </Stack>

              <TextField
                label="Distance"
                type="text"
                fullWidth
                sx={{ mb: 4 }}
                value={distance}
                onChange={handleChangeDistance}
              />
            </Box>
          </>
        </DialogContent>
        <DialogActions
          sx={{
            p: 2
          }}>
          <Button onClick={() => { setOpen(false) }}>Close</Button>
          <Button variant="contained" onClick={startSession} autoFocus>
            Start Session
          </Button>
        </DialogActions>
      </Dialog>

      <Head>
        <title>
          Dashboard
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  Session
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <center style={{ marginTop: '100px', fontSize: '25px' }} >
            <h1>
              Start Session
            </h1>

            <Button
              variant='contained'
              onClick={()=>{setOpen(true)}}
              size='large'
            >
              Start
            </Button>
          </center>
        </Container>
      </Box>
    </>
  );
};

CheckIn.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default CheckIn;
