'use client'

import React from 'react';
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { FaArrowRight } from "react-icons/fa";

const Repositories = () => {
    const repositories = useSelector(
        (state: RootState) => state.github.repositories
    ) as { id: number; name: string }[];

    return (
        <div className="flex min-h-screen w-full flex-col bg-background px-10 pt-4 font-sans">
            <h1 className="mb-6 font-geist text-3xl font-bold text-text text-center">Your repositories</h1>
           <div className="flex">
                   <ul className="w-full flex flex-col gap-2">
                       {repositories?.map((repo) => (
                           <div key={repo.id} className="w-1/4 flex items-center justify-between gap-6 rounded-lg bg-card p-3">
                               <li className="text-text font-geist font-semibold">
                                   {repo.name}
                               </li>
                               <div className="flex items-center justify-center size-8 rounded-full bg-primary">
                                   <FaArrowRight size={20} className="text-background"/>
                               </div>
                           </div>
                       ))}
                   </ul>
               <div className="flex flex-col gap-3 max-w-lg">
                   <h1 className="font-geist text-5xl font-bold leading-tight text-text">
                       Do you want to see your repositorie`s history?
                   </h1>

                   <p className="text-text-secondary text-base">
                       Click on a arrow button or your repository name to see the history of your repository.
                   </p>
               </div>
           </div>
        </div>
    );
};

export default Repositories;