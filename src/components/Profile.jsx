import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import pic from '../assets/images/2.jpg'; 
import { Circle } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import QRCode from 'qrcode';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

export default function Profile(){
    let citizenship = useSelector(state => state.ipfsDataReducer.citizenship);
    let license = useSelector(state => state.ipfsDataReducer.license);
    const user = useSelector(state => state.userReducer);
    const [checkState, setCheckState] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [qrcode, setqr] = useState("");
    const [open, setOpen] = useState(false);
    const [button1color, setbt1color] =useState("#f1b6ae");
    const [button2color, setbt2color] =useState("white");
    

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        setCheckState(new Array(Object.keys(citizenship).length).fill(false));
            
    },[]);

    const handleChange = (position)=>{
        console.log(position)
        const updatedCheckedState = checkState.map((item, index) =>index === position ? !item : item);
        setCheckState(updatedCheckedState);
    }

    const generateQR = () =>{
        handleOpen();
        console.log(open);
        const temp = {};
        let pg;
        if(page==0){
            pg = citizenship;
        }
        else{
            pg = license;
        }
        Object.keys(pg).map((obj, index)=>{
            if(checkState[index]){
                temp[obj] = pg[obj];
            }
        });
        console.log(temp)
        QRCode.toDataURL(JSON.stringify(temp)).then((data)=>{
            setqr(data);
        });
        
        
    }   

    return(
    <>
    <Grid
    container
    spacing={0}
    direction="row"
    // alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
    >
        <Grid item xs={9} md={7}>

            <Card >
            <CardMedia
                component="img"
                alt="profile picture"
                height="250"
                src={pic}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Hi {user.username}
                </Typography>
                {
                page==0? 
                    Object.keys(citizenship).map((key, index)=>{
                    // console.log(citizenship[key])
                    return (
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Grid container alignItems='center' spacing={5}>
                                    <Grid item xs={1} >
                                            {/* <input
                                                type="checkbox"
                                                id={`custom-checkbox-${index}`}
                                                name={key}
                                                value={key}
                                                checked={checkState[index]||false}
                                                onChange={handleChange(index)}
                                                style={{margin:"5px"}}
                                            /> */}
                                            <Checkbox
                                                checked={checkState[index]||false}
                                                onChange={()=>handleChange(index)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                    </Grid>

                                    <Grid item >
                                        <Typography >{key.charAt(0).toUpperCase()+key.slice(1)}</Typography>                                   
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item >
                                <Typography variant="body2">{citizenship[key]}</Typography>
                            </Grid>
                            
                        </Grid>
                    ) 
                }):
                Object.keys(license).map((key, index)=>{
                    // console.log(index)
                    return (
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Grid container spacing={5}>
                                    <Grid item xs={1} >
                                    <Checkbox
                                                checked={checkState[index]||false}
                                                onChange={()=>handleChange(index)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    </Grid>

                                    <Grid item justifyContent='center' alignContent='center' align='center'>
                                        <Typography >{key}</Typography>                                   
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item justifyContent='center' alignContent='center' align='center'>
                                <Typography variant="body2">{license[key]}</Typography>
                            </Grid>
                            
                        </Grid>
                    ) 
                })
            }
            </CardContent>
            <CardActions>
                <Grid container justifyContent="space-between">
                    <Grid item xs={5}>
                        <Grid container justifyContent="space-between" >
                            <Grid item >
                                <Button style={{backgroundColor:button1color}} onClick={()=>{setPage(0); setbt1color("#f1b6ae"); setbt2color("white")}}>Citizenship</Button>
                            </Grid>
                            <Grid item >
                                <Button style={{backgroundColor:button2color}} onClick={()=>{setPage(1); setbt2color("#f1b6ae"); setbt1color("white")}}>License</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button size="small" onClick={generateQR}>Generate QR</Button>
                    </Grid>
                </Grid>
            </CardActions>
            </Card>
        </Grid>
    </Grid>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" justifyContent="center" align='center' alignContent='center'>
            Scan the QR code below 
            </Typography>
            <div style={{textAlign:'center'}}>
                <img src={qrcode} width="200" height="200"></img>
            </div>
        </Box>
    </Modal>
    </>
    )
};