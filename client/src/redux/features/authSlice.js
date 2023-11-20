import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    mode:"light",
    user:null,
    token:null,
    posts:[]
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        changeMode: (action,state)=>{
            state.mode = state.mode === 'light'? 'dark':'light';
        },

        setLogin: (action,state)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setLogout: (action,state)=>{
            state.user = null;
            state.token = null;
        },

        setFriends: (action,state)=>{
            if(state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.error("User donot exist!")
            }
        },

        setPosts: (action,state)=>{
            state.posts = action.payload.posts;
        },

        setPost: (action,state)=>{
            const updatedPosts = state.posts.map((post)=>{
                if(post._id === action.payload.post_id){ return action.payload.post}
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})


export const {changeMode,setLogin,setLogout,setFriends,setPosts,setPost} = authSlice.actions;
export default authSlice.reducer;