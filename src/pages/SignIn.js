import React from 'react';
import axios from 'axios';
import {Button, TextField, Box, Container, Typography} from '@material-ui/core';
import { Redirect } from "react-router";

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            resp: null,
            user:null,
            password:null,
            error: false,
            redirect:false
        };
    }


    changeUsername = (e) => {
        this.setState({
            user: e.target.value
        })
    }

    changePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    login = (e) => {
        e.preventDefault();
        const url = "/api/login";
        const data = {
            user : this.state.user,
            password: this.state.password
        }

        axios.post(url,data).then(res => {
            this.setState({
                data: [],
                resp: "Success, user logged in ",
                error: false,
                redirect:true
            });
            this.props.onSignIn(data);

        }).catch(err => {
            this.setState({
                data: [],
                resp: "Error, could not login user",
                error: true
            });
        });
    }

    handleRedirect = () => {
        if(this.state.redirect){
            return <Redirect to='/'/>
        }
    }

    render () {
        return (
            <>
                <Container maxWidth="sm">
                    <Box mt={"20vh"} alignContent="center">
                        
                        <Typography component="h1" variant="h2" align="center">
                            Login
                        </Typography>
                        <form action="">
                            <TextField onChange={this.changeUsername} label="Username" variant="outlined" required fullWidth margin="normal"
                            id="standard-error-helper-text"  helperText="Wrong username or password"
                            error={this.state.error}
                            />
                            <TextField onChange={this.changePassword} label="Password" type="password" variant="outlined" required fullWidth margin="normal"
                            id="standard-error-helper-text"  helperText="Wrong username or password"
                            error={this.state.error}
                            />
                            <Box mt={2} mb={2}>
                                <Button onClick={this.login} variant="contained" color="primary" fullWidth type="submit" margin="normal">Login</Button>
                            </Box>
                            <Box textAlign="center">
                                <Button href="/signin" color="primary">Forgot Username/Password
                                </Button>
                                <Button href="/signup" color="secondary">No account? Sign up!
                                </Button>
                            </Box>    
                        </form>
                       
               
                    </Box>
                    
                </Container>
                {this.handleRedirect()}               
            </>
        );
    }
}

export default SignIn;