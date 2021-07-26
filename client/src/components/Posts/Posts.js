import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';//we have to fetch data from global redux store so to do that we use hook named useSelectors

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) =>{ // accepting as props from app.js
    const posts = useSelector((state) => state.posts);//we have a callback func inside useSelector hook that has parameter state(whole global redux store) and we can return state.posts(we named combinereducer() as "posts" in index.js)
    const classes = useStyles();  //so that we can use styling from styles.js as classes.style

    console.log(posts);

    return(
        !posts.length? <CircularProgress /> :( /// show circular wait icon if posts are not present else it will give post
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post)=>( // we are sending post as prop to post.js using <Post/> component, so that we can send individual value of a post to each post component
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} /> {/* sending setcurrentid one level deeper to prop.js (propdrilling) this is the problem that redux solves*/}
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;