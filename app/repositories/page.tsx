'use client'

import React, {useState} from 'react';
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { FaArrowRight } from "react-icons/fa";
import {FaGithub} from "react-icons/fa6";
import Link from "next/link";

const Repositories = () => {
    const repositories = useSelector(
        (state: RootState) => state.github.repositories
    ) as { id: number; name: string }[];
    const [isHovered, setIsHovered] = useState<number | null>(null);

    return (
        <div className="flex min-h-screen w-full flex-col gap-10 px-10 pt-4 font-sans">
            <div className="flex flex-col items-center gap-3">
                <h2 className="mb-6 font-geist text-3xl font-bold text-primary">Your repositories</h2>
                <h1 className="font-geist text-5xl font-bold leading-tight text-text">
                    Pick a repository to start the story
                </h1>
                <p className="text-text-secondary text-base">
                    We will rewind time and uncover story behind your code.
                </p>
            </div>
            <div className="w-full flex flex-col items-center">
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
                    {repositories?.map((repo) => (
                        <Link
                            key={repo.id}
                            className={`w-[276px] h-[148px] flex flex-col gap-6 rounded-lg  p-3  border-2 ${isHovered === repo.id ? 'border-primary-hover bg-primary-hover/10' : 'border-border bg-card/85'}`}
                            onMouseEnter={() => setIsHovered(repo.id)}
                            onMouseLeave={() => setIsHovered(null)}
                            href={`/story/${repo.id}`}
                        >
                            <div className="w-full flex justify-between">
                                <div className="flex justify-center items-center size-9 rounded-full border border-white/5">
                                    <FaGithub size={20} className="text-text-muted" />
                                </div>
                                <div className={`flex items-center justify-center size-8 rounded-full ${isHovered === repo.id ? 'bg-primary-hover' : 'bg-white/4'} transition-all duration-300`}>
                                        <FaArrowRight
                                            size={20}
                                            className="text-text-muted"
                                        />
                                </div>
                            </div>

                            <p className="text-text font-geist font-normal text-lg">
                                {repo.name}
                            </p>

                        </Link>
                    ))}
                </div>

                <p className="mt-6 text-text-secondary text-base">
                    Click on an arrow button or your repository name to see the history of your repository.
                </p>
            </div>
        </div>
    );
};

export default Repositories;