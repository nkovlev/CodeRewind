import React, {useMemo} from "react";
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
    } | null;
    stats?: {
        additions: number;
        deletions: number;
        total: number;
    };
    html_url: string;
}

interface CommitsProps {
    commits: Commit[];
    months: number;
    maxCommits?: number;
}

function pickTrajectoryCommits(commits: Commit[], max = 6): Commit[] {
    if (!commits?.length) return [];

    const sorted = [...commits].sort(
        (a, b) =>
            new Date(a.commit.author.date).getTime() -
            new Date(b.commit.author.date).getTime()
    );

    if (sorted.length <= max) return sorted;

    const result: Commit[] = [];
    const lastIndex = sorted.length - 1;

    for (let i = 0; i < max; i++) {
        const index = Math.round((i * lastIndex) / (max - 1));
        result.push(sorted[index]);
    }

    const unique = result.filter(
        (commit, i, arr) => arr.findIndex((c) => c.sha === commit.sha) === i
    );

    return unique;
}

const CommitsComponent = ({commits, months, maxCommits = 5,}: CommitsProps) => {
    const trajectoryCommits = useMemo(
        () => pickTrajectoryCommits(commits, maxCommits),
        [commits, maxCommits]
    );

    return (
        <div className="flex flex-col w-full h-full gap-4">
            <div className="flex flex-col gap-3 mt-4">
                <h1 className="font-geist font-semibold text-[28px] leading-9">
                    The {months}-Month Trajectory
                </h1>
                <p className="text-text-secondary font-geist text-base md:text-lg mb-5 md:mb-3">
                    Direct commit milestones synthesized from GitHub commit logs.
                </p>
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
                    {trajectoryCommits.map((commit) => (
                        <div
                            key={commit.sha}
                            className="flex h-full flex-col items-center gap-2 bg-surface/70 border border-white/10 p-4 rounded-lg"
                        >
                            <div className="w-full flex justify-between items-center gap-3">
                                <div className="flex gap-1 min-w-0">
                                    <span className="font-geist font-normal text-text line-clamp-2">
                                        {commit.commit.message}
                                    </span>
                                </div>

                                <Link
                                    href={commit.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex shrink-0 items-center justify-between gap-2 font-geist font-medium text-[13px] leading-[17px] text-text bg-primary-light px-2 py-[2px] rounded-lg"
                                >
                                    {commit.sha.slice(0, 7)}
                                    <FaExternalLinkAlt size={12}/>
                                </Link>
                            </div>

                            <div className="w-full h-[1px] bg-text-muted/10"/>

                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center min-w-0">
                                    {commit.author?.avatar_url ? (
                                        <img
                                            src={commit.author.avatar_url}
                                            alt={commit.author.login}
                                            className="size-5 rounded-full"
                                        />
                                    ) : (
                                        <div className="size-5 rounded-full bg-white/10"/>
                                    )}

                                    <span className="font-geist font-normal text-text ml-2 truncate">
                                        {commit.author?.login || commit.commit.author.name || "unknown"}
                                    </span>

                                    <span
                                        className="font-geist font-medium text-[12px] leading-[17px] text-primary-light ml-2 whitespace-nowrap">
                                        {new Date(commit.commit.author.date).toLocaleDateString("en-US",
                                            {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            }
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <span className="text-chart-green font-jetbrains text-[11px] leading-[16px] font-medium">
                                        +{commit.stats?.additions ?? 0}
                                    </span>
                                    <span className="text-chart-red font-jetbrains text-[11px] leading-[16px] font-medium">
                                        -{commit.stats?.deletions ?? 0}
                                    </span>
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