import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import axios from "axios";
import { Redirect } from 'react-router-dom';
const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
});

class TagsArray extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: this.props.tags,
            currentTag: null,
            isClicked: false
        };
    }



    onClick = (tag) => () => {
        console.log(tag);
        this.setState({
            currentTag: tag,
            isClicked: true
        })
    };



    render() {
        const {classes} = this.props;
        if(this.state.isClicked){
            return (<Redirect to={`/search/tag/${this.state.currentTag.tag_name}`}/>);
        }


        return (
            <Paper component="ul" className={classes.root}>
                {console.log("TAGS ",this.props.tags)}
                {this.props.tags && this.props.tags.map((tag) => {
                   
                  
                {console.log("TAG NAME ",tag)}
                    return (
                        
                        <li >
                            <Chip
                                color='primary'
                                // icon={icon}
                                label={tag}
                                //clickable={true}
                                onClick={this.onClick(tag)}
                                className={classes.chip}
                            />
                        </li>
                    );
                })}
            </Paper>
        );
    }
}

export default withStyles(styles, {withTheme: true})(TagsArray);