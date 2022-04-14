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
  
    const contractAddr = await Factory.methods.getUserContractAddress().call({from:acc});
    const identity = Identity(contractAddr);
    identity.methods.getDetails().call().then((details) => {
        console.log(details);
        if (details[1] !== '') {
            dispatch(
            {
                type:"SET_IPFS",
                payload:{
                    "ipfsHash": details[1]
                }
            });
        }
    });
    dispatch(
    {
        type:"SET_CONTRACT",
        payload:{
            "address": contractAddr
        }
    });

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
          {['Profile', 'Add documents', 'Approved Documents', 'Your documents'].map((text, ind) => ind==index?(
            
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
                {ind === 0 ? <ProfileIcon /> : ind==1? <DocumentAddIcon />: ind==2?<ApprovedIcon/>:ind==3?<ScanIcon/>:<MailIcon/>}
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
                {ind === 0 ? <ProfileIcon /> : ind==1? <DocumentAddIcon />: ind==2?<ApprovedIcon/>:ind==3?<ScanIcon/>:<MailIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          )
          )}
        </List>
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {index==0?<Profile/>:index==1?<AddAttributes/>:index==2?<h1>Your accepted doc page</h1>:<h1>Your IPFS page</h1>}
      </Box>
    </Box>
    
    </>
  );
}

