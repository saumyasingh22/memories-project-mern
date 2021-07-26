import { combineReducers } from "redux"; ///in more complex app we use combineReducers() 
                                         ///so that we can pass multiple reducer to store  

import posts from './posts';

export const reducers = combineReducers({
    posts,  ///posts: posts , since key and value both are same we can write it once
})