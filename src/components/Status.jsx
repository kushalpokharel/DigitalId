import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import db from './firebase/firebase';
import identity from '../ethereum/identity';
import {doc, collection, getDoc, where, query } from 'firebase/firestore';
import {create} from 'ipfs-http-client';
const client = create('https://ipfs.infura.io:5001/api/v0');

function Status(){
    const licenseStatus = useSelector(state => state.statusReducer.license);
    const citizenStatus = useSelector(state => state.statusReducer.citizenship);
    const acc = useSelector(state => state.userReducer.address);
    const idAddr =useSelector(state => state.userReducer.contractAddr);
    const [loading, setLoading] = useState(false);

    console.log(licenseStatus);
    console.log(citizenStatus);

    const statusmap = {"NOT_REQUESTED":0, "REQUESTED":1, "APPROVED":2, "PUSHED":3, "REJECTED":4}
    const colorArray = ["#d61174","#c95d1a","#4ce0b6","green","red"] 
    const message = ["You have not yet made a request to verify this document", "Your document has been submitted for verification", "Congratulations! You document has been verified", "You have already pushed this data to ipfs", "Sorry, your document request has been rejected"];
    const secondmsg = ["Click below to make a request", "Please be patient", "Push your documents to IPFS and solely control your identity", "Please try again "];
    const buttons = ["REQUEST", "", "PUSH TO IPFS", "VERIFY", "REQUEST"];
    const dispatch = useDispatch();

    const instantiate = async() =>{
        if(acc!==""){
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
    }

    const handleCitizen = async() =>{
        console.log(citizenStatus);
        if(citizenStatus.status === "APPROVED"){
            setLoading(true);
            console.log(acc);
            if(acc!=""){
                const docRef = doc(db, "accepted", acc);
                const querySnapshot = await getDoc(docRef);
                const snapshot = querySnapshot.data();

                console.log(acc);
                const id = identity(idAddr);
                // id.setIpfsHash(hash);
                const details = await id.methods.getDetails().call()
                const response = await fetch(`https://ipfs.infura.io/ipfs/${details._ipfs_hash}`)
                const newObj = {...response.data, ...snapshot};
                console.log(newObj);
                const url = await client.add(Buffer.from(JSON.stringify(newObj)));
                console.log(url);
                await id.methods.setIPFSHash(url.path).send({
                    from:acc
                });
                const newUrl = await id.methods.getDetails().call();
                console.log(newUrl);
                // delete document
                // const docRef = doc(db,"accepted", addr);
                // await deleteDoc(docRef);
                setLoading(false);
            }
        }
    }
    useEffect(()=>{
        instantiate()
    })

    return (
        <Grid container justifyContent='space-evenly' style={{padding:"30px"}}>
            <Grid item>
                <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color={colorArray[statusmap[citizenStatus.status]]} gutterBottom>
                    {citizenStatus.status}
                    </Typography>
                    
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Citizenship
                    </Typography>
                    <Typography variant="body2">
                    {message[statusmap[citizenStatus.status]]}
                    <br />
                    {secondmsg[statusmap[citizenStatus.status]]}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleCitizen} size="small">{buttons[statusmap[citizenStatus.status]]}</Button>
                </CardActions>
                </Card>
            </Grid>
            <Grid item>
                <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color={colorArray[statusmap[licenseStatus.status]]} gutterBottom>
                    {licenseStatus.status}
                    </Typography>
                    
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    License
                    </Typography>
                    <Typography variant="body2">
                    {message[statusmap[licenseStatus.status]]}
                    <br />
                    {secondmsg[statusmap[licenseStatus.status]]}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">{buttons[statusmap[licenseStatus.status]]}</Button>
                </CardActions>
                </Card>
            </Grid>
        </Grid>
      );
}


export default Status;