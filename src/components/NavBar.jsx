import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ProfileIcon from '@mui/icons-material/AccountBox';
import DocumentAddIcon from '@mui/icons-material/PostAdd';
import ApprovedIcon from '@mui/icons-material/AssignmentTurnedIn';
import MailIcon from '@mui/icons-material/Mail';
import ScanIcon from '@mui/icons-material/DocumentScanner';
import { useDispatch } from 'react-redux';
import Profile from './Profile';
import Web3 from '../ethereum/web3';
import Factory from '../ethereum/factory';
import Identity from '../ethereum/identity';
import AddAttributes from './AddAtrributes';
import { userReducer } from '../reducers/userReducer';
import db from './firebase/firebase';
import Status from './Status';
import {doc, collection, getDoc, where, query } from 'firebase/firestore';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {

  const [index, setIndex] = React.useState(0);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const instantiate = async() =>{
    const accounts = await Web3.eth.getAccounts();
    const acc = accounts[0];

    dispatch({
      type:"SET_ADDRESS",
      payload:{
        "address":acc
      }
    })
  
    const contractAddr = await Factory.methods.getUserContractAddress().call({from:acc});
    const identity = Identity(contractAddr);
    const details = await identity.methods.getDetails().call();
    const ipfshash = details[1];
    console.log(ipfshash);
    if (ipfshash !== '') {
        dispatch(
        {
            type:"SET_IPFS",
            payload:{
                "ipfsHash": ipfshash
            }
        });
    }

    dispatch(
      {
          type:"SET_CONTRACT",
          payload:{
              "address": contractAddr
          }
      });
    const url = `https://ipfs.infura.io/ipfs/${ipfshash}`;
    // console.log(url);
    const response = await fetch(url)
    const datae = await response.json();
    // console.log("data"+data);
    // Object.keys(data).forEach(key=>{
    //   console.log(data[key]+ data.name[0]);
    // });
    const data = await datae.citizenship;
    dispatch(
    {
        type:"SET_USERNAME",
        payload:{
            "username": datae.name===undefined?"Kushal":datae.name
        }
    });
    dispatch(
      {
        type:"SET_CITIZENSHIP",
        payload:{
        "Full Name" : data.fullName===undefined?"Not Defined":[...data.fullName],
        "Address" : data.permanentAddress===undefined?"Not Defined":[...data.permanentAddress],
        "DOB" : data.birthDate===undefined?"Not Defined":[...data.birthDate],
        "Father's Name": data.fatherName===undefined?"Not Defined":[...data.fatherName],
        "Mother's Name" : data.motherName===undefined?"Not Defined":[...data.motherName],
        "Citizenship Number" : data.citizenshipNumber===undefined?"Not Defined":[...data.citizenshipNumber],
        "Date Of Registration" : data.issuedDate===undefined?"Not Defined":[...data.issuedDate]
        }
      }
    );
    dispatch(
      {
        type:"SET_LICENSE",
        payload:{
        "Full Name" : data.licensefullname===undefined?"Not Defined":data.licensefullname,
        "Address" : data.licenseaddress===undefined?"Not Defined":data.licenseaddress,
        "DOB" : data.licensedob===undefined?"Not Defined":data.licensedob,
        "Father's Name": data.licensefatherName===undefined?"Not Defined":data.licensefatherName,
        "Mother's Name" : data.licensemotherName===undefined?"Not Defined":data.licensemotherName,
        "License Number" : data.licenseNumber===undefined?"Not Defined":data.licenseNumber,
        "Date Of Registration" : data.licensedateOfRegistration===undefined?"Not Defined":data.licensedateOfRegistration
        }
      }
    );
    if(data.fullname!==undefined){
      dispatch(
        {
          type:"SET_CITIZENSHIP_STATUS",
          payload:{
            "status":"PUSHED"
          }
        }
      );
    }
    if(data.licensefullname!==undefined){
      dispatch(
        {
          type:"SET_LICENSE_STATUS",
          payload:{
            "status":"PUSHED"
          }
        }
      );
    }
      console.log(acc);
      const accRefs = doc(db, "accepted", acc);
      const docRefs = doc(db, "request", acc);
      
      const docref1 = await getDoc(docRefs);
      const accref1 = await getDoc(accRefs);
      
      const docref = docref1.data();
      const accref = accref1.data();
      
      if(docref===undefined && accref==undefined){
        dispatch(
          {
            type:"SET_CITIZENSHIP_STATUS",
            payload:{
              "status":"NOT_REQUESTED"
            }
          }
        );
        dispatch(
          {
            type:"SET_LICENSE_STATUS",
            payload:{
              "status":"NOT_REQUESTED"
            }
          }
        );
      }

      if(docref!==undefined && docref.citizenship){
        dispatch(
          {
            type:"SET_CITIZENSHIP_STATUS",
            payload:{
              "status":"REQUESTED"
            }
          }
        );
      }
      else if(accref!==undefined && accref.citizenship){
        dispatch(
          {
            type:"SET_CITIZENSHIP_STATUS",
            payload:{
              "status":"APPROVED"
            }
          }
        );
      }
      if(docref!==undefined && docref.license){
        dispatch(
          {
            type:"SET_LICENSE_STATUS",
            payload:{
              "status":"PUSHED"
            }
          }
        );
      }
      else if(accref!==undefined && accref.license){
        dispatch(
          {
            type:"SET_LICENSE_STATUS",
            payload:{
              "status":"APPROVED"
            }
          }
        );
      }
      
  
    

  }

  React.useEffect(()=>instantiate)

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Digital Identity
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Profile', 'Add documents', 'Document status', 'Approved documents'].map((text, ind) => ind==index?(
            
            <ListItemButton
              selected
              key={text}
              onClick = {()=>{setIndex(ind)}}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
            
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {ind === 0 ? <ProfileIcon /> : ind==1? <DocumentAddIcon />: ind==2?<ScanIcon/>:ind==3?<ApprovedIcon/>:<MailIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ):
          (
            
            <ListItemButton
              
              key={text}
              onClick = {()=>{setIndex(ind)}}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
            
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {ind === 0 ? <ProfileIcon /> : ind==1? <DocumentAddIcon />: ind==2?<ScanIcon/>:ind==3?<ApprovedIcon/>:<MailIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          )
          )}
        </List>
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {index==0?<Profile/>:index==1?<AddAttributes/>:index==2?<Status/>:<h1>Your approved page</h1>}
      </Box>
    </Box>
    
    </>
  );
}

