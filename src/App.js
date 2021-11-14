// import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import MainPage from './pages/MainPage';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PostPage from './pages/PostPage';
import NewPost from './pages/NewPost';
import Logout from './pages/Logout';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import AddPost from './pages/AddPost';

import axios from 'axios';
import Navbar from './Components/Navbar';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import styles from './App.module.css';

const theme = createTheme({
    backgroundColor:'#eff4f2'
})

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      userLoggedIn: false, 
      user: null,  
    };
  }


  componentDidMount(){
    
    if(this.state.user == null){

        this.getUserData();
    }
    
  }

 

  setLogin = (user) => {
    const url = "/api/user";
    axios.get(url).then(res => {
        localStorage.setItem('username', user.user);
        localStorage.setItem('userId', res.data.user_id);
        this.setState({
          userLoggedIn:true,
          user: {username: user.user, userId: res.data.user_id},
        });
    });
    
  }

  editPost = (id) => {
  }


  setLogout = () => {
    const url = "/api/logout"
    const data = { }
    axios.post(url, data).then(res => {
      console.log("Logged out successfully");
      this.setState({
        userLoggedIn:false,
        user: null
      });  
    })

  }

  getUserData(){
    const url = "/api/user";
    axios.get(url).then(res => {
      const user_id = res.data.user_id;
      axios.get('/api/users/' + user_id).then(res => {
        this.setState({
          user : {username: res.data.username, userId: res.data.id},
          userLoggedIn: true
        });
        
      });
  }).catch(() => console.log("No user logged in"));
  }

  

  render(){
    return (
    <ThemeProvider theme={theme} >

    <div className="App">
          <Router>
            <Navbar user={this.state.user} setLogout={this.setLogout}/>
            <div className={styles.container} >

            
              <Switch>
                
                <Route path="/about">
                  <About />
                </Route>
                
                <Route path="/signin">
                  <SignIn onSignIn={this.setLogin} onLogout={this.setLogout} />
                  {/* {this.state.user != null ? <Redirect to="/" /> : "" } */}
                </Route>
                <Route path="/signup">
                  <SignUp onSignIn={this.setLogin}/>
                  {/* {this.state.user != null ? <Redirect to="/" /> : "" } */}
                </Route>
                <Route path="/logout">  
                  <Logout user={this.state.user}/>
                </Route>
                <Route path="/post/:id" component={PostPage}>
                </Route>
                <Route path="/profile" component={Profile}>
                </Route>
                <Route path="/new-post">
                  <AddPost user={this.state.user} />
                </Route>
                <Route path="/edit-post/:postId" component={EditPost} />
                <Route path="/">
                  <MainPage loggedUser={this.state.user || undefined} editPost={this.editPost}
                  deletePost={this.deletePost} />
                </Route>
              </Switch>
            </div>     

          </Router> 
      </div>
      </ThemeProvider>

    );
  }
  
}

export default  App;
