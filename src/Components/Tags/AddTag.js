import React from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        width: "100%",
        // backgroundColor: theme.palette.background.paper
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    button: {
        margin: theme.spacing(0, 0, 2),
        justifyContent: "space-between"
    },

    text: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        minWidth: 600
    }
});

class AddTag extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postId: undefined,
            label: undefined,
        };
    }

    onContentChange = (e) => {
        this.setState({
            label: e.target.value,
        })
    };

    onSubmit = (e) => {
        e.preventDefault();

        let id = this.props.id;

        const data = {
            postId: id,
            label: this.state.label //change to current user
        };

        axios.post(`/posts/${id}/tags`, data).then(res => {
            const tag = res.data;
            this.props.addTag(data);

            this.setState({
                postId: '',
                label: ''
            });

            console.log(tag);
        });
    };

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {/*<form className={classes.root} noValidate autoComplete="off" >*/}
                    <Grid ixs={12} sm={6}>
                        <TextField className={classes.text}
                                   id="standard-basic"
                                   label="Add new tag"
                                   onChange={this.onContentChange}
                                   value={this.state.label}
                        />
                    </Grid>
                    <Grid container justify="flex-end" style={{marginTop: '10px', marginBottom: '10px'}}>
                    <Button  onClick={this.onSubmit} >
                        Submit tag
                    </Button>
                    </Grid>
                {/*</form>*/}
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AddTag);