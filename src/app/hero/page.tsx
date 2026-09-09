"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCard from "@/components/HeroCard";

const heroesData = [
    { name: "lina", img: "/imghero/lina.jpeg" },
    { name: "bane", img: "/imghero/bane.jpeg" },
    { name: "axe", img: "/imghero/axe.jpeg" },
    { name: "arc warden", img: "/imghero/arcwarden.jpeg" },
    { name: "anti mage", img: "/imghero/antimage.jpeg" },
    { name: "alchemist", img: "/imghero/Alchemist.jpeg" },
    { name: "abaddon", img: "/imghero/abaddon.jpeg" },
    { name: "batrider", img: "/imghero/batrider.jpeg" },
    { name: "beastmaster", img: "/imghero/beastmaster.jpeg" },
    { name: "blood seeker", img: "/imghero/Blood Seeker.jpeg" },
    { name: "bounty hunter", img: "/imghero/bountyhunter.jpeg" },
    { name: "brewmaster", img: "/imghero/Brewmaster.jpeg" },
    { name: "bristleback", img: "/imghero/Bristleback.jpeg" },
    { name: "centaur warrunner", img: "/imghero/Centaur Warrunner.jpeg" },
    { name: "chaos knight", img: "/imghero/Chaos Knight.jpeg" },
    { name: "chen", img: "/imghero/chen.jpeg" },
    { name: "clinkz", img: "/imghero/Clinkz.jpeg" },
    { name: "clockwerk", img: "/imghero/clockwerk.jpeg" },
    { name: "crystal maiden", img: "/imghero/Crystal Maiden.jpeg" },
    { name: "dark seer", img: "/imghero/Dark Seer.jpeg" },
    { name: "dark willow", img: "/imghero/Dark Willow.jpeg" },
    { name: "dawnbreaker", img: "/imghero/Dawnbreaker.jpeg" },
    { name: "dazzle", img: "/imghero/Dazzle.jpeg" },
    { name: "death prophet", img: "/imghero/Death Prophet.jpeg" },
    { name: "disruptor", img: "/imghero/Disruptor.jpeg" },
    { name: "dragon knight", img: "/imghero/Dragon Knight.jpeg" },
    { name: "drow ranger", img: "/imghero/Drow Ranger.jpeg" },
    { name: "earth spirit", img: "/imghero/Earth Spirit.jpeg" },
    { name: "elder titan", img: "/imghero/Elder Titan.jpeg" },
    { name: "ember spirit", img: "/imghero/Ember Spirit.jpeg" },
    { name: "enchantress", img: "/imghero/Enchantress.jpeg" },
    { name: "pudge", img: "/imghero/Pudge.jpeg" },
    { name: "phantom lancer", img: "/imghero/Phantom Lancer.jpeg" },
    { name: "juggernaut", img: "/imghero/jugernaut.jpeg" },
    { name: "hoodwink", img: "/imghero/Hoodwink.jpeg" },
    { name: "gyrocopter", img: "/imghero/Gyrocopter.jpeg" },
    { name: "grimstroke", img: "/imghero/Grimstroke.jpeg" },
    { name: "enigma", img: "/imghero/Enigma.jpeg" },
    { name: "faceless void", img: "/imghero/facelessvoid.jpeg" },
    { name: "doom bringer", img: "/imghero/Doom Bringer.jpeg" },
];

export default function HeroPage() {
    const [search, setSearch] = useState("");

    const filteredHeroes = heroesData.filter((hero) =>
        hero.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white font-cinzel">
            <header id="header" className="h-auto min-h-[40vh] relative">
                <Navbar />

                <div className="text-center mt-[60px]">
                    <h1 className="text-[40px] font-cinzel leading-tight mb-2">CHOOSE YOUR HERO</h1>
                    <p className="text-[18px]">
                        Discover the hero that fits your playstyle and get the most
                        accurate <br />
                        item recommendations for every match. Choose wisely, build
                        strategically,
                        <br /> and dominate the battlefield.
                    </p>
                </div>
            </header>

            <section id="hero-selection" className="px-[80px] py-[20px] pb-0 bg-black">
                <div className="text-center">
                    <input
                        type="text"
                        id="hero-search"
                        placeholder="SEARCH FOR HEROES..."
                        className="px-[20px] py-[12px] w-[60%] border border-accent-gold bg-[#111] text-white text-[18px] mb-[40px] rounded-[4px] focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div id="hero" className="flex flex-wrap justify-center gap-[15px]">
                        {filteredHeroes.map((hero, idx) => (
                            <HeroCard
                                key={idx}
                                name={hero.name}
                                img={hero.img}
                                link={`/analyzer/${hero.name.toLowerCase().replace(/\s+/g, "")}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <div className="text-center p-[20px] text-[24px] text-accent-gold border-t border-[#222] bg-[#050505]">
                <p>MONTHLY PLAYER 7.257.345.34</p>
            </div>

            <div id="about" className="relative w-full py-[80px] overflow-hidden bg-black">
                <video autoPlay loop muted className="absolute top-0 left-1/2 w-full h-full object-cover object-[30%_18%] -translate-x-1/2 z-0 brightness-75">
                    <source src="/file/windranger.mp4" type="video/mp4" />
                </video>

                <div id="join" className="relative z-10 ml-[100px]">
                    <div className="about-content text-white">
                        <h1 className="text-[48px] font-cinzel mb-[20px]">
                            JOIN THE
                            <br />
                            BATTLE
                        </h1>

                        <section className="btnplay">
                            <a
                                href="https://store.steampowered.com/app/570/Dota_2/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-[20px] py-[10px] border-[3px] border-white rounded-[8px] text-white no-underline transition-all duration-300 hover:scale-105 inline-block"
                            >
                                Play Free Now
                            </a>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </div >
    );
}
