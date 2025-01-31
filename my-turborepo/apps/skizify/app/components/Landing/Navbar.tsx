import Link from 'next/link';
import { motion } from 'framer-motion';

export const NavbarLanding = () => {

    return (
        <nav className="fixed w-full border-b  border-white/10 bg-black/40 text-white dark:text-white backdrop-blur-md shadow-sm z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            className="filter grayscale mr-2"
                            src="https://yt3.googleusercontent.com/GNt5K7oUcfQu19zcnlknUlpfFDJF1bLWhp_gFkBqkYZfXBO0pEd4L5gPeOWawOSc3UOUOHEHLw=s160-c-k-c0x00ffffff-no-rj"
                            alt=""
                            width={40}
                            height={40}
                        />
                        <Link
                            href="/explore"
                            aria-label="Explore Skizify"
                            className="text-2xl font-bold hover:underline hover:opacity-90 focus:opacity-90 transition-opacity"
                        >
                            Skizify
                        </Link>
                    </div>

                    <div className="hidden md:block">
                            <Link 
                                href="/signin" 
                                className="bg-white text-black text-sm opacity-85 hover:opacity-100 px-4 py-2 rounded-md ml-2"
                            >
                                Log In
                            </Link>
                        </div>
                    </div>

                    
                    </div>

        </nav>
    );
};

export default NavbarLanding;