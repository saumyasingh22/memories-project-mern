import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';//we have to fetch data from global redux store so to do that we use hook named useSelectors

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';// we have to got to action to post but actions are using api so api first

//GET the current id for the post we are on(we have a three dot icon(Post.js) , onclick of the button we have to pass id of that post to our form component)

const Form = ({ currentId, setCurrentId }) =>{// accepting as props from app.js
    const [postData, setPostData] = useState({creator:'', title:'', message:'', tags:'', selectedFile:''}); //all the properties(or text fields) that object is going to start with(eveything post will have)
    const post = useSelector((state) => currentId? state.posts.find((p) => p._id === currentId) : null);//we have a callback func inside useSelector hook that has parameter state(whole global redux store) and we can return state.posts(we named combinereducer() as "posts" in index.js) if we have currentid then we will find post(p) for that id since we only need a single post, to get all the information we had filled for each fields so that we can update in that only
    const classes = useStyles();  //so that we can use styling from styles.js as classes.style
    const dispatch = useDispatch();

    useEffect(()=>{//to populate the values of form while updating
        if(post) setPostData(post); //if post exists then populate it with data of post
    },[post])//it accepts two parameters first is callback function and second is dependency array(it is when should callback function run??? when dependecy array changes, here the post value changes from nothing to actual post then want to run callback func) 

    const handleSubmit=(e)=>{
        e.preventDefault(); //to not get refresh in browser every time we click the button
        
        if(currentId){ // if currentid in=s not null then we will update post instead of creating one
            dispatch(updatePost(currentId, postData)); // it will have to parameters the id of the post and the postData(data we filled in form)
        }else{
            dispatch(createPost(postData)); // we will dispatch all data in our state postData, now we go to reducers posts.js to make changes in CREATE
        }
        clear(); // to clear form after submiting or editing
    }
    
    const clear=()=>{
        setCurrentId(null);//set id null
        setPostData({creator:'', title:'', message:'', tags:'', selectedFile:''});// setting all fields with empty string(clearing form after clicking clear button)
    }

    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth 
                    value={postData.creator} //value is going to be stored in a state called postData.creator i.e. our whole data is going to be stored in the postData object in the state and then each object key is going to be specific text field(creator)
                    onChange={(e)=> setPostData({...postData, creator: e.target.value})} //how are we going to change the value of that state using onchange since we have whole object in state and we only have update one of its properties that is creator????? look at bottom
                />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, title: e.target.value})} />
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e)=> setPostData({...postData, message: e.target.value})} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData, tags: e.target.value.split(',')})} />{/* to slit the tags in many hashtags by comma */}
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64})=> setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;

/* 
    we can write:
    onchange={(e)=> setPostData({creator: e.target.value})} but, 
    later on if we add second text field then we will always override 
    everything and simply have the creator we wouldn't have any other field
    because we are specifying them in the object right now to fix that 
    we need to spread postData(object) (...postData) that means if in 
    every text field if we do the same thing but only change the last property
    that means all the data is going to persist while changing only the 
    specific property of that specific text field 
    so we write:
    onchange={(e)=> setPostData({...postData, creator: e.target.value})}
*/