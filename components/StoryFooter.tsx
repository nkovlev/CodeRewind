import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CiShare2} from "react-icons/ci";
import {MdOutlinePictureAsPdf} from "react-icons/md";
import {IoReload} from "react-icons/io5";

interface IProps {
    name: string;
    commitsNumber: number;
    long: number;
}

const StoryFooter = ({name,commitsNumber,long}: IProps) => {
    return (
        <div className="w-full h-full flex flex-col mt-16">
            <div className="flex flex-col">
                <h1 className="font-geist font-semibold text-[28px] leading-9">That’s the journey of {name.split("/")[1]}.</h1>
                <p className="text-text-secondary font-geist text-lg mb-3">Synthesized from {commitsNumber} commits and {long} months of indie building. Every line written with purpose, zero corporate fluff.</p>
                <div className="flex items-center gap-4 sm:flex-col md:flex-row">
                    <Button variant={"default"} size={"lg"} className="w-full md:w-auto">
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
                                <MdOutlinePictureAsPdf  size={20} />
                                <span>Export as PDF</span>
                            </div>
                        </Link>
                    </Button>
                    <Button variant={"outline"} size={"lg"} className="w-full md:w-auto">
                        <Link href="/repositories">
                            <div className="flex items-center gap-2">
                                <IoReload  size={20} />
                                <span>Rewind another repository</span>
                            </div>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StoryFooter;