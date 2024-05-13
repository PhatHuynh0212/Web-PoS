"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, User2 } from "lucide-react";
import { ModeToggle } from "@/components/switches/mode-toggle";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { UserWithNotification } from "@/type";
// import { Button } from "react-day-picker";
import { Button } from "@/components/ui/button";

type Props = {
    notifications: UserWithNotification[];
    className?: string;
    user: User;
};

const InfoBar = ({ notifications, className, user }: Props) => {
    return (
        <>
            <div
                className={twMerge(
                    "sticky w-full z-[20] top-0 p-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b-[1px] ",
                    className
                )}
                style={{ backgroundColor: "#FFFCF4" }}
            >
                
                <div className="flex items-center gap-2 ml-auto">
                    <Avatar>
                        <AvatarImage src={user.image} />
                        <AvatarFallback>
                            <User2 />
                        </AvatarFallback>
                    </Avatar>
                    <Button
                        onClick={() => signOut()}
                        style={{
                            backgroundColor: "#FFB900",
                            color: "white",
                            borderRadius: "99px",
                        }} // Login button with theme color
                    >
                        Sign out
                    </Button>
                </div>
            </div>
        </>
    );
};

export default InfoBar;
