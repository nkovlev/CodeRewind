import React from 'react';
import { BsPinAngleFill } from 'react-icons/bs';
import {FaLaptopCode} from "react-icons/fa";
import SideBar from "@/components/sideBar";
import Image from "next/image";
import logo from "../../public/logo.svg"


const Greeting = () => {
    return (
        <div className="h-screen flex justify-start items-start">
            <SideBar />

        </div>
    );
};

export default Greeting;