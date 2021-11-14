import React from 'react';
import PostsList from '../PostsList';

class Contact extends React.Component {
    
    render () {
        const postsLinks1 = [
            {
                postTitle: "Blog post #1 ",
                destination:"#"
            },
            {
                postTitle: "Blog post #2 ",
                destination:"#"
            },
            {
                postTitle: "Blog post #3 ",
                destination:"#"
            }
        ];
        const postsLinks2 = [
            {
                postTitle: "Blog post #3 ",
                destination:"#"
            },
            {
                postTitle: "Blog post #1 ",
                destination:"#"
            },
            {
                postTitle: "Blog post #2 ",
                destination:"#"
            }
        ];


        return (
            <div>
                <h1>Contact us</h1>
                <div className="container">
                    <div className="contact-form">
                        <form action="">
                            

                        </form>
                    </div>
                    <div className="sidebar">
                        <PostsList title="Latest" postsLinks={postsLinks1}/>
                        <PostsList title="Popular" postsLinks={postsLinks2}/>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Contact;