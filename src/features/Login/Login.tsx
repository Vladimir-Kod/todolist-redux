import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {loginTC} from "./Login-auth-reducer";
import {Navigate, Route} from "react-router-dom";
import Paper from '@mui/material/Paper';


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const validate = (values: any) => {
    const errors: FormikErrorType = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 4 ) {
        errors.password ='Password is so short'
    }
    return errors
}


export const Login = () => {

    const isLoggedIN = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()

            // formik.resetForm(  {values: {password: 'Custom initial values', email:'', rememberMe: true}})
        },
    })

    if (isLoggedIN) {
        return <Navigate to={'/'}/>
    }


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <Paper elevation={12}
                   style={{padding: '15px',borderRadius: "15px", border: "4px solid", borderColor: "coral",margin: "50px"}}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            // onChange={formik.handleChange}
                            // name="email"
                            // onBlur={formik.handleBlur}
                            {...formik.getFieldProps ('email' )}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{color: "red"}}>{formik.errors.email}</div>}

                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            // onChange={formik.handleChange}
                            // name="password"
                            // onBlur={formik.handleBlur}
                            {...formik.getFieldProps ('password' )}
                        />
                        {formik.touched.password && formik.errors.password && <div style={{color: "red"}}>{formik.errors.password}</div>}

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                checked={formik.values.rememberMe}
                                {...formik.getFieldProps ('rememberMe' )}
                            />}/>

                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
            </Paper>
        </Grid>
    </Grid>
}