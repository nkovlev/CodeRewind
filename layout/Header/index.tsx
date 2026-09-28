'use client'

import React, { useEffect } from 'react';
import Image from "next/image";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { RootState } from "@/store/store";
import DroppedMenu from "@/components/dropdown-menu";
import { usePathname } from 'next/navigation';

const Header = () => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        console.log("auth user:", user, "isAuthenticated:", isAuthenticated);
    }, [user, isAuthenticated]);

    const pathname = usePathname();


    return (
        <div className="w-full bg-transparent flex justify-between items-center text-white">
            <Link href="/">
                <Image src="/logo.png" alt="logo" width={100} height={100} />
            </Link>
            {isAuthenticated ? (
                <div className="flex gap-3 items-center">

                    {pathname !== '/repositories' && (
                        <Button variant={"outline"}>
                            <Link href="/repositories">Repositories</Link>
                        </Button>
                    )}
                    <Button variant={"outline"}>
                        <Link href="/auth">Analytics</Link>
                    </Button>
                    <DroppedMenu userPhoto={user?.photoURL ?? undefined} />
                </div>
            ) : (
                <Button variant={"outline"}>
                    <Link href="https://github.com/nkovlev/CodeRewind" target={'_blank'}>GitHub</Link>
                </Button>
            )}
        </div>
    );
};

export default Header;