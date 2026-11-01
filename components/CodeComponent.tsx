"use client";

import React from "react";
import { motion } from "framer-motion";

export const CodeWindow = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-[#2a2550] p-6 shadow-2xl shadow-black/40 ring-1 ring-white/5">
            <div className="mb-4 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>

            <pre className="font-mono text-[13px] leading-7">
                <code>{children}</code>
            </pre>
        </div>
    );
};

const Line = ({ n, children }: { n: number; children: React.ReactNode }) => (
    <div className="flex gap-4">
        <span className="w-5 shrink-0 select-none text-right text-white/30">
            {n}
        </span>
        <span>{children}</span>
    </div>
);


const kw = "text-[#ff7edb]";
const fn = "text-[#7aa2f7]";
const str = "text-[#9ece6a]";
const prop = "text-[#e0af68]";
const com = "italic text-white/35";

export const CodeComponent = () => (
    <CodeWindow>
        <motion.div
            className="flex gap-4"
            initial={{ x: -70, y: -30, rotate: -6, opacity: 1 }}
            whileInView={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
            <span className="w-5 shrink-0 select-none text-right text-white/30">
                1
            </span>
            <span>
                <span className={fn}>function</span>{" "}
                <span className="text-white">understandYourCodebase</span>(
                <span className={prop}>repoId</span>:{" "}
                <span className={kw}>string</span>) {"{"}
            </span>
        </motion.div>
        <motion.div
            className="flex gap-4"
            initial={{ x: 80, y: 50, rotate: -4, opacity: 1 }}
            whileInView={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 17 }}
        >
            <span className="w-5 shrink-0 select-none text-right text-white/30">
                2
            </span>
            <span className={com}>
                // Turn thousands of commits into a clear story
            </span>
        </motion.div>

        <Line n={3}>
            <span className={kw}>const</span> history ={" "}
            <span className="text-white">analyzeCommits</span>(
            <span className={prop}>repoId</span>)
        </Line>
        <Line n={4}>
            <span className={kw}>const</span> languages ={" "}
            <span className="text-white">detectTechStack</span>(
            <span className={prop}>repoId</span>)
        </Line>
        <Line n={5}>
            <span className={kw}>const</span> people ={" "}
            <span className="text-white">findContributors</span>(
            <span className={prop}>repoId</span>)
        </Line>
        <Line n={6}> </Line>

        <Line n={7}>
            <span className={com}>// See how the project evolved over time</span>
        </Line>
        <Line n={8}>
            <span className={kw}>const</span> growth ={" "}
            <span className="text-white">trackEvolution</span>(
            <span className={prop}>history</span>)
        </Line>
        <Line n={9}>
            <span className={kw}>const</span> keyMoments ={" "}
            <span className="text-white">extractMilestones</span>(
            <span className={prop}>history</span>)
        </Line>
        <Line n={10}> </Line>

        <Line n={11}>
            <span className={com}>// Understand who actually builds it</span>
        </Line>
        <Line n={12}>
            <span className={kw}>const</span> topContributors ={" "}
            <span className="text-white">rankPeople</span>(
            <span className={prop}>people</span>)
        </Line>
        <Line n={13}>
            <span className={kw}>const</span> collaboration ={" "}
            <span className="text-white">mapConnections</span>(
            <span className={prop}>people</span>)
        </Line>
        <Line n={14}> </Line>

        <Line n={15}>
            <span className={kw}>return</span> {"{"}
        </Line>
        <Line n={16}>
            &nbsp;&nbsp;story:{" "}
            <span className="text-white">generateVisualStory</span>({"{"}
        </Line>
        <Line n={17}>&nbsp;&nbsp;&nbsp;&nbsp;history,</Line>
        <Line n={18}>&nbsp;&nbsp;&nbsp;&nbsp;languages,</Line>
        <Line n={19}>&nbsp;&nbsp;&nbsp;&nbsp;growth,</Line>
        <Line n={20}>&nbsp;&nbsp;&nbsp;&nbsp;keyMoments,</Line>
        <Line n={21}>&nbsp;&nbsp;&nbsp;&nbsp;topContributors,</Line>
        <Line n={22}>&nbsp;&nbsp;&nbsp;&nbsp;collaboration</Line>
        <Line n={23}>&nbsp;&nbsp;{"})"},</Line>
        <Line n={24}>
            &nbsp;&nbsp;clarity: <span className={str}>true</span>
        </Line>
        <Line n={25}>{"}"}</Line>
        <Line n={26}>{"}"}</Line>
    </CodeWindow>
);

export default CodeComponent;