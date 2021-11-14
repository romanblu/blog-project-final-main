import React from 'react';
import "./Profile.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class Profile extends React.Component {

    createInitials = () => {
        var firstname = this.props.firstName;
        var lastname = this.props.lastName
        var initials = firstname.charAt(0)+""+lastname.charAt(0);
        return initials;
    }

    render() {
        return (
            <header>
                <div className="profile">
                    <div className="border"></div>
                    <div className="profile-image">
                        <div className="name">{this.createInitials}</div>
                    </div>
                    <br></br>
                    <div className="hey">{"Hey " + this.props.username + " :)"}</div>
                    <br></br>
                    <br></br>
                    <div className="details">{"First Name: " + this.props.firstName}</div>
                    <br></br>
                    <div className="details">{"Last Name: " + this.props.lastName}</div>
                </div>
            </header>
        );
    }
}
export default Profile;