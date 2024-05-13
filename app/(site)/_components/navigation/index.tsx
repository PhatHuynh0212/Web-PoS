"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";

import Link from "next/link";
import { ModeToggle } from "@/components/switches/mode-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2 } from "lucide-react";
import { User } from "@prisma/client";

type Props = {
    user: User | null;
};

const Navigation = ({ user }: Props) => {
    const router = useRouter();

    return (
        <div className="fixed top-0 right-0 left-0 w-full bg-[#FFF] shadow-md z-50">
            <div
                className="mx-auto px-4 py-2 max-w-screen-xl"
                style={{ width: "1170px", backgroundColor: "#FFF" }}
            >
                <div className="flex items-center justify-between">
                    <a
                        href="#!"
                        className="font-semibold text-xl text-gray-900 hover:text-[#FFB900] transition-colors"
                    >
                        Group 1
                    </a>
                    <div className="flex items-center gap-3">
                        {user ? (
                            <Button
                                onClick={() => router.push("/dashboard")}
                                style={{
                                    backgroundColor: "#FFB900",
                                    color: "white",
                                    borderRadius: "99px",
                                }}
                            >
                                Dashboard
                            </Button>
                        ) : (
                            <Button
                                onClick={() => signIn("google")}
                                style={{
                                    backgroundColor: "#FFB900",
                                    color: "white",
                                    borderRadius: '99px',
                                }} 
                            >
                                Log in
                            </Button>
                        )}

                        {user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center justify-center">
                                        <Avatar>
                                            <AvatarImage
                                                src={user.image}
                                                alt="Profile"
                                            />
                                            <AvatarFallback delayMs={600}>
                                                <User2
                                                    size={32}
                                                    className="text-gray-500"
                                                />
                                            </AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        onSelect={() => signOut()}
                                        style={{ color: "gray" }} // Default text color for items
                                    >
                                        Sign out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
