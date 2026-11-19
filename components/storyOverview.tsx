'use client'

import React from 'react';
import {AiFillStar} from "react-icons/ai";
import {RiGitCommitLine} from "react-icons/ri";
import {FiUsers} from "react-icons/fi";
import { motion, type Variants } from "framer-motion";
import {Button} from "@/components/ui/button";
import {CiShare2} from "react-icons/ci";
import {MdOutlineFileDownload} from "react-icons/md";
import Link from "next/link";

interface StoryOverviewProps {
    id: string;
    repositoryName: string;
    description: string;
    languages: Object;
    stars: number;
    contributors: number;
    commits: number;
    months: number;
}

interface BadgesProps {
    icon: React.ElementType;
    label: string;
    value: number;
    iconBackground: string;
    sublabel: string;
}

const StoryOverview = (data: StoryOverviewProps) => {
    const BadgesData: BadgesProps[] = [
        {
            icon: AiFillStar,
            iconBackground: 'bg-chart-orange',
            label: "Stars",
            sublabel: "GitHub Stars",
            value: data.stars
        },
        {
            icon: RiGitCommitLine,
            iconBackground: 'bg-primary/20',
            label: "Commits",
            value: data.commits,
            sublabel: "Main Branch"
        },
        {
            icon: FiUsers,
            iconBackground: 'bg-chart-blue',
            label: "Contributors",
            value: data.contributors,
            sublabel: "Active Authors"
        },
        {
            icon: FiUsers,
            iconBackground: 'bg-chart-blue',
            label: "Timeline",
            value: data.months,
            sublabel: "Project Length"
        },
    ];
    const LanguagesData = data.languages;

    const titleAnimation: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    }
    const container: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
    }
    const card: Variants = {
        hidden: { opacity: 0, y: 24, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    }

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col">
                <div className="flex w-fit max-w-full flex-wrap px-4 py-2 items-center gap-2 rounded-full border border-white/10 bg-surface backdrop-blur-md mb-6 md:mb-12">
                    <div className='size-2 rounded-full bg-primary'></div>
                    <span className="font-geist font-semibold text-sm text-primary-light">Repository ID:</span>
                    {data.id}
                </div>
                <motion.h1
                    className="
                        font-geist font-bold
                        text-[28px] leading-[1.15]
                        sm:text-[36px] sm:leading-[1.2]
                        md:text-[44px] md:leading-[1.15]
                        text-text mb-5
                        bg-gradient-to-r from-[#FFFFFF] to-[#C0C1FF] bg-clip-text text-transparent
                        break-words hyphens-auto
                        max-w-full"
                    variants={titleAnimation}
                    initial="hidden"
                    animate="visible"
                >
                    {data.repositoryName.split("/")[1]}
                </motion.h1>
                <p className="text-text-secondary font-geist text-base md:text-lg mb-5 md:mb-3">
                    {data.description ? data.description : ""}
                </p>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                    <Button variant={"secondary"} size={"lg"} className="w-full md:w-auto">
                        <Link href="#">
                            <div className="flex items-center gap-2">
                                <CiShare2 size={20} />
                                <span>Share Story</span>
                            </div>
                        </Link>
                    </Button>
                    <Button variant={"secondary"} size={"lg"} className="w-full md:w-auto">
                        <Link href="#">
                            <div className="flex items-center gap-2">
                                <MdOutlineFileDownload size={20} />
                                <span>Export Snapshot</span>
                            </div>
                        </Link>
                    </Button>
                </div>
            </div>
            <motion.div
                className="grid w-full grid-cols-2 gap-3 my-8 md:gap-4 md:my-12 lg:grid-cols-4 lg:my-16"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {BadgesData.map((badge) => (
                    <motion.div
                        className="flex flex-col gap-2 p-4 bg-surface/70 border border-white/10 rounded-lg"
                        variants={card}
                        key={badge.label}
                    >
                        <div className="flex w-full min-w-0 justify-between items-center gap-2">
                            <span className="truncate font-jetbrains font-medium text-[12px] leading-[15px] md:text-[14px] md:leading-[17px] text-text-muted uppercase">
                                {badge.label}
                            </span>
                            <div className="size-[30px] shrink-0 flex items-center justify-center border-2 border-chart-blue/20 bg-chart-blue rounded-lg">
                                <badge.icon className={`${badge.iconBackground}`} size={20} />
                            </div>
                        </div>
                        <span className="font-geist text-[24px] leading-8 md:text-[28px] md:leading-9">
                            {badge.value} { badge.label === 'Timeline' && (<span>Months</span>)}
                        </span>
                        <span className="font-jetbrains font-medium text-[12px] leading-[15px] md:text-[14px] md:leading-[17px] text-text-muted">
                            {badge.sublabel}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
            <div className="flex flex-col">
                    <motion.h1
                        className="font-geist font-semibold text-[28px] leading-9"
                        variants={titleAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        Codebase Composition
                    </motion.h1>
                <div className="flex flex-col w-full">
                    {LanguagesData.map((language) => (
                        <div key={language.language} className="flex items-center justify-between gap-4 my-2">
                            <div className="flex items-center gap-3 min-w-0">
                                <span className={`size-2 shrink-0 rounded-full bg-primary-light`} />
                                <span className="truncate font-jetbrains font-semibold text-text">
                                    {language.language}
                                </span>
                                <span className={`font-jetbrains font-semibold text-primary-light`}>
                                    {language.percent.toFixed(1)}%
                                </span>
                            </div>

                            <span className="shrink-0 font-jetbrains text-sm text-text-muted">
                                {(language.bytes / 1024).toFixed(1)} KB
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full h-[1px] bg-text-muted/10"></div>
        </div>
    );
};

export default StoryOverview;