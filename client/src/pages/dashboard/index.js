import { useState, useRef, useEffect, useCallback } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { OverviewBanner } from "../../components/dashboard/overview/overview-banner";
import { OverviewCryptoWallet } from "../../components/dashboard/overview/overview-crypto-wallet";
import { OverviewInbox } from "../../components/dashboard/overview/overview-inbox";
import { OverviewLatestTransactions } from "../../components/dashboard/overview/overview-latest-transactions";
import { OverviewPrivateWallet } from "../../components/dashboard/overview/overview-private-wallet";
import { OverviewTotalBalance } from "../../components/dashboard/overview/overview-total-balance";
import { OverviewTotalTransactions } from "../../components/dashboard/overview/overview-total-transactions";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import { Briefcase as BriefcaseIcon } from "../../icons/briefcase";
import { Download as DownloadIcon } from "../../icons/download";
import { ExternalLink as ExternalLinkIcon } from "../../icons/external-link";
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from "../../icons/information-circle-outlined";
import { Reports as ReportsIcon } from "../../icons/reports";
import { Users as UsersIcon } from "../../icons/users";
import date from "date-and-time";

import { gtm } from "../../lib/gtm";

import { useDispatch, useSelector } from "../../store";
import { useAuth, userAuth } from '../../hooks/use-auth';
import { updateShorthandPropertyAssignment } from "typescript";
import { API_SERVICE } from "../../config";
import { CircularProgress } from "../../components/circular-progress";

const Overview = () => {
  const [displayBanner, setDisplayBanner] = useState(true);

  const dispatch = useDispatch();
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [sdate, setDate] = useState(new Date());
  const [view, setView] = useState(smDown ? "timeGridDay" : "dayGridMonth");
  const [dialog, setDialog] = useState({
    isOpen: false,
    eventId: undefined,
    range: undefined,
  });

  useEffect(
    () => {
      dispatch(getEvents());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem("dismiss-banner");

    if (value === "true") {
      // setDisplayBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };



  const [greettext, setgreettext] = useState("");
  useEffect(() => {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 18) {
      setgreettext("Good Afternoon");
    } else if (curHr < 12) {
      setgreettext("Good Morning");
    } else if (curHr > 18) {
      setgreettext("Good Evening");
    }
  }, []);

  const [Name, setName] = useState("");
  useEffect(() => {
    var user = {
      //  name: sessionStorage.getItem("name"),
      name: localStorage.getItem("name"),
    }
    var today = new Date();
    var curHr = today.getHours();
    if (curHr < 12) {
      var greet = "Good Morning"
      setName(`${greet} ${user.name}`)
    }
    else if (curHr < 18) {
      var greet = "Good Afternoon"
      setName(`${greet} ${user.name}`)
    }
    else if (curHr > 18) {
      var greet = "Good Evening"
      setName(`${greet} ${user.name}`)
    }
  }, []);


  return (
    <>
      <Head>
        <title>Dashboard: Overview | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">{Name}</Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  m: -1,
                }}
              >
                {/* <Button
                  startIcon={<ReportsIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  Reports
                </Button> */}
                {/* <TextField
                  defaultValue="week"
                  label="Period"
                  select
                  size="small"
                  sx={{ m: 1 }}
                >
                  <MenuItem value="week">Last week</MenuItem>
                  <MenuItem value="month">Last month</MenuItem>
                  <MenuItem value="year">Last year</MenuItem>
                </TextField> */}
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={4}>
            {/* {
              loading ? (
                <center>
                  <CircularProgress sx={{ mt: 10 }} />
                </center>
              ) : (<> */}
            <Grid item md={12} xs={12}>
              <OverviewInbox currently={true} title="Awaiting Check In" />
            </Grid>
            <Grid item md={6} xs={12}>
              <OverviewInbox title="Pet Checked In" />
            </Grid>
            <Grid item md={6} xs={12}>
              <OverviewInbox title="Pet Checked Out" />
            </Grid>
            <Grid item md={6} xs={12}>
              <OverviewInbox title="Employees Checked In" />
            </Grid>
            <Grid item md={6} xs={12}>
              <OverviewInbox title="Employees Checked Out" />
            </Grid>
            <Grid item md={12} xs={12}>
              <OverviewInbox title="Pending Bookings" />
            </Grid>
            <Grid item md={12} xs={12}>
              <Box
                component="main"
                sx={{
                  backgroundColor: "background.paper",
                  flexGrow: 1,
                  py: 8,
                  p: 2,
                }}
              >
                <h2>Schedules</h2>
              </Box>
            </Grid>
            {/* <Grid item md={8} xs={12}>
              <OverviewTotalTransactions />
            </Grid>
            <Grid item md={4} xs={12}>
              <OverviewTotalBalance />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Overview;
