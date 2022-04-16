import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import pic from "../assets/images/2.jpg";
import { Circle } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import QRCode from "qrcode";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Profile() {
  let citizenship = useSelector((state) => state.ipfsDataReducer.citizenship);
  let license = useSelector((state) => state.ipfsDataReducer.license);
  const user = useSelector((state) => state.userReducer);
  const [checkState, setCheckState] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [qrcode, setqr] = useState("");
  const [open, setOpen] = useState(false);
  const [button1color, setbt1color] = useState("#6EDCD9");
  const [button2color, setbt2color] = useState("white");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setCheckState(new Array(Object.keys(citizenship).length).fill(false));
  }, []);

  const handleChange = (position) => {
    console.log(position);
    const updatedCheckedState = checkState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckState(updatedCheckedState);
  };

  const generateQR = () => {
    handleOpen();
    console.log(open);
    const temp = {};
    let pg;
    if (page == 0) {
      pg = citizenship;
    } else {
      pg = license;
    }
    Object.keys(pg).map((obj, index) => {
      if (checkState[index]) {
        temp[obj] = pg[obj];
      }
    });
    console.log(temp);
    QRCode.toDataURL(JSON.stringify(temp)).then((data) => {
      setqr(data);
    });
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="row"
        // alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={9} md={7}>
          <Card>
            <CardActions>
              <Grid container justifyContent="space-between">
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Button
                      style={{ backgroundColor: button1color, color: "gray" }}
                      onClick={() => {
                        setPage(0);
                        setbt1color("#6EDCD9");
                        setbt2color("white");
                      }}
                    >
                      Citizenship
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{ backgroundColor: button2color, color: "gray" }}
                      onClick={() => {
                        setPage(1);
                        setbt2color("#6EDCD9");
                        setbt1color("white");
                      }}
                    >
                      License
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </CardActions>

            <CardMedia
              //   align="center"
              component="img"
              alt="profile picture"
              height="250"
              //   m={20}
              src={pic}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                position: "relative",
                left: "50%",
                top: "0%",
                transform: "translate(-50%, 0%)",
                // align: "center",
              }}
            />

            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align="center"
                mt={2}
                mb={2}
              >
                {user.username}
              </Typography>
              {page == 0
                ? Object.keys(citizenship).map((key, index) => {
                    // if (citizenship[key])
                    if (citizenship[key][1])
                      return (
                        <ListItem
                          key={key}
                          secondaryAction={
                            <Checkbox
                              edge="end"
                              checked={checkState[index] || false}
                              onChange={() => handleChange(index)}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          disablePadding
                        >
                          <ListItemButton>
                            <Typography>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Typography>

                            <Typography>
                              {"  : " + citizenship[key][1]}
                            </Typography>
                          </ListItemButton>
                        </ListItem>
                      );
                  })
                : Object.keys(license).map((key, index) => {
                    // console.log(index)
                    if (license[key][1])
                      return (
                        <ListItem
                          key={key}
                          secondaryAction={
                            <Checkbox
                              edge="end"
                              checked={checkState[index] || false}
                              onChange={() => handleChange(index)}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          disablePadding
                        >
                          <ListItemButton>
                            <Typography>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Typography>

                            <Typography>{"  : " + license[key][1]}</Typography>
                          </ListItemButton>
                        </ListItem>
                      );
                  })}
            </CardContent>
            <CardActions>
              <Grid container justifyContent="center">
                <Grid item>
                  <Box m={2}>
                    <Button
                      size="large"
                      variant="contained"
                      onClick={generateQR}
                    >
                      Generate QR
                    </Button>
                  </Box>
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            justifyContent="center"
            align="center"
            alignContent="center"
          >
            Scan the QR code below
          </Typography>
          <div style={{ textAlign: "center" }}>
            <img src={qrcode} width="200" height="200"></img>
          </div>
        </Box>
      </Modal>
    </>
  );
}
