import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import Link from  '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root:{
        fontFamily:'sans-serif',
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:'center',
        gap:20,
        color:'rgb(38,38,38)',
        height:75,
        alignItems:'center',

        backgroundColor:'#fff',
        paddingLeft:'10%',
        paddingRight:'10%',
    },
    navLink:{
        fontSize: 18,
        marginRight: 20,
        textDecoration: 'none',
        '&:hover':{
            textDecorationThickness: 3
        },
        color:'rgb(38,38,38)',

    },
    active:{
        '&:hover':{
            textDecorationThickness: 3
        },
        fontSize: 22,

        color:'rgb(38,38,38)',
        fontWeight: 600
    },
    leftLinks:{
        display: "flex",
        flexDirection:"row",
        justifyContent:"start",
        justifyItems:"center",
        gap:20,
    },
    rightLinks:{
        display: "flex",
        flexDirection: "row",
        justifyContent:"end",
        gap:20
    }
}))

export default function Navbar(props) {
    const [user, setUser] = useState('');

    const classes = useStyles();
    
    const onLogout = () => {
        props.setLogout();
    }

    return (

        
        <div className={classes.root}>
                <div className={classes.leftLinks}>
                    <Link to='/home' component={RouterLink} className={classes.navLink}>Home</Link>
                    <Link to='/about' component={RouterLink} className={classes.navLink}>About Us</Link>
                    <Link to='/contact' component={RouterLink} className={classes.navLink}>Contact</Link>
                    <Link to='/new-post' component={RouterLink} className={classes.navLink}>Add new post</Link>
                </div>
                <div className={classes.rightLinks}>
                    {
                        props.user ? <Link to='/profile' component={RouterLink} className={classes.navLink}>Hello, {props.user.username}</Link> 
                        : ''
                    }
                    
                    
                    {
                        props.user ? <Typography onClick={onLogout} component={RouterLink} className={classes.navLink}>Logout</Typography>
                        :
                        <Link to='/signin' component={RouterLink} className={classes.navLink}>Login</Link>               
                    }
                </div>
        </div>
    )
}
