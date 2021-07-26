import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/ActionTypes';
import * as api from '../api'; // we do it this way because we will have lot of calls exported from api

// Action creators: fuctions that return actions(instead of returning action we dispatch it here) ;
// we write async(dispatch) because it is asynchronous func,dispatch comes from redux thunk
export const getPosts = () => async (dispatch) => { // we imported this action in app.js so we have to export it
    try {
        const { data } = await api.fetchPosts();// destructure data, we are getting response from api as data object, data is posts
        dispatch({ type: FETCH_ALL, payload: data }); //dispatch action(we directly added its value),payload is data where we store all posts
    } catch (error) {
        console.log(error.message);
    }
};

export const createPost = (post) => async (dispatch) =>{// we will dispatch this action in form.js
    try {
        const {data} = await api.createPost(post);

        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}
//now we are successfully using redux to pass or disptach an action from the data in our backend

export const updatePost = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
      await api.deletePost(id); //since we do not need any response or data from api
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);//same as update without post since we are updating only like
    
        dispatch({ type: UPDATE, payload: data });
      } catch (error) {
        console.log(error);
      }
};

//after action we have to go to the reducers

//GENERAL FORMAT FOR CREATING ACTION FUNCTION
/*const getPosts=()=> async (dispatch) => {
    const response = await api.fetchPosts(); //geting response from api
    const action={ type: 'FETCH_ALL', payload: [] } //payload is data where we store all posts
    return dispatch(action); 
    }*/

