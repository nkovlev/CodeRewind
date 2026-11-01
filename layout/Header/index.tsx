'use client'

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { RootState } from "@/store/store";
import { usePathname } from 'next/navigation';
import {logout} from "@/services/auth.service";
import {clearUser} from "@/store/slices/authSlice";
import {FaGithub} from "react-icons/fa6";

const Header = () => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            await logout();
            dispatch(clearUser());
        } catch (error) {
            console.error(error);
        }
    };

    if (!mounted) {
        return (
            <div className="w-full bg-transparent flex justify-between items-center text-white">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={100} height={100} />
                </Link>
                <div className="w-32 h-10" />
            </div>
        );
    }

    return (
        <div className="w-full bg-surface/80 flex justify-between items-center text-white px-14 py-4">
            <Link href="/">
                <Image src="/logo.png" alt="logo" width={100} height={100} />
            </Link>

            {isAuthenticated ? (
                <div className="flex gap-3 items-center">
                    {pathname !== '/repositories' && (
                        <Button variant="outline" asChild>
                            <Link href="/repositories">Repositories</Link>
                        </Button>
                    )}
                    <Button variant={"purple"} onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            ) : (
                <Button variant="outline" size={'lg'} asChild>
                    <div className="flex items-center gap-3">
                        <FaGithub size={20}  />
                        <Link href="https://github.com/nkovlev/CodeRewind" target="_blank">
                            GitHub
                        </Link>
                    </div>
                </Button>
            )}
        </div>
    );
};

export default Header;