'use client'

import React from 'react';
import { FaGithub } from "react-icons/fa6";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {setGithubUser, setRepositories} from "@/store/slices/githubSlice";
import {setUser} from "@/store/slices/authSlice";
import {loginWithGithub} from "@/services/auth.service";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "@/store/store";

const Greeting = () => {
    const dispatch = useDispatch();
    const handleLogin = async () => {
        try {
            const { user, githubUser, repositories, githubToken } = await loginWithGithub();

            dispatch(setUser({ user, token: githubToken }));
            dispatch(setGithubUser(githubUser));
            dispatch(setRepositories(repositories));
        } catch (error) {
            console.error(error);
        }
    };
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <div className="flex w-screen h-full justify-center">
                <div className="flex flex-col items-center max-w-4xl gap-7 py-24">

                    <div className="flex w-fit px-4 py-2 items-center gap-2 rounded-full border border-white/10 bg-surface backdrop-blur-md">
                        <FaGithub size={20} className="text-primary" />
                        <span className="font-geist font-semibold text-sm text-primary-light">GitHub Repository Analytics</span>
                    </div>

                    <h1 className="font-geist text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-center text-balance text-text">
                        See How Your Codebase Evolved Over Time
                    </h1>

                    <p className="text-text-secondary font-jetbrains text-lg text-center max-w-2xl">
                        Explore commits, contributors, repository health, languages
                        and project evolution through beautiful visual analytics.
                    </p>

                    <div className="flex gap-3 items-center">
                        {!isAuthenticated ? (
                            <Button variant={"purple"} size={"large"} onClick={handleLogin} asChild>
                                <div className="flex items-center">
                                    <FaGithub size={20}/>
                                    <span>Sign in with GitHub</span>
                                </div>
                            </Button>
                        ) : (<></>)}
                        <Button variant={"outline"} size={"large"}>
                            <Link href="#">Live Demo</Link>
                        </Button>
                    </div>

                    <span className="text-text-muted font-jetbrains text-xl">
                        No setup • OAuth • Open Source
                    </span>
            </div>
        </div>
    );
};

export default Greeting;