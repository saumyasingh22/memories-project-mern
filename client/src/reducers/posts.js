import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/ActionTypes";

// as we completed the logic of dipatching action and dispatched an action from app.js we have to write logic for fecthing all posts that we do it here
export default (posts = [], action) => { // we export this reducer because we have to use it in combineReducer in index.js
    switch (action.type) {
        case FETCH_ALL: 
            return action.payload; ///it is where posts was stored as data in action 
        case CREATE:    
            return [...posts, action.payload];   // we have to include all the posts that were already present using spread operator and then add new action.payload
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id? action.payload : post);//output of map func is an array since we made it this way in backend // if post id is equal to updatedpost(action.payload) id then return updated post else send back original post without updates
        case DELETE:
            return posts.filter((post)=> post._id != action.payload);//if post id is not equal to action.payload then we remove it i.e. we are going to keep all the posts except where id is not equal to action.payload
        default:
            return posts;
    }
}

//since we completed all logic for fetching post here but we have to display it in posts.js component

/*  const reducer = (state = [], action) => { // state cannot be empty we have inititialize it something 
                                              //since are posts is an array we assign it empty array
        switch (action.type) {
            case 'FETCH_ALL': // to fetch all posts
                return state; // or perform some logic
            case 'CREATE':    //to create posts
                return state; // or perform some logic   
            default:
                break;
        }
} */