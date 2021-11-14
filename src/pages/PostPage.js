import React from 'react';
import PostsList from '../Components/PostsList';
import Post from '../Components/Post';
import axios from 'axios';
import {Button, TextField, Box, Container, Typography} from '@material-ui/core';
import { mergeClasses, withStyles } from '@material-ui/styles';
import TagsArray from '../Components/Tags/TagsArray';

// import '../App.module.css';


const styles = theme => ({
    root: {
        // backgroundColor: '#fff'
    },
    container:{
        backgroundColor: '#fff',
        paddingTop:75,
        maxWidth: 800,
        margin: 'auto',
    },
    image:{
        marginTop:35,
        marginBottom:50,
        width:'100%'
    },
    content:{
        paddingLeft:30,
        paddingRight:30,
        paddingBottom:50
    },
    title:{
        marginLeft:25,
        marginRight:25
    },
    author:{
        marginTop: 25,
        marginLeft:25
    }
});

class PostPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            user: {
                name: "",
                username:"",
                password:""
            },
            id: this.props.id,
            title: this.props.title,
            content: this.props.description,
            date: this.props.datePosted,
            authorName: this.props.username,
            authorId: this.props.authorId,
            image: this.props.imageSrc

        };
    }
    
    
   
    
    getAuthorNameById = (id) => {
        const url = "/api/users/"+id;
        axios.get(url).then((res) => {
            
            this.setState({
                authorName: res.data.username
            });
        });
    }

    getPostById = (id) => {
        const url = "/api/posts/" + id;
        axios.get(url).then((res) => {
            this.setState({
                data:res.data,
                id: id,
                title: res.data.title,
                content: res.data.content,
                authorId: res.data.author_id,
                image: res.data.image,
                authorName: res.data.author_name
            });

          
        });
    }

    

      
    componentDidMount (){
        const {id} = this.props.match.params;

        this.getPostById(id);
    }

    render () {
        
        const { classes } = this.props;
        console.log(this.state)
        
        return (
            
            <div className={classes.root}>
                <div className={classes.container}>
                        
                    <Typography className={classes.title} component="h3" variant="h4" align="center" >
                        {this.state.title}
                    </Typography>
                    
                    {this.state.tags ? ((this.state.tags.length > 0) &&
                    <TagsArray tags={this.state.tags} postId={this.statenewPostId} handleDelete={this.handleDelete}/>) : null}
                    
                    <Typography className={classes.author} component="p" variant="h6" align="left" >
                        writen by {this.state.authorName}
                    </Typography>
                    <img className={classes.image} src={this.state.image}/>

                    <div className={classes.content} dangerouslySetInnerHTML={{__html:this.state.content}}>

                    </div>
                
                </div> 
            </div>
        );
    }
}

export default withStyles(styles)(PostPage);