"use client";
import { useRouter } from 'next/navigation';

const PushtoExplore = () => {
    const router = useRouter();

    return (
        <button
            className="flex items-center gap-2 rounded-lg bg-black hover:bg-black/75 dark:bg-white px-6 py-2 text-white dark:text-black transition-colors hover:dark:bg-zinc-200"
            onClick={async () => await router.push("/explore")}
        >
            <span className="text-sm font-medium">Schedule Meeting</span>
        </button>
    );
};

export default PushtoExplore;