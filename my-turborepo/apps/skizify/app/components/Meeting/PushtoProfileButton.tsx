"use client"
import React from 'react';
import {useRouter} from 'next/navigation';
import { useSession } from 'next-auth/react';
import { meetingsInfo_interface, UserRole } from "@repo/store/types";


const PushtoProfileButton = ({ meeting , children  } : {meeting : meetingsInfo_interface | undefined , children : React.ReactNode}) => {
    const session = useSession();
const Router = useRouter()
    return (
        <div
            className="flex items-center"
            onClick={() => {
                if (session?.data?.user.role === UserRole.USER) {
                    Router.push(`/About/${meeting?.Skizzer.id}`);
                } else {
                    Router.push(`/About/${meeting?.user.id}`);
                }
            }}
        >
            {/* Add your button content here */}
            {children}
        </div>
    );
};

export default PushtoProfileButton;