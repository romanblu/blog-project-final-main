import React from 'react';
import Post from '../Components/Post';
import PostsList from '../Components/PostsList';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 50,        
    },
    pageTitle:{
        marginBottom:75
    }
    
});

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = { data: [] , hasUpdated:false };
    }

    // trigger rerendering when some post changed
    componentDidUpdate(prevProps){
        if(this.state.hasUpdated === true){
            this.getAllPosts();
            this.setState({hasUpdated:false})
        }
    }

    updatePosts = () => {
        this.setState({hasUpdated:true})
    }

    getUserById =async (id) => {
        const url  = "/api/users/" + id;
        axios.get(url).then((res) => {
            return res.data;
        });
    }

    getAuthorNameById = () => {
        return new Promise( resolve => {
            // setTimeout(() => { resolve("ROMEOOOO")}, 2000);
        }
        )
    }
    
    getAllPosts = () => {
        const url = "/api/posts";
        axios.get(url).then((res) => {
            
          console.log(res.data);
          this.setState({
            data:res.data,
            resp:null
          });
        });
      }
    
      describeContent = (htmlText) => {
            
            let description = htmlText.replace(/<\/?[^>]+(>|$)/g, "")
            if(description.length > 250) {
                description = description.substring(0, 250) + '...';
            }
            return description;
      }
    
      componentDidMount(){
        this.getAllPosts();
      }

      handlePostDelete = (id) => {
            const newData = this.state.data.filter(post  => {
                return post.id !== id;
            })
            console.log(newData)
            this.setState({data: newData});
      }


    render() {
        this.getAuthorNameById().then(res => console.log(res));
        
        const postItems = this.state.data.map(post => (
            <Grid item xs={4}>
                <Post key={post.id} 
                    title={post.title} 
                    description={this.describeContent(post.content)}
                    date={post.date} 
                    image={post.image} 
                    authorName={ post.author_name }
                    authorId={post.author_id}
                    imageSrc={post.image}
                    id={post.id} 
                    name={post.author_name} 
                    currentUser={this.props.loggedUser}
                    deletePost={this.handlePostDelete}
                    editPost={this.props.editPost}
                    hasUpdated={this.updatePosts}/>
            </Grid>
        ));
        
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography className={classes.pageTitle} gutterBottom variant="h2" align="center">This is my blog</Typography>
                <Grid container spacing={3}>
                    {postItems}

                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(MainPage);