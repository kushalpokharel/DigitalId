import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageUpload from './ImageUpload';
import Factory from '../ethereum/factory';
import Identity from '../ethereum/identity';
import { useDispatch, useSelector } from 'react-redux';
import {create} from 'ipfs-http-client';
import { useNavigate } from 'react-router-dom';

const client = create('https://ipfs.infura.io:5001/api/v0');

const theme = createTheme();

export default function SignUp() {
  const address = useSelector(state => state.userReducer.address);
  console.log(address);  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const username = data.get('username');
    console.log({"username":username});

    try{
      await Factory.methods.createUser().send({
        from: address,
      });
      const contractAddr = await Factory.methods.getUserContractAddress().call({from:address});
      console.log(contractAddr);
      dispatch(
        {
            type:"SET_CONTRACT",
            payload:{
                "address": contractAddr
            }
        }
      );
      const identity = Identity(contractAddr);
          
      console.log('Adding the username to the ipfs');
      // add the username to to IPFS 
      let cid;
      const pushdata = { 'name': username }
      cid = await client.add(Buffer.from(JSON.stringify(pushdata)));
      const url =  `https://ipfs.infura.io/ipfs/${cid.path}`;
      console.log(url);

      // add ipfs hash to contract
      console.log(cid.path);
      // setLoadingCreateipfshash(true);
      identity.methods.setIPFSHash(cid.path).send({
        from: address
      }).then(() => {
        identity.methods.getDetails().call().then((details) => {
          if (details[1] !== '') {
            dispatch(
              {
                  type:"SET_CONTRACT",
                  payload:{
                      "ipfsHash": details[1]
                  }
              }
            );
          }
        })
      });
      navigate('/home');
    }
    catch(e){
      alert("Error: "+ e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Account
            </Typography>
            <ImageUpload />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}