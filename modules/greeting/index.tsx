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
            const { user, githubUser, repositories } = await loginWithGithub();

            dispatch(setUser(user));
            dispatch(setGithubUser(githubUser));
            dispatch(setRepositories(repositories));
        } catch (error) {
            console.error(error);
        }
    };
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <div className="flex flex-col w-full h-full justify-start">
            <div className="flex w-full justify-between pt-16">
                <div className="flex flex-col gap-7 max-w-lg">

                    <div className="flex w-fit px-4 py-2 items-center gap-2 rounded-full bg-card">
                        <FaGithub size={20} className="text-primary/60"/>
                        <span className="font-geist text-sm text-primary/60">
                            GitHub Repository Analytics
                        </span>
                    </div>

                    <h1 className="font-geist text-5xl font-bold leading-tight text-text">
                        See How Your Codebase Evolved Over Time
                    </h1>

                    <p className="text-text-secondary text-base">
                        Explore commits, contributors, repository health, languages
                        and project evolution through beautiful visual analytics.
                    </p>

                    <div className="flex gap-3 items-center">
                        {!isAuthenticated ? (
                            <Button variant={"purple"} size={"large"} onClick={handleLogin}>
                                Sign in with GitHub
                            </Button>
                        ) : (<></>)}
                        <Button variant={"outline"} size={"large"}>
                            <Link href="#">Live Demo</Link>
                        </Button>
                    </div>

                    <span className="text-text-muted text-xs">
                        No setup • OAuth • Open Source
                    </span>
                </div>

                <div className="flex flex-1">
                    {/* сюда позже пойдёт дашборд-картинка/компонент */}
                </div>
            </div>
        </div>
    );
};

export default Greeting;