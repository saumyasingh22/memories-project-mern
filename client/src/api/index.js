import axios from 'axios'; ///use it to make api calls

const url = 'https://memories-project22.herokuapp.com/posts'; /// our url pointing to backend route

export const fetchPosts = () => axios.get(url); // exporting a function to get url that 
                                                 //returns all the posts that we have in backend
export const createPost = (newPost) => axios.post(url, newPost); //we have to specify url and then data we are sending

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost); // we are recieving two parameters id and updatedpost or postdata(changed postdata)

export const deletePost = (id) => axios.delete(`${url}/${id}`);//we will not have any data of the post since we are deleting

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

//now move to actions

/* now we have to add redux because all action towards our backend will be done using redux
   we need to dispatch those actions to do that we have to add some boilerplate code meaning we have
   have to create few files and folders(actions and reducers) but later on in bigger apps it is going 
   to be extremely scalable(as our app grows we will be able to use same old consistency, 
   redux offers us without any trouble)  */                                                 