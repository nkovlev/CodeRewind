import React from 'react';
import {AiFillStar, AiOutlineLoading3Quarters} from "react-icons/ai";
import {RiGitCommitLine} from "react-icons/ri";
import {FiUsers} from "react-icons/fi";
import {IoIosCode} from "react-icons/io";
import {data} from "autoprefixer";

interface StoryOverviewProps {
    id: string;
    repositoryName: string;
    description: string;
    languages: Object;
    stars: number;
    // forks: number;
    // openIssues: number;
    contributors: number;
    commits: number;
    // lastCommitDate: string;
    // lastCommitMessage: string;
    // lastCommitAuthor: string;
}

interface BadgesProps {
    icon: React.ElementType;
    label: string;
    value: number;
    iconBackground: string;
}


const StarBadge = ({ stars }: { stars: number }) => {
    return (
        <div className="flex items-center gap-2 px-4 py-1 text-lg text-text-secondary font-medium font-jetbrains">
            <AiFillStar  className="text-yellow-300" size={20} />
            {stars}
            <span>Stars</span>
        </div>
    );
};

const CommitBadge = ({ commits }: { commits: number }) => {
    return (
        <div className="flex items-center gap-2 px-4 py-1 text-lg text-text-secondary font-medium font-jetbrains">
            <RiGitCommitLine   className="text-text-muted" size={20} />
            {commits}
            <span>Commits</span>
        </div>
    );
};

const ContributorsBadge = ({ contributors }: { contributors: number }) => {
    return (
        <div className="flex items-center gap-2 px-4 py-1 text-lg text-text-secondary font-medium font-jetbrains">
            <FiUsers   className="text-cyan-500" size={20} />
            {contributors}
            <span>Contributors</span>
        </div>
    );
};

const LanguageBadge = ({ language }: { language: Object }) => {
    return (
        <div className="flex items-center gap-3 px-4 py-1 text-md bg-surface rounded-full border-2 border-white/20 text-text-secondary font-medium font-geist">
            <IoIosCode    className="text-cyan-500" size={14} />
            {language.language}
            <span>{language.percent} %</span>
        </div>
    );
};

const StoryOverview = (data:StoryOverviewProps) => {
    const BadgesData: BadgesProps[] = [
        { icon: AiFillStar,iconBackground:'bg-chart-orange', label: "Stars", value: data.stars },
        { icon: RiGitCommitLine,iconBackground:'bg-primary/20', label: "Commits", value: data.commits },
        { icon: FiUsers,iconBackground:'bg-chart-blue', label: "Contributors", value: data.contributors },
    ];
    const LanguagesData = data.languages;
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col">
                <div className="flex w-fit px-4 py-2 items-center gap-2 rounded-full border border-white/10 bg-surface backdrop-blur-md mb-12">
                    <div className='size-2 rounded-full bg-primary'></div>
                    <span className="font-geist font-semibold text-sm text-primary-light">Repository Narrative / ID:</span>
                    {data.id}
                </div>
                <h1 className="font-geist text-5xl md:text-6xl font-bold leading-[1.05] text-text mb-5 bg-gradient-to-r from-[#FFFFFF] to-[#C0C1FF] bg-clip-text text-transparent">
                    {data.repositoryName}
                </h1>
                <p className="text-text-secondary font-geist text-lg mb-3">
                    {data.description ? data.description : ""}
                </p>
            </div>
            <div className="w-full h-[1px] bg-text-muted/10"></div>
            <div className="flex w-full items-center justify-between mt-5 gap-10">
                <div className="flex gap-3">
                    <StarBadge stars={data.stars} />
                    <CommitBadge commits={data.commits} />
                    <ContributorsBadge contributors={data.contributors} />
                </div>
                <div className="flex gap-4">
                    {LanguagesData.map(language => (
                        <LanguageBadge key={language.language} language={language} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StoryOverview;