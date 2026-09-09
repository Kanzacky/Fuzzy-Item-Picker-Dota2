import Image from "next/image";

export default function Footer() {
    return (
        <footer className="text-center p-[20px]">
            <div className="flex justify-center mb-4">
                <a
                    href="https://www.valvesoftware.com/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        className="h-[45px] mx-[10px]"
                        src="/file/Valve_Corporation-Logo.wine.png"
                        alt="Valve logo"
                        width={120}
                        height={40}
                        style={{ objectFit: "contain" }}
                    />
                </a>
                <a
                    href="https://www.dota2.com/home"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        className="h-[45px] mx-[10px]"
                        src="/file/logo.png"
                        alt="Dota 2 logo"
                        width={120}
                        height={40}
                        style={{ objectFit: "contain" }}
                    />
                </a>
            </div>

            <p className="text-[12px] text-[#ccc]">
                Dota and the Dota logo are trademarks and/or registered trademarks of
                Valve Corporation.
                <br />
                2025 Valve Corporation, all rights reserved.
            </p>
        </footer>
    );
}
