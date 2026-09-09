import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="relative z-50 flex items-center px-[60px] py-[20px] gap-[60px]">
            <Link href="/">
                <Image
                    src="/file/dota-seeklogo.png"
                    className="w-[140px] brightness-0 invert"
                    alt="dota2"
                    width={140}
                    height={40}
                    priority
                    style={{ objectFit: 'contain' }}
                />
            </Link>
            <ul className="flex gap-[25px] w-full items-center list-none">
                <li>
                    <Link href="/" className="relative text-white no-underline text-[18px] transition-all duration-250 ease-in-out hover:scale-105 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-700 hover:after:w-full">HOME</Link>
                </li>
                <li>
                    <Link href="/hero" className="relative text-white no-underline text-[18px] transition-all duration-250 ease-in-out hover:scale-105 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-700 hover:after:w-full">HERO</Link>
                </li>
                <li>
                    <Link href="/#join" className="relative text-white no-underline text-[18px] transition-all duration-250 ease-in-out hover:scale-105 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-700 hover:after:w-full">PLAY FOR FREE</Link>
                </li>
                <li className="ml-auto">
                    <Link href="/#latest-news" className="relative text-white no-underline text-[18px] transition-all duration-250 ease-in-out hover:scale-105 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-700 hover:after:w-full">NEWS</Link>
                </li>
                <li>
                    <a href="#" className="relative text-white no-underline text-[18px] transition-all duration-250 ease-in-out hover:scale-105 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-700 hover:after:w-full">THE INTERNATIONAL</a>
                </li>
            </ul>
        </nav>
    );
}
