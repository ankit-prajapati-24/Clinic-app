import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Image:"",
    userdata:"",
    SignData:"",
    isLogin:false,
    role:localStorage.getItem("role")?localStorage.getItem("role"):"",
    token:localStorage.getItem("token")?localStorage.getItem("token"):"",
    search:false
}

const userDataSlice = createSlice({
    name:"User",
    initialState:initialState,
    reducers:{
        setUserImage(state,value){
           state.Image = value.payload;
        },
        setcType(state,value){
            state.cType = value.payload;
         },
         setuserdata(state, value) {
            // Store the JSON string in localStorage
            localStorage.setItem("userdata", value.payload);
        
            // Update the state with the modified user data object
            state.userdata = value.payload;
        },
        
         setLogin(state,value){
            state.isLogin = value.payload
         },
         setquery(state,value){
            state.query = value.payload
         },
         setsearch(state,value){
            state.search = value.payload
         },
         setSignData(state,value){
            state.SignData = value.payload
         },
         setToken(state,value){

         localStorage.setItem("token",value.payload);
            state.token = value.payload
            console.log("adding token in local storage",value.payload);
         },
         setRole(state,value){

         localStorage.setItem("role",value.payload);
            state.role = value.payload
            console.log("adding role in local storage",value.payload);
         }
    }
})

export const {Image,setUserImage,setcType,cType,setuserdata,userdata,setLogin,setRole,isLogin,query,setquery,search,setsearch,setSignData,SignData,Token,setToken} = userDataSlice.actions;
export default userDataSlice.reducer;


// export const {setuserdata,userdataform} = SignUpData.actions;
// export default SignUpData.reducer;
