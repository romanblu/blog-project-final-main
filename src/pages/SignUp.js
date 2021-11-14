import React from 'react';
import axios from 'axios';
import {Button, TextField, Box, Container, Typography} from '@material-ui/core';

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            resp: null,
            user:null,
            password:null,
            name:null
        };
    }

    changeUsername = (e) => {
        this.setState({
            user: e.target.value
        })
    }

    changeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    changePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    signup = (e) => {
        e.preventDefault();
        const url = "/api/signup";
        const data = {
            name: this.state.name,
            user : this.state.user,
            password: this.state.password,
        }

        axios.post(url,data).then(res => {
            this.setState({
                data: [],
                resp: "Success, user signed up"
            });

            this.props.onSignIn({user: data.user, password:data.password});

        }).catch(err => {
            this.setState({
                data: [],
                resp: "Error, could not sign up user"
            });
        });
    }

    render () {
        return (
            <>
                <Container maxWidth="sm">
                    <Box mt={"20vh"} alignContent="center">                        
                        <Typography component="h1" variant="h2" align="center">
                            Sign Up
                        </Typography>
                        <form action="">
                            <TextField onChange={this.changeName} label="Name" variant="outlined" required fullWidth margin="normal"/>
                            <TextField onChange={this.changeUsername} label="Username" variant="outlined" required fullWidth margin="normal"/>
                            <TextField onChange={this.changePassword} label="Password" type="password" variant="outlined" required fullWidth margin="normal"/>
                            <TextField onChange={this.changeRepeatPassword} label="Repeat Password" type="password" variant="outlined" required fullWidth margin="normal"/>
                            <Box mt={2} mb={2}>
                                <Button onClick={this.signup} variant="contained" color="primary" fullWidth type="submit" margin="normal">Sign Up!</Button>
                            </Box>
                            
                        </form>
                        

                    </Box>
                    
                </Container>
               
            </>
        );
    }
}

export default SignIn;