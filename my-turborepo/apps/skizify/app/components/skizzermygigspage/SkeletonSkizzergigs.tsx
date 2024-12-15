import React from 'react';
import { Card, CardContent, CardHeader } from "../../../@/components/ui/card";
import { Separator } from "../../../@/components/ui/separator";
import { Skeleton } from '../../../@/components/ui/skeleton';

export default function CombinedSkeletons(): JSX.Element {
    return (
        <div>

            <div className='h-24'></div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <Card
                    key={index}
                    className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-800 shadow-md backdrop-blur-md transition-all duration-300 ease-in-out dark:border-black dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-lg"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-100/60 via-transparent to-neutral-200/60 opacity-0 transition-opacity duration-500 ease-in-out dark:from-neutral-800/10 dark:to-neutral-700/10" />
                    <CardHeader className="relative p-4">
                        <div className="flex items-center space-x-4">
                            <div className="h-16 w-16 rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                            <div className="flex-grow space-y-2">
                                <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                                <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                            </div>
                            <div className="h-6 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                        </div>
                    </CardHeader>
                    <Separator className="mx-4 my-2 bg-neutral-200 dark:bg-neutral-800" />
                    <CardContent className="relative space-y-4 p-4">
                        <div className="relative overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800 p-6 shadow-md animate-pulse" />
                        <Separator className="my-2 bg-neutral-200 dark:bg-neutral-800" />
                        <div className="grid grid-cols-2 gap-2 p-1 text-sm font-medium">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2 rounded-md p-2 bg-neutral-200 dark:bg-neutral-800 animate-pulse"
                                />
                            ))}
                        </div>
                    </CardContent>
                    <div className="flex items-center justify-between border-t border-neutral-200 p-4 dark:border-neutral-800">
                        <div className="h-8 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                        <div className="h-8 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                    </div>
                </Card>
            ))}
        </div>
        </div>
    );
}