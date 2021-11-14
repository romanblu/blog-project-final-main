import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {Grid, Button, TextField, Box, Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton, ListItemText} from '@material-ui/core';
import axios from 'axios';
import { Redirect } from "react-router";
import AddTag from "../Components/Tags/AddTag";
import TagsArray from "../Components/Tags/TagsArray";



class AddPost extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            postContent:'',
            error: false,
            image:'',
            tags: [],
            newTag:'',
            title:'',
            redirect:false,
            newPostId: null
        }
    }

    onChange(e){
        console.log(e.target.getContent())
        this.setState({
            postContent:e.target.getContent()
        })
    }

    changeTag = (e) => {
        this.setState({
            newTag: e.target.value
        })
    }

    changeImage = (e) => {
        this.setState({
            image: e.target.value
        })
    }
   
    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    addTag = () => {
        this.setState({
            tags: [...this.state.tags, this.state.newTag]
        });

        console.log('AddTag invoked  ', this.state.tags);
    };

    handleDelete = (tagToDelete) => () => {
        this.setState({chips: (tags) => tags.filter((chip) => chip.key !== tagToDelete.key)});

        const {label} = tagToDelete;
        let id = this.state.newPostId;
        console.log(id);
        axios.post(`/posts/${id}/tags/${label}`).then(res => {
            this.setState({tags: this.state.tags.filter((tag) => tag.label !== tagToDelete.label)});
        });
        console.log('handle detele');
    };

    onSubmit = (e) => {
        console.log('POST ADDED');
        const url = '/api/posts';
        const data = {
            title:this.state.title,
            content: this.state.postContent,
            image: this.state.image,
            author_id: this.props.user.userId,
            author_name: this.props.user.username,
            tags: this.state.tags
        };
        axios.post(url, data).then(res => {
            this.setState({redirect:true, newPostId:res.data.id})
        });
    }

    handleRedirect = () => {
        if(this.state.redirect){
            return <Redirect to={`post/${this.state.newPostId}`}/>
        }
    }

    tagsView = () => {
        return (
            <div>
               

            </div>
        )
    }

    render(){
        const toolbar = "fontselect fontsizeselect formatselect | " +
        "bold italic underline strikethrough subscript superscript | " +
        "blockquote removeformat | forecolor backcolor | " +
        "alignleft aligncenter alignright alignjustify | " +
        "indent outdent | numlist bullist | " +
        "link unlink | hr table image | fullscreen code | undo redo";
    
        

        return (
            
            <div>
                <AddTag id={this.state.newPostId} addTag={this.addTag} setTag={this.getTags}/>
                
                <Typography component="h3" variant="h3" align="center" color="primary">
                    Add A New Post
                </Typography>

                <TextField onChange={this.changeImage} label="Image" variant="outlined" required fullWidth margin="normal"
                    id="standard-error-helper-text"  helperText="Please enter an image"
                    error={this.state.error}
                />
                <TextField onChange={this.changeTag} label="tag" variant="outlined" required fullWidth margin="normal"
                    id="standard-error-helper-text"  helperText="Enter a tag"
                    error={this.state.error}
                />
                {this.state.tags ? ((this.state.tags.length > 0) &&
                <TagsArray tags={this.state.tags} postId={this.statenewPostId} handleDelete={this.handleDelete}/>) : null}
                 <Button onClick={this.addTag} color="primary" variant="outlined">
                    Add Tag
                </Button>
                {this.tagsView()}
                <TextField onChange={this.changeTitle} label="Title" variant="outlined" required fullWidth margin="normal"
                    id="standard-error-helper-text"  helperText="Please enter a title"
                    error={this.state.error}
                />
                <Editor
                    init={{
                        plugins: 'link image code',
                        toolbar
                    }}
                    onChange={this.onChange}
                />

                
                <Button onClick={this.onSubmit} color="primary" variant="outlined">
                    Add Post
                </Button>

                {this.handleRedirect()}
            </div>
            
        )
    }

}

export default AddPost;