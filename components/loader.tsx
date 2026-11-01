import React from "react";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoTimeOutline } from "react-icons/io5";

interface Step {
    id: string;
    label: string;
    text: string;
    status: "pending" | "loading" | "done" | "error" | "queued";
    icon: React.ElementType;
}

interface LoaderProps {
    steps: Step[];
}

const statusStyles = {
    pending: {
        border: "border-white/10",
        iconBorder: "border-white/10",
        iconColor: "text-text-muted",
        badgeBg: "bg-white/5",
        badgeText: "text-text-muted",
    },
    queued: {
        border: "border-white/10",
        iconBorder: "border-white/10",
        iconColor: "text-text-muted",
        badgeBg: "bg-white/5",
        badgeText: "text-text-muted",
    },
    loading: {
        border: "border-primary shadow-[0_0_0_1px] shadow-primary/40",
        iconBorder: "border-primary",
        iconColor: "text-primary",
        badgeBg: "bg-primary/15",
        badgeText: "text-primary",
    },
    done: {
        border: "border-success/40",
        iconBorder: "border-success/40",
        iconColor: "text-success",
        badgeBg: "bg-success/15",
        badgeText: "text-success",
    },
    error: {
        border: "border-danger/40",
        iconBorder: "border-danger/40",
        iconColor: "text-danger",
        badgeBg: "bg-danger/15",
        badgeText: "text-danger",
    },
} as const;

const statusLabel: Record<Step["status"], string> = {
    pending: "Pending",
    queued: "Queued",
    loading: "Analyzing...",
    done: "Done",
    error: "Error",
};

const StatusBadge = ({ status }: { status: Step["status"] }) => {
    const s = statusStyles[status];

    return (
        <div
            className={`flex items-center gap-1.5 rounded-full px-4 py-1 text-md font-medium ${s.badgeBg} ${s.badgeText}`}
        >
            {status === "done" && <FaCheck size={11} />}
            {status === "loading" && (
                <AiOutlineLoading3Quarters size={11} className="animate-spin" />
            )}
            {(status === "queued" || status === "pending") && (
                <IoTimeOutline size={12} />
            )}
            {statusLabel[status]}
        </div>
    );
};

export default function Loader({ steps }: LoaderProps) {
    return (
        <div className="w-full flex flex-col items-center gap-4">
            <div className="flex w-fit px-4 py-2 items-center gap-2 rounded-full font-geist text-xl text-primary border border-primary">
                GitHub Repository Analytics
            </div>

            <h1 className="font-geist text-5xl font-bold leading-tight text-text">
                Building your story...
            </h1>

            <p className="text-text-secondary text-base max-w-lg text-center">
                Collecting repository metrics, language syntax distribution, commit
                timeline, and core maintainer insights.
            </p>

            <div className="grid w-full max-w-[1560px] mx-auto grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
                {steps.map((step) => {
                    const s = statusStyles[step.status];
                    const Icon = step.icon;

                    return (
                        <div
                            key={step.id}
                            className={`flex w-full min-h-[260px] flex-col gap-8 rounded-xl border bg-card/60 p-5 transition-colors duration-300 ${s.border}`}
                        >
                            <div className="flex w-full items-center justify-between">
                                <div
                                    className={`flex items-center justify-center size-16 rounded-lg border ${s.iconBorder}`}
                                >
                                    <Icon size={40} className={s.iconColor} />
                                </div>

                                <StatusBadge status={step.status} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-xl font-bold text-text">
                                    {step.label}
                                </span>
                                <span className="text-lg text-text-secondary ">
                                    {step.text}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}