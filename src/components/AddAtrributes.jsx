import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import { Formik, getIn } from 'formik';
import { collection,doc, addDoc, setDoc } from "firebase/firestore";
import db from './firebase/firebase';
import { useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import {
  LocalizationProvider, 
  DatePicker,
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const theme = createTheme();

const AddAttributes = () => {

  const user = useSelector(state=>state.userReducer);

  const initialValues = {
    citizenshipNumber: '',
    name: {
      firstName: '',
      middleName: '',
      lastName: ''
    },
    gender: '',
    birthPlace: {
      provinceno: '',
      district: '',
      vdcMunicipality: '',
      wardno: ''
    },
    birthDate: '',
    fatherName: {
      firstName: '',
      middleName: '',
      lastName: ''
    },
    motherName: {
      firstName: '',
      middleName: '',
      lastName: ''
    },
    permanentAddress: {
      provinceno: '',
      district: '',
      vdcMunicipality: '',
      wardno: ''
    },
    issuedPlace: {
      provinceno: '',
      district: '',
      vdcMunicipality: '',
      wardno: ''
    },
    issuedDate: ''
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid 
        container 
        justifyContent="center" 
        alignContent='center'
        direction="row"
      >
        <Grid item xs={12} md={9}>
        <Card>
        <CardHeader title="CitizenshipForm" />
        <Divider />
          <Formik
          initialValues={{
          ...initialValues
          }}
          validationSchema = {Yup.object().shape({
            citizenshipNumber: Yup.string()
              .required('CitizenshipNumber is required'),
            name: Yup.object().shape({
              firstName: Yup.string().required('Firstname is required'),
              lastName: Yup.string().required('Lastname is required')
            }),
            gender: Yup.string()
              .required('Gender is required'),
              // .matches('Not Selected', "Gender is required"),
            birthPlace: Yup.object().shape({
              provinceno: Yup.number()
                .required('Province number is required')
                .min(1, 'Invalid Province Number')
                .max(7, 'Invalid Province number'),
              district: Yup.string().required('District is required'),
              vdcMunicipality: Yup.string().required('Vdc/Municipality is required'),
              wardno: Yup.number()
                .required('Ward number is required')
                .min(1, 'Invalid Ward Number')
                .max(30, 'Invalid Ward number'),
            }),
            birthDate: Yup.string()
              .required('BirthDate is required'),
            fatherName: Yup.object().shape({
              firstName: Yup.string().required('Firstname is required'),
              lastName: Yup.string().required('Lastname is required')
            }),
            motherName: Yup.object().shape({
              firstName: Yup.string().required('Firstname is required'),
              lastName: Yup.string().required('Lastname is required')
            }),
            permanentAddress: Yup.object().shape({
              provinceno: Yup.number()
                .required('Province number is required')
                .min(1, 'Invalid Province Number')
                .max(7, 'Invalid Province number'),
              district: Yup.string().required('District is required'),
              vdcMunicipality: Yup.string().required('Vdc/Municipality is required'),
              wardno: Yup.number()
                .required('Ward number is required')
                .min(1, 'Invalid Ward Number')
                .max(30, 'Invalid Ward number'),
            }),
            issuedPlace: Yup.object().shape({
              provinceno: Yup.number()
                .required('Province number is required')
                .min(1, 'Invalid Province Number')
                .max(7, 'Invalid Province number'),
              district: Yup.string().required('District is required'),
              vdcMunicipality: Yup.string().required('Vdc/Municipality is required'),
              wardno: Yup.number()
                .required('Ward number is required')
                .min(1, 'Invalid Ward Number')
                .max(30, 'Invalid Ward number'),
            }),
            issuedDate: Yup.string()
              .required('Citizenship IssuedDate is required'),
            })}

          onSubmit = {async (values, {resetForm}, {setFieldValue}) => {
            console.log(values);
           
            try {
              await setDoc(doc(db, "request", user.address), {"citizenship":values});
              
            } catch (e) {
              console.error("Error adding document: ", e);
            }
            alert('Your request has been submitted.')
            // setFieldValue('birthDate', '');
            resetForm();
          }}>
            {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            isValid,
            dirty,
            touched,
            values,
            setFieldValue
          }) => (
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <CardContent>
                <Grid container spacing={2}>

                  <Grid item md={4} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'name.firstName') &&
                    getIn(errors, 'name.firstName')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'name.firstName') &&
                    getIn(errors, 'name.firstName')
                    }
                    label="FirstName"
                    name="name.firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.name.firstName}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                    fullWidth
                    label="MiddleName"
                    name="name.middleName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.name.middleName}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'name.lastName') &&
                    getIn(errors, 'name.lastName')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'name.lastName') &&
                    getIn(errors, 'name.lastName')
                    }
                    label="LastName"
                    name="name.lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.name.lastName}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                    error={Boolean(touched.citizenshipNumber && errors.citizenshipNumber)}
                    fullWidth
                    required
                    helperText={touched.citizenshipNumber && errors.citizenshipNumber}
                    label="CitizenshipNumber"
                    name="citizenshipNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.citizenshipNumber}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                      <TextField 
                        fullWidth
                        size="small"
                        required
                        select
                        label="Gender"
                        name="gender"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.gender && errors.gender)}
                        helperText={touched.gender && errors.gender}
                        value={values.gender}
                      >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                      </TextField>
                  </Grid>
                  
                  <Grid item md={2} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'birthPlace.provinceno') &&
                    getIn(errors, 'birthPlace.provinceno')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'birthPlace.provinceno') &&
                    getIn(errors, 'birthPlace.provinceno')
                    }
                    label="BirthPlace ProvinceNumber"
                    name="birthPlace.provinceno"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.birthPlace.provinceno}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'birthPlace.district') &&
                    getIn(errors, 'birthPlace.district')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'birthPlace.district') &&
                    getIn(errors, 'birthPlace.district')
                    }
                    label="BirthPlace District"
                    name="birthPlace.district"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.birthPlace.district}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'birthPlace.vdcMunicipality') &&
                    getIn(errors, 'birthPlace.vdcMunicipality')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'birthPlace.vdcMunicipality') &&
                    getIn(errors, 'birthPlace.vdcMunicipality')
                    }
                    label="BirthPlace VDC/Municipality"
                    name="birthPlace.vdcMunicipality"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.birthPlace.vdcMunicipality}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'birthPlace.wardno') &&
                    getIn(errors, 'birthPlace.wardno')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'birthPlace.wardno') &&
                    getIn(errors, 'birthPlace.wardno')
                    }
                    label="BirthPlace WardNumber"
                    name="birthPlace.wardno"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.birthPlace.wardno}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputVariant="outlined"
                        id="birth-date-picker"
                        label="Date of Birth"
                        fullWidth
                        name="birthDate"
                        onChange={(val) => {
                          console.log(val);
                          setFieldValue("birthDate", val);
                        }}
                        onBlur={handleBlur}
                        value={values.birthDate}
                        format="DD/MM/YYYY"
                        error={errors.birthDate && touched.birthDate}
                        helperText={errors.birthDate && touched.birthDate}
                        renderInput={
                          (params) => 
                          <TextField 
                            {...params}
                          />
                        }
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                    error={Boolean(touched.issuedDate && errors.issuedDate)}
                    fullWidth
                    required
                    helperText={touched.issuedDate && errors.issuedDate}
                    label="IssuedDate"
                    name="issuedDate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.issuedDate}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'fatherName.firstName') &&
                    getIn(errors, 'fatherName.firstName')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'fatherName.firstName') &&
                    getIn(errors, 'fatherName.firstName')
                    }
                    label="Father FirstName"
                    name="fatherName.firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.fatherName.firstName}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                    fullWidth
                    label="Father MiddleName"
                    name="fatherName.middleName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.fatherName.middleName}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'fatherName.lastName') &&
                    getIn(errors, 'fatherName.lastName')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'fatherName.lastName') &&
                    getIn(errors, 'fatherName.lastName')
                    }
                    label="Father LastName"
                    name="fatherName.lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.fatherName.lastName}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'motherName.firstName') &&
                    getIn(errors, 'motherName.firstName')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'motherName.firstName') &&
                    getIn(errors, 'motherName.firstName')
                    }
                    label="Mother FirstName"
                    name="motherName.firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.motherName.firstName}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                    fullWidth
                    label="Mother MiddleName"
                    name="motherName.middleName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.motherName.middleName}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'motherName.lastName') &&
                    getIn(errors, 'motherName.lastName')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'motherName.lastName') &&
                    getIn(errors, 'motherName.lastName')
                    }
                    label="Mother LastName"
                    name="motherName.lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.motherName.lastName}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>

                  <Grid item md={2} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'permanentAddress.provinceno') &&
                    getIn(errors, 'permanentAddress.provinceno')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'permanentAddress.provinceno') &&
                    getIn(errors, 'permanentAddress.provinceno')
                    }
                    label="Permanent Address"
                    name="permanentAddress.provinceno"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.permanentAddress.provinceno}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'permanentAddress.district') &&
                    getIn(errors, 'permanentAddress.district')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'permanentAddress.district') &&
                    getIn(errors, 'permanentAddress.district')
                    }
                    label="Permanent Address District"
                    name="permanentAddress.district"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.permanentAddress.district}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'permanentAddress.vdcMunicipality') &&
                    getIn(errors, 'permanentAddress.vdcMunicipality')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'permanentAddress.vdcMunicipality') &&
                    getIn(errors, 'permanentAddress.vdcMunicipality')
                    }
                    label="Permanent Address VDC/Municipality"
                    name="permanentAddress.vdcMunicipality"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.permanentAddress.vdcMunicipality}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'permanentAddress.wardno') &&
                    getIn(errors, 'permanentAddress.wardno')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'permanentAddress.wardno') &&
                    getIn(errors, 'permanentAddress.wardno')
                    }
                    label="Permanent Address WardNumber"
                    name="permanentAddress.wardno"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.permanentAddress.wardno}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>

                  <Grid item md={2} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'issuedPlace.provinceno') &&
                    getIn(errors, 'issuedPlace.provinceno')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'issuedPlace.provinceno') &&
                    getIn(errors, 'issuedPlace.provinceno')
                    }
                    label="Issued Place ProvinceNumber"
                    name="issuedPlace.provinceno"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.issuedPlace.provinceno}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'issuedPlace.district') &&
                    getIn(errors, 'issuedPlace.district')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'issuedPlace.district') &&
                    getIn(errors, 'issuedPlace.district')
                    }
                    label="Issued Place District"
                    name="issuedPlace.district"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.issuedPlace.district}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'issuedPlace.vdcMunicipality') &&
                    getIn(errors, 'issuedPlace.vdcMunicipality')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'issuedPlace.vdcMunicipality') &&
                    getIn(errors, 'issuedPlace.vdcMunicipality')
                    }
                    label="Issued VDC/Municipality"
                    name="issuedPlace.vdcMunicipality"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.issuedPlace.vdcMunicipality}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <TextField
                    error={Boolean(
                    getIn(touched, 'issuedPlace.wardno') &&
                    getIn(errors, 'issuedPlace.wardno')
                    )}
                    fullWidth
                    required
                    helperText={
                    getIn(touched, 'issuedPlace.wardno') &&
                    getIn(errors, 'issuedPlace.wardno')
                    }
                    label="Issued Place WardNumber"
                    name="issuedPlace.wardno"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.issuedPlace.wardno}
                    variant="outlined"
                    size="small"
                    />
                  </Grid>

                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                color="primary"
                disabled={Boolean(!isValid)}
                type="submit"
                variant="contained">
                Issue
                </Button>
              </CardActions>
            </form>
          )}
          </Formik>
        </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

AddAttributes.propTypes = {
  className: PropTypes.string
};

export default AddAttributes;