'use client'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
import type { RootState } from '@/store/store'
import {
    getRepositoryById,
    getLanguagesById,
    getContributorsById,
    getCommitsById,
} from '@/services/github.service'
import Loader from "@/components/loader";
import { GoDatabase } from "react-icons/go";
import { FaCode } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import StoryOverview from "@/components/storyOverview";
import ContributorsComponent from "@/components/ContributorsComponent";
import CommitsComponent from "@/components/CommitsComponent";
import CodeComponent from "@/components/CodeComponent";
import CodeSnapshot from "@/components/CodeComponent";
import StoryFooter from "@/components/StoryFooter";

interface Step {
    id: string
    label: string
    text: string
    status: 'pending' | 'loading' | 'done' | 'error'
    icon: React.ElementType
}


export default function StoryPage() {
    const { id } = useParams<{ id: string }>()
    const { token } = useSelector((state: RootState) => state.auth)

    const [repo, setRepo] = useState<any>(null)
    const [languages, setLanguages] = useState<any>(null)
    const [commits, setCommits] = useState<any>(null)
    const [contributors, setContributors] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    const [steps, setSteps] = useState<Step[]>([
        { id: 'repo', label: 'Repository', text:'Metadata, license, fork counts and star velocity verified.', status: 'pending', icon: GoDatabase },
        { id: 'languages', label: 'Languages',text:'Code distribution, syntaxes, and module composition parsed.', status: 'pending', icon: FaCode },
        { id: 'commits', label: 'Commits',text:'Crunching commit history,punchcards, and code delta.', status: 'pending', icon: FaCodeBranch },
        { id: 'contributors', label: 'Contributors',text:'Core maintainers, top PR authors, and community rankings.', status: 'pending', icon: FiUsers },
    ])

    const updateStep = (id: string, status: 'pending' | 'loading' | 'done' | 'error') => {
        setSteps(prev =>
            prev.map(step =>
                step.id === id
                    ? { ...step, status }
                    : step
            )
        )
    }

    useEffect(() => {
        if (!token || !id) {
            setLoading(false)
            return
        }

        function calculateLanguagePercentages(languages: Record<string, number>) {
            const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
            if (total === 0) return [];

            return Object.entries(languages)
                .map(([language, bytes]) => ({
                    language,
                    bytes,
                    percent: Number(((bytes / total) * 100).toFixed(1)),
                }))
                .sort((a, b) => b.percent - a.percent);
        }

        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

        const load = async () => {
            try {
                setLoading(true)
                setError(null)

                updateStep('repo', 'loading')
                updateStep('languages', 'loading')
                updateStep('commits', 'loading')
                updateStep('contributors', 'loading')

                const repoPromise = getRepositoryById(token, id)
                    .then(async (data) => {
                        await delay(1500)
                        updateStep('repo', 'done')
                        return data
                    })

                const languagesPromise = getLanguagesById(token, id)
                    .then(async (data) => {
                        await delay(1800)
                        updateStep('languages', 'done')
                        return calculateLanguagePercentages(data)
                    })

                const commitsPromise = getCommitsById(token, id)
                    .then(async (data) => {
                        await delay(1000)
                        updateStep('commits', 'done')
                        return data
                    })

                const contributorsPromise = getContributorsById(token, id)
                    .then(async (data) => {
                        await delay(2200)
                        updateStep('contributors', 'done')
                        return data
                    })

                const [repoData, languagesWithPercent, commits, contributors] = await Promise.all([
                    repoPromise,
                    languagesPromise,
                    commitsPromise,
                    contributorsPromise,
                ])

                setRepo(repoData)
                setLanguages(languagesWithPercent);
                setCommits(commits)
                setContributors(contributors)
            } catch (err) {
                setError(String(err))
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [token, id])

    function getMonthsDifference(start: Date, end: Date): number {
        const years = end.getFullYear() - start.getFullYear();
        const months = end.getMonth() - start.getMonth();
        return years * 12 + months;
    }

    let months = 0;
    if (repo && commits && commits.length > 0) {
        const createdAt = new Date(repo.created_at);
        const lastCommitAt = new Date(commits[0].commit.author.date);
        months = getMonthsDifference(createdAt, lastCommitAt);
    }
    return (
        <div className="p-10 text-white">
            {loading ? (
                <Loader steps={steps}/>
            ) : (
                <div className="flex flex-col justify-center py-6 px-4 md:py-10 md:px-10 lg:px-32">
                    <StoryOverview
                        id={repo.id}
                        repositoryName={repo.full_name}
                        description={repo.description}
                        stars={repo.stargazers_count}
                        commits={commits.length}
                        contributors={contributors.length}
                        languages={languages}
                        months={months}
                    />
                    <CommitsComponent commits={commits} months={months}/>
                    <CodeSnapshot
                        token={token}
                        owner={repo?.owner?.login}
                        repo={repo?.name}
                        defaultBranch={repo?.default_branch}
                        mainLanguage={languages?.[0]?.language}
                    />
                    <ContributorsComponent contributors={contributors} contributorsCount={contributors.length} months={months}/>
                    <StoryFooter name={repo.full_name} commitsNumber={commits.length} long={months} />
                </div>
            )}

        </div>
    )
}