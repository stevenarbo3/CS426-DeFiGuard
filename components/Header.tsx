import Image from 'next/image';
import Link from 'next/link';

const navButton = "text-gray-200 hover:text-white px-4 py-2 rounded-md";

export default function Header() {
    return (
        <header className="flex items-center justify-center gap-5 bg-gray-900 p-4 shadow-md">
            <Link href="/" className="text-2xl font-bold text-gray-100 hover:text-white">
                 DeFiGuard
            </Link>
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
                <li><Link className={navButton} href="/assets_page">Assets</Link></li>
                <li><Link className={navButton} href="/wallets">Wallets</Link></li>
            </nav>
        </header>
    );
}
