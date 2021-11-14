import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import PostComments from './PostComments';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import  { Redirect } from 'react-router-dom'
import {Button} from '@material-ui/core';
import TagsArray from './Tags/TagsArray';
import AddTag from './Tags/AddTag';


const styles = theme => ({
    root: {
        minWidth: 375,
        margin: 'auto',
        height: '100%' // different height contents will have the same height
    },
    media:{
        height:300,
        width:'100%',
        cursor: 'pointer'
    },
    title:{
        cursor:'pointer'
    },
    author:{
        marginLeft:15
    }
});


class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            index: this.props.index,
            title: this.props.title,
            description: this.props.description,
            date: this.props.datePosted,
            authorName: this.props.authorName,
            authorId: this.props.authorId,
            image: this.props.imageSrc,
            tags: this.props.tags,
            loggedUser : this.props.currentUser, // issue - not rerendering when app gets current user 
            isAuthor: false,
            hasUpdated: false,
            redirect:false
        }
    } 


    componentDidMount(){
        if(!this.props.currentUser){
            this.setState({isAuthor:false});
        }else{
            
            if(this.props.currentUser.userId === this.state.authorId){
                this.setState({isAuthor:true});
            }
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.currentUser !== this.props.currentUser){
            if(!this.props.currentUser){
                this.setState({isAuthor:false});
            }else{
                if(this.props.currentUser.userId === this.state.authorId){
                    this.setState({isAuthor:true});
                }
            }
        }
    }

    handlePostDelete = () => {
        const id = this.state.id;
        const url = `api/posts/${id}`;
        
        axios.delete(url).then(res => {
          console.log("Posts deleted")
          this.props.deletePost(id);
        }).catch((err) => console.log("Could not delete post. Error: ", err))       
        
        this.props.hasUpdated();
    }

    redirectToPost = () => {
        this.setState({
            redirect:true
        })
    }

    renderRedirect = () => {
        if(this.state.redirect){
            return <Redirect to={`post/${this.state.id}`} />;
        }
    }

    handlePostEdit = () => {
        this.props.editPost(this.state.id);
        
    }
    
    editDeleteButtons = () => {
        
        return (
            this.state.isAuthor ? 
            <div className="edit-delete">
                <Button onClick={this.handlePostDelete} className="delete-post">Delete</Button> 
                <Button onClick={this.handlePostEdit} className="edit-post">
                    <Link to={{pathname:`/edit-post/${this.state.id}`,
                                state:{title:this.state.title,
                                        content:this.state.content,
                                        image:this.state.image}
                                }
                            }>
                        Edit
                    </Link>
                    
                </Button>
            </div> : ''
        )
    } 

     

    render() {
        const { classes } = this.props;
        
        return (
                
                <Card className={classes.root}>
                        <CardMedia onClick={this.redirectToPost}
                            className={classes.media}
                            image={this.props.image}
                            title={this.props.title}
                        />
                        <TagsArray tags={["asd", "asdasda", "zxczxc"]} postId={this.props.id}/>
                        {this.editDeleteButtons()}
                        <Typography className={classes.author} component="p" variant="h6" align="left" >
                            writen by {this.state.authorName}
                        </Typography>
                        <CardContent>
                            <Typography variant="body2" style={{marginBottom:10}} color="textSecondary" component="p">
                                {this.props.date}
                            </Typography>
                            <Typography onClick={this.redirectToPost.bind(this)} className={classes.title} gutterBottom variant="h5" style={{marginBottom:15}} component="h2">
                                {this.props.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.description}
                            </Typography>
                        </CardContent>
                        {this.renderRedirect()}

                </Card>
            );
    }

}

export default withStyles(styles)(Post);