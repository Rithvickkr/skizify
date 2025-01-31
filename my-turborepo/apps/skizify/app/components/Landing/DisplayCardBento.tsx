"use client";

import DisplayCards from "../../../@repo/store/components/ui/display-cards";
import { Card } from "../../../@/components/ui/card";
import { Rocket, Star, Zap } from "lucide-react";

export default function DisplayCardsDemo() {
    const customCards = [
        {
            icon: <Rocket className="size-5 text-blue-400" />,
            title: "Launch",
            description: "Ready for takeoff",
            date: "Today",
            iconClassName: "text-blue-500",
            titleClassName: "font-semibold text-blue-500",
            className: "[grid-area:stack] transition-all duration-500 ease-in-out hover:-translate-y-6 hover:shadow-xl before:absolute before:w-full before:h-full before:rounded-xl before:content-[''] before:bg-background/60 before:backdrop-blur-sm grayscale hover:before:opacity-0 before:transition-opacity hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            icon: <Star className="size-5 text-yellow-400" />,
            title: "Featured",
            description: "Top rated content",
            date: "2 days ago",
            iconClassName: "text-yellow-500",
            titleClassName: "font-semibold text-yellow-500",
            className: "[grid-area:stack] translate-x-8 translate-y-8 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl before:absolute before:w-full before:h-full before:rounded-xl before:content-[''] before:bg-background/60 before:backdrop-blur-sm grayscale hover:before:opacity-0 before:transition-opacity hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            icon: <Zap className="size-5 text-purple-400" />,
            title: "Trending",
            description: "Most popular this week",
            date: "Last week",
            iconClassName: "text-purple-500",
            titleClassName: "font-semibold text-purple-500",
            className: "[grid-area:stack] translate-x-16 translate-y-16 transition-all duration-500 ease-in-out hover:translate-y-8 hover:shadow-xl",
        },
    ];

    return (
        <div className="flex min-h-[350px] w-full items-center justify-center py-12">
            <div className="w-full max-w-4xl px-4">
                <Card className="relative overflow-hidden p-10 shadow-lg">
                    <div className="space-y-12">
                        <div className="space-y-3">
                            <h4 className="text-lg font-semibold">Custom Display Cards</h4>
                            <p className="text-sm text-muted-foreground">
                                Showcase your content with stacked, animated cards
                            </p>
                        </div>
                        
                        <div className="-ml-8 w-full">
                            <DisplayCards cards={customCards} />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}