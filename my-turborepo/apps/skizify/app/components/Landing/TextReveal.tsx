import { TextReveal } from "../../../@repo/store/components/ui/text-reveal";

export function TextRevealDemo() {
  return (

            <div className="z-10 flex min-h-screen items-center justify-center rounded-2xl border bg-white dark:bg-black">
                <TextReveal
                    className="text-2xl font-bold text-red-500/90 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
                    text="At some point along the way project management tools got too complex instead of simplifying work they did the opposite So we stripped it all away and chose to organize everything by the most basic fundamental concept: time"
                />
            </div>
  );
}
