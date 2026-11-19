'use client'

import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { MdLaptopChromebook } from "react-icons/md";

type Props = {
    token: string
    owner: string
    repo: string
    defaultBranch?: string
    mainLanguage?: string
}

const FILE_CANDIDATES: Record<string, string[]> = {
    TypeScript: [
        'src/App.tsx',
        'src/main.tsx',
        'src/index.ts',
        'app/page.tsx',
        'src/app/page.tsx',
    ],
    JavaScript: [
        'src/App.jsx',
        'src/App.js',
        'src/index.js',
        'app.js',
    ],
    Python: ['main.py', 'app.py', 'src/main.py'],
    default: ['src/App.tsx', 'src/App.jsx', 'src/main.ts', 'src/index.js'],
}

const CodeSnapshot = ({token, owner, repo, defaultBranch = 'main', mainLanguage,}: Props) => {
    const [code, setCode] = useState<string | null>(null)
    const [filePath, setFilePath] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        const load = async () => {
            try {
                const candidates = [
                    ...(FILE_CANDIDATES[mainLanguage || ''] || []),
                    ...FILE_CANDIDATES.default,
                ]

                for (const path of candidates) {
                    const res = await fetch(
                        `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${defaultBranch}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                Accept: 'application/vnd.github.v3.raw',
                            },
                        }
                    )

                    if (!res.ok) continue

                    const text = await res.text()
                    if (cancelled) return

                    setCode(text)
                    setFilePath(path)
                    return
                }

                setError('No suitable file found')
            } catch (e) {
                if (!cancelled) setError(String(e))
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [token, owner, repo, defaultBranch, mainLanguage])

    if (error) return null

    if (!code) {
        return (
            <div className="mt-10 h-48 rounded-xl bg-[#0b0b0f] animate-pulse" />
        )
    }

    return (
        <div className="flex flex-col w-full h-full gap-2 mt-16">
            <div className="flex flex-col">
                <h1 className="font-geist font-semibold text-[28px] leading-9">Extension Architecture</h1>
                <p className="text-text-secondary font-geist text-lg">
                    Direct look at the actual branch inspection handler.
                </p>
            </div>
            <div className="mt-10 rounded-xl overflow-hidden border border-white/10 hidden md:block">
                <div className="flex items-center px-4 py-2 gap-4 text-sm text-white/60 bg-white/5">
                    <div className="flex gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                    </div>
                    {filePath}
                </div>
                <SyntaxHighlighter
                    language="jsx"
                    style={oneDark}
                    showLineNumbers
                    wrapLongLines
                    customStyle={{
                        margin: 0,
                        padding: 16,
                        background: 'transparent',
                        fontSize: 13,
                        lineHeight: 1.6,
                        overflowX: 'auto',
                    }}
                    codeTagProps={{
                        style: {
                            background: 'transparent',
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        },
                    }}
                    lineNumberStyle={{
                        minWidth: '2.5em',
                        paddingRight: '16px',
                        color: 'rgba(255,255,255,0.25)',
                        background: 'transparent',
                    }}
                    lineProps={{
                        style: {
                            background: 'transparent',
                            display: 'block',
                        },
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
            <div className="block md:hidden">
                <div className="flex flex-col items-center bg-[#1B1B1E]/70 p-6 gap-3 rounded-lg">
                    <div className="size-10 flex items-center justify-center bg-border rounded-lg">
                        <MdLaptopChromebook size={16} />
                    </div>
                    <span>To view the full code, please open this page on a tablet or desktop.</span>
                </div>
            </div>
        </div>
    )
}

export default CodeSnapshot