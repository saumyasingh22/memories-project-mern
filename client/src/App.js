import React, {useState, useEffect} from 'react';  // useEffect will be componentDidMount but later it will become componentWillUpdate
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux'; // hook that allows us to dispatch an action 

import { getPosts } from './actions/posts'; // action for useEffect to be dispatched
import memories from './images/memories.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';

const App=()=>{
    const [currentId, setCurrentId] = useState(null);//we have to keep track of the current id, since we to share the state of curr id between the posts and form and app.js is the only parent component
    const classes = useStyles();  //so that we can use styling from styles.js as classes.style
    const dispatch = useDispatch(); // define dispatch , now where can we dispatch action? in useEffect

    useEffect(()=>{
        dispatch( getPosts() );// dispatching action to get post
    }, [currentId, dispatch]);


    return(
        <Container maxidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={ memories } alt="memories" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/> 
                        </Grid>
                        <Grid item xs={12} sm={4}>
                             <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )// sending currentid and setCurrentId as props
}

export default App;