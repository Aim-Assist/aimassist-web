import { formatDistanceToNowStrict, subHours, subMinutes } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Scrollbar,
  Link,
  DialogActions, DialogTitle,
  Dialog,
  DialogContent,
  TextField
} from "@mui/material";
import TablePagination from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { API_SERVICE } from "../../../config";
import date from "date-and-time";
import NextLink from 'next/link';
import toast from 'react-hot-toast';
import { Editor } from '@tinymce/tinymce-react';

// import SaveAsIcon from "@mui/icons-material/SaveAs";
import CreateIcon from "@mui/icons-material/Create";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import TimerIcon from '@mui/icons-material/Timer';
import { useEffect, useState } from "react";


export const OverviewInbox = (props, { title }) => {

  const [employees, setEmployees] = useState([]);
  const [checkedInEmployees, setCheckedInEmployees] = useState([]);
  const [checkedOutEmployees, setCheckedOutEmployees] = useState([]);
  const [tempEmployee, setTempEmployee] = useState({});
  const [loading, setloading] = useState(true);
  const [allVaccines, setAllVaccines] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allPets, setAllPets] = useState([]);
  const [todayPets, setTodayPets] = useState([]);
  const [checkedInPets, setCheckedInPets] = useState([]);
  const [checkedOutPets, setCheckedOutPets] = useState([]);
  const [awaitingPets, setAwaitingPets] = useState([]);
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [reqPets, setReqPets] = useState([]);

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [heading, setHeading] = useState("");
  const [article, setArticle] = useState("");
  const [tmpServiceId, setTmpServiceId] = useState("");

  useEffect(() => {
    getAllOrgUsers()
    getVaccinesAll()
    getPetsAll()
    getCheckedInPets()
    // getOrders()


  }, []);

  const columns = [
    { field: 'petName', headerName: 'PET NAME' },
    { field: 'customerName', headerName: 'CUSTOMER NAME', width: 300 },
    { field: 'code', headerName: 'CODE', width: 600 },
  ]

  // useEffect(() => {
  //   console.log(orders)
  //   orders.map((order) => {
  //     order.orderProducts.map((product) => {
  //       if (product.product.physical === false) {
  //         product.pets.map((pet) => {
  //           console.log(allPets)
  //           setReqPets(...reqPets, {orderId: order._id, serviceId: product._id, serviceName: product?.product?.name, petName: allPets.find(obj1 => obj1._id === pet).name, customerEmail: product?.email, petId: pet })
  //         })
  //       }
  //     })
  //   })
  //   console.log(reqPets)
  // }, []);

  const handleClickOpen = (tempServiceId) => {
    setTmpServiceId(tempServiceId)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTmpServiceId("")
    setArticle("")
    setHeading("")
  };

  const getVaccinesAll = async () => {
    try {
      const response = await fetch(`${API_SERVICE}/getAdminVaccines/${localStorage.getItem("userEmail")}`);
      const data = await response.json();
      setAllVaccines(data.data);
      console.log(data.data);
      // setloading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const applyPagination = (customers, page, rowsPerPage) => customers.slice(page * rowsPerPage,
    page * rowsPerPage + rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const paginatedVaccines = applyPagination(allVaccines, page, rowsPerPage);

  const getPetsAll = async () => {
    try {
      const response = await fetch(`${API_SERVICE}/getPets/${localStorage.getItem("userEmail")}`);
      const data = await response.json();
      setAllPets(data.data)
      getOrders(data.data)
      console.log(data.data);
      setloading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const getOrders = async (allPets) => {
    try {
      const response = await fetch(`${API_SERVICE}/getCheckout`);
      const data = await response.json();
      setOrders(data.data);
      const merged = []
      data.data.map((order) => {
        order.orderProducts.map((product) => {
          if (product.product.physical === false) {
            product.pets.map((pet) => {
              // console.log({orderId: order._id, serviceId: product._id, serviceName: product?.product?.name, petName: allPets.find(obj1 => obj1._id === pet).name, customerEmail: product?.email, petId: pet })
              const mergedData = { orderId: order._id, serviceId: product._id, serviceName: product?.product?.name, petName: allPets.find(obj1 => obj1._id === pet).name, customerEmail: product?.email, petId: pet }
              merged.push({
                orderId: order._id,
                serviceId: product._id,
                serviceName: product?.product?.name,
                petName: allPets.find(obj1 => obj1._id === pet).name,
                petBreed: allPets.find(obj1 => obj1._id === pet).breed,
                customerEmail: product?.email,
                petId: pet,
                customerfname: order.fNamebill,
                customerlname: order.lNamebill,
                bookedForDate: product.bookedForDate,
                bookedForMonth: product.bookedForMonth,
                bookedForYear: product.bookedForYear,
                status: product.status,
              })
              // return {orderId: order._id, serviceId: product._id, serviceName: product?.product?.name, petName: allPets.find(obj1 => obj1._id === pet).name, customerEmail: product?.email, petId: pet }
              // setReqPets(...reqPets, {orderId: order._id, serviceId: product._id, serviceName: product?.product?.name, petName: allPets.find(obj1 => obj1._id === pet).name, customerEmail: product?.email, petId: pet })
            })
          }
        })
      })
      setReqPets(merged)
      console.log(data.data)
    } catch (err) {
      console.log(err);
    }
  }

  const getCheckedInPets = async () => {
    const now = new Date();
    try {
      const response = await fetch(
        `${API_SERVICE}/getcheckedinpets/${date.format(
          now,
          date.compile("DD")
        )}/${date.format(now, date.compile("MMM"))}/${date.format(
          now,
          date.compile("YYYY")
        )}`
      );
      const data = await response.json();
      setTodayPets(data.data)
      console.log(data.data)

      var petArr = data.data;

      // setCheckedInPets(data.data.filter(obj=>obj?.checkedOuttime === ""))
      // setCheckedOutPets(data.data.filter(obj=>obj?.checkedOuttime !== ""))
      // setAwaitingPets(allPets.filter(obj1 => !data.data.some(obj2 => obj1._id === obj2.petId)))
    } catch (err) {
      console.log(err);
    }
  }

  const getAllOrgUsers = async () => {
    const now = new Date();
    try {
      const response = await fetch(
        `${API_SERVICE}/getallorgusers/${date.format(
          now,
          date.compile("DD")
        )}/${date.format(now, date.compile("MMM"))}/${date.format(
          now,
          date.compile("YYYY")
        )}`
      );
      const data = await response.json();
      console.log(data.data)
      setEmployees(data.data);
      // setloading(false);

      var tempArr = data.data;
      var tempEmployee = {};
      var tmpemp = {};
      var tempCheckedInEmployeeArr = [];
      var tempCheckedOutEmployeeArr = [];
      // var peopleWorking = 0;
      // var peoplefinishalready = 0;

      tempArr.map(async (data) => {
        if (data?.clockedOuttime === "") {
          tmpemp = {
            id: data._id,
            employeeName: data.name,
            email: data.email,
            clockedInday: data.clockedInday,
            clockedInmonth: data.clockedInmonth,
            clockedIndate: data.clockedIndate,
            clockedInyear: data.clockedInyear,
            clockedIntime: data.clockedIntime,
            clockedIntimeMeridiem: data.clockedIntimeMeridiem
          }
          setCheckedInEmployees(checkedInEmployees => [...checkedInEmployees, tmpemp])
          // console.log(tmpemp)
          // tempCheckedInEmployeeArr.push(tmpemp);
        } else {
          tmpemp = {
            id: data._id,
            employeeName: data.name,
            email: data.email,
            clockedOutday: data.clockedOutday,
            clockedOutmonth: data.clockedOutmonth,
            clockedOutdate: data.clockedOutdate,
            clockedOutyear: data.clockedOutyear,
            clockedOuttime: data.clockedOuttime,
            clockedOuttimeMeridiem: data.clockedOuttimeMeridiem
          }
          setCheckedOutEmployees(checkedOutEmployees => [...checkedOutEmployees, tmpemp])
        }
      });
      setloading(false);

    } catch (err) {
      console.log(err);
    }
  };

  const updateServiceStatus = async (serviceId, status, rejectReason, reasonHeading) => {
    try {
      const formData = {
        serviceId: serviceId,
        status: status,
        rejectReason: rejectReason,
        reasonHeading: reasonHeading
      }

      const response = await fetch(`${API_SERVICE}/updateServiceStatus`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        if (status === "confirmed") {
          toast.success("Booking Confirmed")
          window.location.reload(false)
        } else if (status === "waitlist") {
          toast.success("Booking added to waitlist")
          window.location.reload(false)
        } else if (status === "reject") {
          toast.success("Booking rejected")
          window.location.reload(false)
        }

      }
    } catch (err) {
      console.error(err);
      //   toast.error('Something went wrong!');
      //   helpers.setStatus({ success: false });
      //   helpers.setErrors({ submit: err.message });
      //   helpers.setSubmitting(false);
    }
  }

  const getServicesAll = async () => {
    // const userEmail = sessionStorage.getItem("userEmail");
    const userEmail = localStorage.getItem("userEmail");
    try {
      const response = await fetch(`${API_SERVICE}/getuserServices/${userEmail}`);
      const data = await response.json();
      setServices(data.data);
      console.log(data.data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Reason to reject Booking
        </DialogTitle>
        <DialogContent>
          <>
            <Typography
              color="textSecondary"
              sx={{
                mb: 2,
                mt: 3
              }}
              variant="subtitle2"
            >
              Heading
            </Typography>
            <TextField
              fullWidth
              label="Heading"
              name="name"
              onChange={(e) => setHeading(e.target.value)}
              value={heading}
            />
            <Typography
              color="textSecondary"
              sx={{
                mb: 2,
                mt: 3
              }}
              variant="subtitle2"
            >
              Reason
            </Typography>
            <Editor
              apiKey='azhogyuiz16q8om0wns0u816tu8k6517f6oqgs5mfl36hptu'
              value={article}
              onInit={(evt, editor) => {
                setText(editor.getContent({ format: 'text' }));
              }}
              onEditorChange={(newValue, editor) => {
                setArticle(newValue);
                setText(editor.getContent({ format: 'text' }));
              }}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={()=>{updateServiceStatus(tmpServiceId, "reject", article, heading)}} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Card {...props}>
        <CardHeader title={`${props?.title}`} />
        <Divider />

        {
          (props?.currently === true) && (
            <>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Pet Name
                    </TableCell>
                    <TableCell align="center">
                      Customer Email
                    </TableCell>
                    <TableCell align="center">
                      Breed
                    </TableCell>
                    <TableCell align="center">
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allPets.filter(obj1 => !todayPets.some(obj2 => obj1._id === obj2.petId)).map((pet) => {
                    return (
                      <TableRow
                        hover
                        key={pet._id}
                      >
                        <TableCell component="th" scope="row">
                          {pet?.name}
                        </TableCell>
                        <TableCell align="center">
                          <NextLink
                            href={`/dashboard/customers/1?customerId=${pet?.ownerId}`}
                            passHref
                          >
                            <Link
                              color="inherit"
                              variant="subtitle2"
                            >
                              {pet?.ownerEmail}
                            </Link>
                          </NextLink>

                        </TableCell>
                        <TableCell align="center">
                          {pet?.breed}
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              width: "22%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginLeft: "1rem",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CreateIcon />
                            </div>
                            <NoteAddIcon />
                            <LogoutIcon />
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {/* <TablePagination
              count={allVaccines.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            /> */}

              {/* <DataGrid
              color="primary"
              rows={allVaccines}
              columns={columns}
              rowsPerPageOptions={[5,10,15]}
              pageSize={5}
            /> */}
            </>
          )
        }
        {(props?.title === "Pet Checked In") && (
          <>
            <List disablePadding>
              {allPets.filter(obj1 => todayPets.filter(obj => obj?.checkedOuttime === "").some(obj2 => obj1._id === obj2.petId)).map((employee, index) => (
                <ListItem key={employee._id}>
                  <ListItemAvatar>
                    <Avatar src={employee.img} />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {employee.name}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography color="textSecondary" variant="body2">
                        {todayPets.find(obj1 => obj1.petId === employee._id).checkedIndate}-{todayPets.find(obj1 => obj1.petId === employee._id).checkedInmonth}-{todayPets.find(obj1 => obj1.petId === employee._id).checkedInyear}, {todayPets.find(obj1 => obj1.petId === employee._id).checkedIntime} {todayPets.find(obj1 => obj1.petId === employee._id).checkedIntimeMeridiem}
                      </Typography>
                    }
                    sx={{ pr: 2 }}
                  />
                  {/* <Typography
                    color="textSecondary"
                    sx={{ whiteSpace: "nowrap" }}
                    variant="caption"
                  >
                    {formatDistanceToNowStrict(message.date, { addSuffix: true })}
                  </Typography> */}
                  <Box
                    sx={{
                      width: "22%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginLeft: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    {/* <SaveAsIcon /> */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CreateIcon />
                    </div>
                    <NoteAddIcon />
                    <LogoutIcon />
                  </Box>
                </ListItem>
              ))}
            </List>
          </>
        )
        }
        {(props?.title === "Pet Checked Out") && (
          <>
            <List disablePadding>
              {checkedOutEmployees.map((employee, index) => (
                <ListItem divider={index + 1 < checkedOutEmployees.length} key={employee.id}>
                  <ListItemAvatar>
                    <Avatar src={employee.img} />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {employee.employeeName}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography color="textSecondary" variant="body2">
                        {employee.clockedOutdate}-{employee.clockedOutmonth}-{employee.clockedOutyear}, {employee.clockedOuttime} {employee.clockedOuttimeMeridiem}
                      </Typography>
                    }
                    sx={{ pr: 2 }}
                  />
                  {/* <Typography
                    color="textSecondary"
                    sx={{ whiteSpace: "nowrap" }}
                    variant="caption"
                  >
                    {formatDistanceToNowStrict(message.date, { addSuffix: true })}
                  </Typography> */}
                  <Box
                    sx={{
                      width: "22%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginLeft: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    {/* <SaveAsIcon /> */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CreateIcon />
                    </div>
                    <NoteAddIcon />
                    <LogoutIcon />
                  </Box>
                </ListItem>
              ))}
            </List>
          </>
        )
        }
        {
          (props?.title === "Pending Bookings") && (
            <>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Service
                    </TableCell>
                    <TableCell align="center">
                      Pet Name
                    </TableCell>
                    <TableCell align="center">
                      Customer Name
                    </TableCell>
                    <TableCell align="center">
                      Booked for
                    </TableCell>
                    <TableCell align="center">
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reqPets.map((pet) => {
                    if (pet.status === "pending") {
                      return (
                        <TableRow
                          hover
                        // key={product._id}
                        >
                          <TableCell component="th" scope="row">
                            {pet.serviceName}
                          </TableCell>
                          <TableCell align="center">
                            {pet.petName}
                          </TableCell>

                          <TableCell align="center">
                            {/* <NextLink
                            href={`/dashboard/customers/1?customerId=${pet?.ownerId}`}
                            passHref
                          >
                            <Link
                              color="inherit"
                              variant="subtitle2"
                            > */}
                            {pet.customerfname} {pet.customerlname}
                            {/* </Link>
                          </NextLink> */}
                          </TableCell>
                          <TableCell align="center">
                            {pet.bookedForDate} / {pet.bookedForMonth} / {pet.bookedForYear}
                          </TableCell>
                          <TableCell align="center">
                            <Box
                              sx={{
                                width: "22%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                // marginLeft: "1rem",
                                cursor: "pointer",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Button onClick={() => { updateServiceStatus(pet.serviceId, "confirmed") }}>
                                  <CheckIcon />
                                </Button>
                              </div>
                              <Button onClick={() => { updateServiceStatus(pet.serviceId, "waitlist") }}>
                                <TimerIcon />
                              </Button>
                              {/* updateServiceStatus(pet.serviceId, "reject") */}
                              <Button onClick={() => {handleClickOpen(pet.serviceId) }}>
                                <ClearIcon />
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
              {/* <TablePagination
              count={allVaccines.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            /> */}

              {/* <DataGrid
              color="primary"
              rows={allVaccines}
              columns={columns}
              rowsPerPageOptions={[5,10,15]}
              pageSize={5}
            /> */}
            </>
          )
        }
        {(props?.title === "Employees Checked In") && (
          <>
            <List disablePadding>
              {checkedInEmployees.map((employee, index) => (
                <ListItem divider={index + 1 < checkedInEmployees.length} key={employee.id}>
                  <ListItemAvatar>
                    <Avatar src={employee.img} />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {employee.employeeName}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography color="textSecondary" variant="body2">
                        {employee.clockedIndate}-{employee.clockedInmonth}-{employee.clockedInyear}, {employee.clockedIntime} {employee.clockedIntimeMeridiem}
                      </Typography>
                    }
                    sx={{ pr: 2 }}
                  />
                  {/* <Typography
                    color="textSecondary"
                    sx={{ whiteSpace: "nowrap" }}
                    variant="caption"
                  >
                    {formatDistanceToNowStrict(message.date, { addSuffix: true })}
                  </Typography> */}
                  <Box
                    sx={{
                      width: "22%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginLeft: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    {/* <SaveAsIcon /> */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CreateIcon />
                    </div>
                    <NoteAddIcon />
                    <LogoutIcon />
                  </Box>
                </ListItem>
              ))}
            </List>
          </>
        )
        }
        {(props?.title === "Employees Checked Out") && (
          <>
            <List disablePadding>
              {checkedOutEmployees.map((employee, index) => (
                <ListItem divider={index + 1 < checkedOutEmployees.length} key={employee.id}>
                  <ListItemAvatar>
                    <Avatar src={employee.img} />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {employee.employeeName}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography color="textSecondary" variant="body2">
                        {employee.clockedOutdate}-{employee.clockedOutmonth}-{employee.clockedOutyear}, {employee.clockedOuttime} {employee.clockedOuttimeMeridiem}
                      </Typography>
                    }
                    sx={{ pr: 2 }}
                  />
                  {/* <Typography
                    color="textSecondary"
                    sx={{ whiteSpace: "nowrap" }}
                    variant="caption"
                  >
                    {formatDistanceToNowStrict(message.date, { addSuffix: true })}
                  </Typography> */}
                  <Box
                    sx={{
                      width: "22%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginLeft: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    {/* <SaveAsIcon /> */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CreateIcon />
                    </div>
                    <NoteAddIcon />
                    <LogoutIcon />
                  </Box>
                </ListItem>
              ))}
            </List>
          </>
        )
        }





        {/* <Divider />
      <CardActions>
        <Button>View More</Button>
      </CardActions> */}
      </Card>
    </>
  )


}
