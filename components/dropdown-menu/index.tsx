'use client'

import React from 'react';
import { useDispatch } from "react-redux";
import { IoLogOutOutline, IoSettings } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/auth.service";
import { clearUser } from "@/store/slices/authSlice";

interface DroppedMenuProps {
    userPhoto?: string;
}

const DroppedMenu = ({ userPhoto }: DroppedMenuProps) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(clearUser());
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Avatar>
                    <AvatarImage src={userPhoto} />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            } />
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <FaUser />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <IoSettings />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                    <IoLogOutOutline />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DroppedMenu;