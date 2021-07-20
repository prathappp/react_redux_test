import React, { useState, useEffect } from 'react';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux'
import { getCars } from "./redux/actions";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  input: {
    margin: theme.spacing(1),
    ["@media (max-width: 450px)"]: {
      width: '95%'
    }
  },
  loader: {
    display: 'block',
    position: 'absolute',
    left: '50%',
    top: '30%'
  },
  root: {
    width: '97%',
    padding: '1rem'
  },
  root1: {
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  root2: {
    minWidth: 275,
    padding: 10,
    width: '96.5%'
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const classes = useStyles();
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [make, setMake] = useState('');
  const [year, setYear] = useState('');
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();;
  const carsData = useSelector(state => state ?.cars ?.carsData);
  const error = useSelector(state => state ?.cars ?.error);
  const carsError = useSelector(state => state ?.cars ?.carsError);


  useEffect(() => {
    setLoader(false);
    setCars(carsData)
  }, [carsData]);

  useEffect(() => {
    if (error) {
      setLoader(false);
      setOpen(true);
      setMessage(error ?.message)
    }
  }, [error]);

  useEffect(() => {
    if (carsError) {
      setLoader(false);
      setOpen(true);
      setMessage(carsError ?.message)
    }
  }, [carsError]);
  const getCarDetails = () => {
    let endPoint = 'GetModelsForMakeYear';
    if (!make) {
      setOpen(true);
      setMessage('Please enter Car Make')
      return;
    }
    if (make && !year && !type) {
      endPoint = `GetModelsForMake/${make}`
    } else {
      if (make) {
        endPoint += `/make/${make}`;
      }
      if (year) {
        endPoint += `/modelyear/${year}`;
      }
      if (type) {
        endPoint += `/vehicletype/${type}`;
      }
    }
    endPoint += '?format=json';
    setLoader(true);
    dispatch(getCars(endPoint));

  }
  function GridList() {
    return (
      <Card className={classes.root1}>
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Make Id</TableCell>
                  <TableCell align="right">Make Name</TableCell>
                  <TableCell align="right">Model Id</TableCell>
                  <TableCell align="right">Model Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cars.map((row) => (
                  <TableRow key={row.Make_ID}>
                    <TableCell align="right">{row.Make_ID}</TableCell>
                    <TableCell align="right">{row.Make_Name}</TableCell>
                    <TableCell align="right">{row.Model_ID}</TableCell>
                    <TableCell align="right">{row.Model_Name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
		  {!cars.length && <label className={classes.margin}>No records found</label>}
        </CardContent>
      </Card>
    );
  }
  function handleClose() {
    setMessage('');
    setOpen(false);
  }
  return (
    <div className={classes.root}>
      {loader && <CircularProgress className={classes.loader} />}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
        <Alert onClose={handleClose} severity="error">
          {message || 'Some problem occured'}
        </Alert>
      </Snackbar>
      <section>
        <Card >
          <CardContent>
            <TextField className={classes.input} size="small" label="Car Make" variant="outlined" value={make} onChange={(event) => {
              setMake(event.target.value)
            }} />
            <TextField type='number' className={classes.input} size="small" label="Car Year" variant="outlined" value={year} onChange={(event) => {
              setYear(event.target.value)
            }} />
            <TextField className={classes.input} size="small" label="Car Type" variant="outlined" value={type} onChange={(event) => {
              setType(event.target.value)
            }} />
            <Button className={classes.input} variant="outlined" color="primary" onClick={getCarDetails}>
              Search
            </Button>
          </CardContent>
        </Card>
        <GridList />
      </section>
    </div>
  );
}

export default App;
