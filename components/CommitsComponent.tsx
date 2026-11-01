import React from 'react';
import Link from "next/link";
import {FaExternalLinkAlt} from "react-icons/fa";

interface Commit {
    sha: string;
    commit: {
        message: string;
        author: {
            date: string;
            name?: string;
        };
    };
    author: {
        login: string;
        avatar_url?: string;
    };
    stats: {
        additions: number;
        deletions: number;
        total: number;
    };
    html_url: string;
}

interface CommitsProps {
    commits: Commit[];
    months: number;
}

const CommitsComponent = ({commits, months}: CommitsProps) => {
    return (
        <div className="flex flex-col w-full h-full gap-4">
            <div className="flex flex-col gap-3 mt-4">
                <h1 className="font-geist font-semibold text-[28px] leading-9">{`The ${months}-Month Trajectory`}</h1>
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
                    {commits.map((commit) => (
                        <div className="flex h-full flex-col items-center gap-2 bg-surface/70 border border-white/10 p-4 rounded-lg">
                            <div className="w-full flex justify-between items-center">
                                <div className="flex gap-1">
                                    <span className="font-geist font-normal text-text">{commit.commit.message}</span>
                                </div>
                                <Link
                                    href={commit.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between gap-2 font-geist font-medium text-[13px] leading-[17px] text-text bg-primary-light px-2 py-[2px]  rounded-lg"
                                >
                                    {commit.sha.slice(0, 7)}
                                    <FaExternalLinkAlt size={12}/>
                                </Link>
                            </div>
                            <div className="w-full h-[1px] bg-text-muted/10"></div>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    <img src={commit.author.avatar_url} alt={commit.author.login} className="size-5 rounded-full" />
                                    <span className="font-geist font-normal text-text ml-2">{commit.author.login}</span>
                                    <span className="font-geist font-medium text-[12px] leading-[17px] text-primary-light ml-2">
                                        {new Date(commit.commit.author.date).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-chart-green font-jetbrains text-[11px] leading-[16px] font-medium">+{commit.stats.additions}</span>
                                    <span className="text-chart-red font-jetbrains text-[11px] leading-[16px] font-medium">-{commit.stats.deletions}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommitsComponent;