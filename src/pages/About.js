import React from 'react';
import PostsList from '../Components/PostsList';

class About extends React.Component {

    
    render() {
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

        return(
            <div>
                 <h1>About my blog</h1>
                <div className="container">
                   <div className="about-content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati dolores porro itaque totam, autem ipsam consectetur asperiores placeat alias vitae doloribus sapiente nulla esse! Sapiente error deserunt doloremque saepe non optio praesentium magnam blanditiis ut numquam. A labore tempore delectus, sed doloribus officiis error dignissimos sint suscipit temporibus assumenda optio explicabo velit ducimus architecto. Quia doloremque similique soluta harum iste dolorum impedit assumenda mollitia quibusdam ullam tenetur perspiciatis odio, ab ducimus omnis porro commodi, nihil ipsa aliquam nemo maxime non. Vel dicta voluptatibus consectetur similique distinctio consequatur, quaerat asperiores, hic cupiditate quam, excepturi provident libero dolore enim ipsum temporibus dolor!</p>
                        
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

export default About;