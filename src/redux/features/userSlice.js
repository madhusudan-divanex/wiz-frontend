import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSecureApiData } from '../../services/api'

const initialState = {
    profileData: {},
    userProfile:{},
    membershipData: {},
    businessData: {},
    loading: false,
    error: null
}
export const fetchUserProfile = createAsyncThunk(
    'users/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        const response = await getSecureApiData('api/users/profile')
        if (response.status) {
            return response
        }
        localStorage.clear()
        sessionStorage.clear()

        return rejectWithValue("User not authenticated");
    },
)
export const fetchProfileData = createAsyncThunk(
    'users/fetchProfileData',
    async (_, { rejectWithValue }) => {
        const response = await getSecureApiData(`api/users/profile-data/${localStorage.getItem('userId')}`)
        if (response.status) {
            return response
        }
        localStorage.clear()
        sessionStorage.clear()

        return rejectWithValue("User not authenticated");
    },
)
export const fetchUserBusiness = createAsyncThunk(
    'users/fetchUserBusiness',
    async (_, { rejectWithValue }) => {
        const response = await getSecureApiData(`api/provider/get-accreditation/${localStorage.getItem('userId')}`)
        if (response.status) {
            return response
        } else {

            localStorage.clear()
            sessionStorage.clear()
        }
        return rejectWithValue("User not authenticated");
    },
)

export const fetchUserData = createAsyncThunk(
    'users/fetchUserData',
    async (_, { rejectWithValue }) => {
        const response = await getSecureApiData(`api/users/${localStorage.getItem('userId')}`)
        if (response.success) {
            return response
        } else {
            localStorage.clear()
            sessionStorage.clear()
        }
        return rejectWithValue("User not authenticated");
    },
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.profileData = action.user
            state.membershipData = action.membershipData
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profileData = action.payload.data;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.user;
                state.membershipData = action.payload.membershipData
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserBusiness.fulfilled, (state, action) => {
                state.loading = false;
                state.businessData = action.payload.data
            }).addCase(fetchProfileData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload.data;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
})

// Action creators are generated for each case reducer function
export const { setUserData } = userSlice.actions

export default userSlice.reducer