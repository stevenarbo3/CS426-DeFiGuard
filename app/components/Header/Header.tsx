import Image from 'next/image';
import Link from 'next/link';

const navButton = "text-gray-200 hover:text-white px-4 py-2 rounded-md";

export default function Header() {
    return (
        <header className="flex items-center justify-center gap-5 mb-5 bg-gray-900 p-4 shadow-md">
            <span className="text-2xl font-bold text-gray-100">
                DeFiGuard
            </span>
            {/* Placeholder Image */}
            <Image 
            src="/assets/temp-logo.png" 
            alt="carbon logo"
            width={40}
            height={40}
            className="rounded-xl"
            />
            <nav className="flex list-none">
                <li><Link className={navButton} href="/">Overview</Link></li>
                <li><Link className={navButton} href="/AssetsPage">Assets</Link></li>
                <li><Link className={navButton} href="/Wallets">Wallets</Link></li>
            </nav>
        </header>
    );
}
