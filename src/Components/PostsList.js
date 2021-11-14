import React from 'react';

class PostsList extends React.Component {
    render () {

        const postsLinks = this.props.postsLinks.map((link,index) => (
            <li key={index} className="posts-list-item">{link.postTitle} <a href={link.destination}>go to page</a></li>
        ));

        return (
            <div className="posts-list">
                <h1>{this.props.title}</h1>
                <ul>
                    {postsLinks}
                </ul>
            </div>
        );
    }
}

export default PostsList;