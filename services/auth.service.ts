import {
    GithubAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import type { AuthUser } from "@/store/slices/authSlice";
import { getGithubUser, getRepositories } from "@/services/github.service";

const provider = new GithubAuthProvider();

export const loginWithGithub = async () => {
    const result = await signInWithPopup(auth, provider);

    const credential = GithubAuthProvider.credentialFromResult(result);
    const githubToken = credential?.accessToken;

    if (!githubToken) {
        throw new Error("GitHub token is missing");
    }

    const user: AuthUser = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
    };

    const [githubUser, repositories] = await Promise.all([
        getGithubUser(githubToken),
        getRepositories(githubToken),
    ]);

    return { user, githubUser, repositories, githubToken };
};

export const logout = async () => {
    await signOut(auth);
};