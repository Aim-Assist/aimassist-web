import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import {
    Card,
    CardContent,
    Chip,
    Stack,
    IconButton,
    Tooltip,
    CircularProgress
} from '@mui/material';
import {
    Edit,
    Delete
} from '@mui/icons-material';

import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { gtm } from '../../lib/gtm';
import { API_SERVICE, API_SERVICE_1 } from '../../config';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import TablePagination from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const CheckOut = () => {
    const router = useRouter();
    const [scores, setScores] = useState([]);
    const [sessionStatus, setSessionStatus] = useState();
    const [latestData, setLatestData] = useState();
    const [latestScores, setLatestScores] = useState([]);
    const [latestRoundData, setLatestRoundData] = useState();

    useEffect(() => {
        gtm.push({ event: 'page_view' });
        // getSessionDetails();
        setInterval(() => {
            getSessionDetails();
            getUser(localStorage.getItem("userEmail"));
        }, 500);
    }, []);

    const getUser = async (userEmail) => {
        try {
            const response = await fetch(`${API_SERVICE_1}/user/getUserByEmail?email=${userEmail}`);
            const data = await response.json();
            // setLatestData(data.data)
            setLatestScores(data.data.latest_score)
            setLatestRoundData(data.data.latestroundData)
        } catch (err) {
            console.log(err);
        }
    }

    const getSessionDetails = async () => {
        try {
            const response = await fetch(`${API_SERVICE_1}/session/getsession?device=1`);
            const data = await response.json();
            setScores(data.data.score)
            setSessionStatus(data.data.session_started)
        } catch (err) {
            console.log(err);
        }
    }




    return (
        <>
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

                    {sessionStatus == true && (
                        <>
                            <Box sx={{ mb: 4 }}>
                                <Typography sx={{ float: 'left' }} variant="h4">
                                    Start shooting {localStorage.getItem("name")} !
                                </Typography>
                            </Box>
                            <Grid container spacing={4}>
                                <Grid item md={12} xs={12}>
                                    <Table sx={{ minWidth: 700 }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Distance
                                                </TableCell>
                                                <TableCell align="center">
                                                    Angle
                                                </TableCell>
                                                <TableCell align="center">
                                                    Score
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {scores.map((score) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {score[0]}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {score[1]}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {score[2]}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </>
                    )}
                    {sessionStatus == false && (
                        <>
                            <Box sx={{ mb: 4 }}>
                                <Typography sx={{ float: 'left' }} variant="h4">
                                    Session has ended, following are your scores
                                </Typography>
                            </Box>
                            <Grid container spacing={4}>
                                <Grid item md={12} xs={12}>
                                    <Table sx={{ minWidth: 300 }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">
                                                    Distance
                                                </TableCell>
                                                <TableCell align="center">
                                                    Angle
                                                </TableCell>
                                                <TableCell align="center">
                                                    Score
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {latestScores.map((score) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                    >
                                                        <TableCell align="center">
                                                            {score[0]}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {score[1]}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {score[2]}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <Box sx={{ mb: 6 }}>
                                        <Typography sx={{ float: 'left' }} variant="h5">
                                            Session Analysis
                                        </Typography>
                                    </Box>
                                    <Table sx={{ minWidth: 200 }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">
                                                    Parameters
                                                </TableCell>
                                                <TableCell align="center">
                                                    Values
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow
                                                hover
                                            >
                                                <TableCell align="center">
                                                    <b>Accuracy</b>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {Math.round((latestRoundData?.accuracy + Number.EPSILON) * 100) / 100 }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow
                                                hover
                                            >
                                                <TableCell align="center">
                                                    <b>Distance</b>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {latestRoundData?.distance}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow
                                                hover
                                            >
                                                <TableCell align="center">
                                                    <b>Best Angle</b>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {latestRoundData?.bestangle}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow
                                                hover
                                            >
                                                <TableCell align="center">
                                                    <b>Worst Angle</b>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {latestRoundData?.worstangle}
                                                </TableCell>
                                            </TableRow>

                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <center style={{ fontSize: '18px' }} >
                                        <h1>
                                            Start New Session
                                        </h1>

                                        <Button
                                            variant='contained'
                                            onClick={() => { router.push("/dashboard/startsession")}}
                                            size='large'
                                        >
                                            Start
                                        </Button>
                                    </center>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Container>
            </Box>
        </>
    );
};

CheckOut.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default CheckOut;
