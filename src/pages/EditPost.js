import React, { Component } from 'react'
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import { Editor } from "@tinymce/tinymce-react";
import {Button, TextField, Box, Container, Typography} from '@material-ui/core';


const styles = theme => ({
    
        
});



class EditPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:"",
            postContent:"",
            image:"",
            postId: this.props.match.params.postId
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount(){
        const url = `/api/posts/${this.props.match.params.postId}`;
        axios.get(url).then((res) => {
            console.log("Post data ",res);
            this.setState({
                title: res.data.title,
                postContent: res.data.content,
                image: res.data.image
            })
        }).catch(err => console.log("Could not retrieve post. Error: ", err));
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});

    }

    handleContentChange(event) {
        this.setState({content: event.target.value});

    }

    handleImageUrlChange(event){
        this.setState({image: event.target.value});
    }

    onChange(e){
        console.log(e.target.getContent())
        this.setState({
            postContent:e.target.getContent()
        })
    }

    handleSubmit(){
       
        const url = `/api/posts/${this.props.match.params.postId}`;    
        const data = {
            title:this.state.title,
            content: this.state.postContent,
            image: this.state.image,
            };
        axios.put(url, data).then(res => console.log("SUCCESS ",res)).catch(err => console.log("error", err));
    }
    


    render() {

        const toolbar = "fontselect fontsizeselect formatselect | " +
        "bold italic underline strikethrough subscript superscript | " +
        "blockquote removeformat | forecolor backcolor | " +
        "alignleft aligncenter alignright alignjustify | " +
        "indent outdent | numlist bullist | " +
        "link unlink | hr table image | fullscreen code | undo redo";

        return (
            <div>

                <Typography component="h3" variant="h3" align="center" color="primary">
                    Edit post
                </Typography>

                <TextField onChange={this.handleImageUrlChange} label="Image" variant="outlined" required fullWidth margin="normal" 
                    id="standard-error-helper-text"  helperText="Please enter an image" value={this.state.image}
                    error={this.state.error}
                />
                <TextField onChange={this.handleTitleChange} label="Title" variant="outlined" required fullWidth margin="normal"
                    id="standard-error-helper-text"  helperText="Please enter a title" value={this.state.title}
                    error={this.state.error}
                />
                <Editor
                    init={{
                        plugins: 'link image code',
                        toolbar
                    }}
                    initialValue={this.state.postContent}
                    onChange={this.onChange}
                />

                
                <Button onClick={this.handleSubmit} color="primary" variant="outlined">
                    Submit Edit
                </Button>

                {/* <div className="container">
                    <div className="new-post">
                        <h1>New Post</h1>
                        <label htmlFor="post-title">Title: </label>
                        <input type="text" id="post-title" value={this.state.title} onChange={this.handleTitleChange}/>
                        <label htmlFor="post-content">Write Post Content:</label>
                        <textarea name="content" id="new-post-content" cols="30" rows="10" className="new-post-content" 
                        value={this.state.content} onChange={this.handleContentChange}></textarea>
                        <p className="characters-left smaller-font">256 characters left</p>
                        <label htmlFor="post-image">Enter image url: </label>
                        <input type="text" id="post-image" value={this.state.image} onChange={this.handleImageUrlChange}/>
                        <button type="submit" value="Send Post" className="submit-post" onClick={this.handleSubmit}>Send Post</button>
                    </div>
                    
                </div> */}
            </div>
        )
    }
}

export default withStyles(styles)(EditPost);
