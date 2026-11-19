import React from 'react';
import Link from "next/link";
import {MdOutlineArrowOutward} from "react-icons/md";

interface ContributorsProps {
    contributors: Array<any>;
    contributorsCount: number;
    months: number;
}

const ContributorsComponent = (data:ContributorsProps) => {
    return (
        <div className="flex flex-col w-full h-full gap-4">
            <div className="flex flex-col gap-3 mt-4">
                <h1 className="font-geist font-semibold text-[28px] leading-9">The Builders</h1>
                <p className="text-text-secondary font-geist text-lg">
                    Crafted with care by {data.contributorsCount} developers over {data.months} months of indie building.
                </p>
            </div>
            <div className="flex flex-wrap gap-4">
                    {data.contributors.map((contributor: any) => (
                        <div key={contributor.id} className="flex w-[472px] p-4 h-[72px] bg-surface/70 border border-white/10 items-center rounded-lg">
                            <img src={contributor.avatar_url} alt={contributor.login} className="size-[44px] rounded-full mr-4" />
                            <div className="flex flex-col gap-1">
                                <Link href={contributor.html_url} target={'_blank'} className="hover:text-primary-hover flex items-center gap-1 text-text font-geist font-normal text-[15px] leading-[23.3px] ">
                                    <span>{contributor.login}</span>
                                    <MdOutlineArrowOutward size={12}/>
                                </Link>
                                <span className="font-jetbrains leading-[17px] text-[12px] text-text-muted">{contributor.contributions} commits</span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ContributorsComponent;