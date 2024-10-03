
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserDetail, updateUserDetail } from "./userDetails.api";


export type Plan = {
    id: number;
    name: string;
    price: number;
    formLimit: number;
    submissionLimit: number;
    downloadLimit: number
  }
  
  export type UserPlan = {
    id: number;
    planId: number;
    userId: number;
    expiresAt: string;
    plan: Plan
  }
  
  export type UserDetails = {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
    userPlans : UserPlan[]
  }

  export type initialState = {
    userDetails: UserDetails,
    loading: boolean,
    updateLoading: boolean,
    error: string | null;
  }

  const initialState: initialState = {
    userDetails: {
        id: 0,
        name: "",
        email: "",
        passwordHash: "",
        userPlans: []
    },
    loading: false,
    updateLoading: false,
    error: null
  }


  export const  getUserDetailAsync = createAsyncThunk(
    "/userDetails", 
     async (userId:number) =>{
        try{
            const res = await getUserDetail(userId);
            return res;
        }catch(err){
            console.error('error:--',err);
            throw err;
        }
     }
  );

  export const updateUserDetailAsync = createAsyncThunk(
    "/updateUserDetails",
    async ({ userId, updateData }: { userId: any; updateData: any }, thunkAPI) =>{
      try{
        const res = await updateUserDetail(userId, updateData);
        return res;
      }catch(err){
        console.error('error:',err);
        throw err;
    }
    }
  )

  export const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {

    }, 
    extraReducers: (builder) =>{
        builder.addCase(getUserDetailAsync.pending, (state,action)=>{
            state.loading = true
        })
        .addCase(getUserDetailAsync.fulfilled, (state, action)=>{
            state.loading = false;
            state.userDetails = action.payload;
        })
        .addCase(updateUserDetailAsync.pending, (state, action)=>{
          state.updateLoading = true;
        })
        .addCase(updateUserDetailAsync.fulfilled, (state, action)=>{
          state.updateLoading = false;
          state.userDetails = {
            ...state.userDetails,
            ...action.payload 
          };
        })
        .addCase(updateUserDetailAsync.rejected, (state, action) => {
          state.updateLoading = false;  
          state.error = "Failed to update user details. Please try again."; 
        })
    }
  });


  export default userDetailsSlice.reducer;