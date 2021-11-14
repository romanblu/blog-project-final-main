import React from 'react';
import axios from 'axios';
import { EditorState, convertToRaw, ConvertFromRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withStyles } from '@material-ui/styles';
import draftToHtml from 'draftjs-to-html';
import { convertToHTML} from 'draft-convert';
import Divider from '@material-ui/core/Divider';
import TagsArray from '../Components/Tags/TagsArray';
import AddTag from '../Components/Tags/AddTag';


const styles = theme => ({
    root:{
        width:'50%',
        marginLeft: 'auto',
        marginRight:'auto',
        innerHeight: 500,
    },
    editor:{
        
    }
})

class NewPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            content:'',
            image:'',
            tags: [],
            editorState: EditorState.createEmpty(),
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
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
    
    onEditorStateChange(editorState){
        this.setState({
          editorState,
        });
      };

    handleSubmit(){
        // send new post to server
        const url = '/api/posts';
        const data = {
            title:this.state.title,
            tags:this.state.tags,
            content: this.state.content,
            image: this.state.image,
            author_id: this.props.user.userId
        };
        
        axios.post(url, data).then(res => {
            console.log("NEW POST ADDED");
        });
        
    }

    addTag = (tag) => {
        this.setState({
            tags: [...this.state.tags, tag]
        });

        console.log('AddTag invoked');
    };

    handleDelete = (tagToDelete) => () => {
        this.setState({chips: (tags) => tags.filter((chip) => chip.key !== tagToDelete.key)});

        const {label} = tagToDelete;
        let id = this.state.postId;
        console.log(id);
        axios.post(`/posts/${id}/tags/${label}`).then(res => {
            this.setState({tags: this.state.tags.filter((tag) => tag.label !== tagToDelete.label)});
        });
        console.log('handle detele');
    };


    render  (){
        const { editorState } = this.state;
        const {classes} = this.props;
        const postId = 1;
        return (
            
            <div>
                <div className={classes.root}>
                    <AddTag id={postId} addTag={this.addTag} setTag={this.getTags}/>
                    <Divider/>
                    {this.state.tags ? ((this.state.tags.length > 0) &&
                    <TagsArray tags={this.state.tags} postId={postId} handleDelete={this.handleDelete}/>) : null}
                    <Divider/>
                    <div className={classes.editor}>
                        <Editor 
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                            toolbar={{
                                image:{defaultSize:{width:100}}
                            }}
                        />
                    </div>
               
                    <textarea
                        disabled
                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    />
                    
                    <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} />
                    <div dangerouslySetInnerHTML={{ __html: convertToHTML(editorState.getCurrentContent()) }} />

                    <Editor 
                        editorState={EditorState.createWithContent(ConvertFromRaw(editorState))}
                        readOnly={true}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(NewPost);