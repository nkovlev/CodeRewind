
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GithubState {
    githubUser: any | null;
    repositories: any[];
    selectedRepository: any | null;
    loading: boolean;
}

const initialState: GithubState = {
    githubUser: null,
    repositories: [],
    selectedRepository: null,
    loading: false,
};

const githubSlice = createSlice({
    name: "github",
    initialState,
    reducers: {
        setGithubUser: (state, action: PayloadAction<any>) => {
            state.githubUser = action.payload;
        },

        setRepositories: (state, action: PayloadAction<any[]>) => {
            state.repositories = action.payload;
        },

        setSelectedRepository: (state, action: PayloadAction<any>) => {
            state.selectedRepository = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        clearGithubData: (state) => {
            state.githubUser = null;
            state.repositories = [];
            state.selectedRepository = null;
        },
    },
});

export const {
    setGithubUser,
    setRepositories,
    setSelectedRepository,
    setLoading,
    clearGithubData,
} = githubSlice.actions;

export default githubSlice.reducer;