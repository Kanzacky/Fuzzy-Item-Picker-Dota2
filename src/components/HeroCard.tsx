import Link from "next/link";
import Image from "next/image";

interface HeroCardProps {
    name: string;
    img: string;
    link?: string;
}

export default function HeroCard({ name, img, link }: HeroCardProps) {
    const content = (
        <Image src={img} alt={name} width={150} height={180} className="w-[150px] h-[180px] object-cover border-2 border-transparent transition-all duration-300 cursor-pointer hover:border-accent-gold hover:scale-110 hover:z-10" />
    );

    if (link) {
        return (
            <Link href={link}>
                {content}
            </Link>
        );
    }

    return content;
}
