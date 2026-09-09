"use client";

import { useState, useEffect, use, useRef, useCallback } from "react";
import Image from "next/image";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { heroRegistry } from "@/data/heroRegistry";
import { notFound } from "next/navigation";
import { getItems, calculateScores, getTopItems, Item } from "@/lib/items";

interface Scores {
    [key: string]: number;
}

function AnalyzerContent({ heroName }: { heroName: string }) {
    const hero = heroRegistry[heroName.toLowerCase().replace(/\s+/g, "")];
    const resultsRef = useRef<HTMLDivElement>(null);

    const [items, setItems] = useState<Item[]>([]);
    const [results, setResults] = useState<Item[]>([]);
    const [scores, setScores] = useState<Scores>({});
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        q1_burst: "",
        q2_defense: "",
        q3_crit: "",
        q4_agility: "",
        q5_tank: 5,
        q6_magic_immunity: 5,
        q7_anti_evasion: "",
        q8_cc: "",
        q9_attack_speed: 5,
        q10_stat: 5,
    });

    useEffect(() => {
        let mounted = true;
        getItems().then((loadedItems) => {
            if (mounted) {
                setItems(loadedItems);
                setIsLoading(false);
            }
        });
        return () => { mounted = false; };
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "range" ? Number(value) : value,
        }));
    }, []);

    const calculateResults = useCallback(() => {
        if (items.length === 0) {
            alert("Sedang memuat data item, mohon tunggu sebentar...");
            return;
        }

        const newScores = calculateScores(items, formData);
        const bestItems = getTopItems(items, newScores);

        setScores(newScores);
        setResults(bestItems);

        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    }, [items, formData]);

    if (!hero) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white font-cinzel">
            <header id="header" className="relative min-h-[100vh] overflow-hidden bg-black">
                <Image
                    src={hero.bannerImg}
                    id="banner-image"
                    alt={`${hero.name} banner`}
                    fill
                    priority
                    sizes="100vw"
                    className={`object-cover z-0 brightness-[0.6] ${hero.bannerPos || "object-center"}`}
                />
                <div className="relative z-10 pb-[100px]">
                    <Navbar />

                    <div className="mt-[60px] md:mt-[100px] mx-[20px] md:ml-[80px] md:mx-0 text-center md:text-left">
                        <p className="text-accent-gold font-cinzel tracking-[2px] font-bold uppercase transition-colors hover:text-white cursor-default">{hero.title}</p>
                        <h1 className="font-cinzel text-[40px] md:text-[60px] my-[10px]">{hero.name}</h1>
                        <h4 className="text-[18px] font-bold mb-2">{hero.subtitle}</h4>
                        <p className="text-[#ccc] max-w-2xl leading-relaxed whitespace-pre-line">
                            {hero.description}
                        </p>
                    </div>

                    <div className="mx-[20px] md:ml-[80px] md:mx-0 mt-[40px] text-center md:text-left">
                        <h4 className="font-bold mb-4 font-cinzel tracking-wider">ABILITIES</h4>
                        <div className="flex flex-wrap justify-center md:justify-start gap-[15px]">
                            {hero.abilities.map((ability, idx) => (
                                <Image
                                    key={idx}
                                    src={ability}
                                    alt="ability icon"
                                    width={60}
                                    height={60}
                                    sizes="60px"
                                    className="w-[60px] h-[60px] border border-accent-gold object-cover"
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <div className="px-[20px] md:px-[80px] py-[60px] bg-dark-bg">
                <div className="text-center mb-[40px] font-cinzel text-[24px] text-accent-gold border-b border-border-dark pb-[20px]">
                    <span>{hero.name} ITEM ANALYZER</span>
                </div>

                {isLoading ? (
                    <div className="max-w-4xl mx-auto text-center py-20">
                        <div className="inline-block w-8 h-8 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-[#ccc]">Memuat data item...</p>
                    </div>
                ) : (
                    <>
                        <form id="fuzzyForm" className="max-w-4xl mx-auto">
                            <div className="bg-[#111] p-[20px] border border-border-dark mb-[20px] rounded-[4px]">
                                <label className="block mb-[15px] text-[16px]">1. Apakah kamu membutuhkan burst damage instan untuk menghabisi lawan?</label>
                                <div className="flex gap-[20px]">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="q1_burst" value="yes" onChange={handleInputChange} className="accent-accent-gold w-4 h-4" /> Iya
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="q1_burst" value="no" onChange={handleInputChange} className="accent-accent-gold w-4 h-4" /> Tidak
                                    </label>
                                </div>
                            </div>

                            <div className="bg-[#111] p-[20px] border border-border-dark mb-[20px] rounded-[4px]">
                                <label className="block mb-[15px] text-[16px]">2. Apakah kamu sering diserang dan membutuhkan pertahanan ekstra?</label>
                                <div className="flex gap-[20px]">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="q2_defense" value="yes" onChange={handleInputChange} className="accent-accent-gold w-4 h-4" /> Iya
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="q2_defense" value="no" onChange={handleInputChange} className="accent-accent-gold w-4 h-4" /> Tidak
                                    </label>
                                </div>
                            </div>

                            <div className="bg-[#111] p-[20px] border border-border-dark mb-[20px] rounded-[4px]">
                                <label className="block mb-[15px] text-[16px]">3. Seberapa penting critical damage bagi gaya bermainmu? (1–10)</label>
                                <select name="q3_crit" className="w-full bg-[#222] text-white border border-[#333] p-[8px] rounded focus:outline-accent-gold cursor-pointer" onChange={handleInputChange}>
                                    <option value="">Pilih level</option>
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="bg-[#111] p-[20px] border border-border-dark mb-[20px] rounded-[4px]">
                                <label className="block mb-[15px] text-[16px]">4. Seberapa butuh kamu item yang meningkatkan Agility / Evasion? (1–10)</label>
                                <select name="q4_agility" className="w-full bg-[#222] text-white border border-[#333] p-[8px] rounded focus:outline-accent-gold cursor-pointer" onChange={handleInputChange}>
                                    <option value="">Pilih level</option>
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="bg-[#111] p-[20px] border border-border-dark mb-[20px] rounded-[4px]">
                                <label className="block mb-[15px] text-[16px]">5. Seberapa tinggi kebutuhanmu terhadap ketahanan HP / Armor?</label>
                                <input type="range" min="1" max="10" name="q5_tank" className="w-full accent-accent-gold h-2 bg-[#222] rounded-lg appearance-none cursor-pointer" onChange={handleInputChange} />
                            </div>

                            <div className="bg-[#111] p-[20px] border border-border-dark mb-[20px] rounded-[4px]">
                                <label className="block mb-[15px] text-[16px]">6. Seberapa sering kamu membutuhkan Magic Immunity (BKB)?</label>
                                <input type="range" min="1" max="10" name="q6_magic_immunity" className="w-full accent-accent-gold h-2 bg-[#222] rounded-lg appearance-none cursor-pointer" onChange={handleInputChange} />
                            </div>

                            <div className="bg-[#111] p-[20px] border border-border-dark mb-[20px] rounded-[4px]">
                                <label className="block mb-[15px] text-[16px]">7. Apakah kamu butuh item untuk melawan musuh dengan evasion tinggi?</label>
                                <div className="flex gap-[20px]">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="q7_anti_evasion" value="yes" onChange={handleInputChange} className="accent-accent-gold w-4 h-4" /> Iya
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="q7_anti_evasion" value="no" onChange={handleInputChange} className="accent-accent-gold w-4 h-4" /> Tidak
                                    </label>
                                </div>
                            </div>

                            <div className="bg-[#111] p-[20px] border border-border-dark mb-[20px] rounded-[4px]">
                                <label className="block mb-[15px] text-[16px]">8. Seberapa penting kemampuan disable (Hex/Stun) bagi timmu? (1–10)</label>
                                <select name="q8_cc" className="w-full bg-[#222] text-white border border-[#333] p-[8px] rounded focus:outline-accent-gold cursor-pointer" onChange={handleInputChange}>
                                    <option value="">Pilih level</option>
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="bg-[#111] p-[20px] border border-border-dark mb-[20px] rounded-[4px]">
                                <label className="block mb-[15px] text-[16px]">9. Seberapa butuh kamu attack speed tinggi di mid/late game?</label>
                                <input type="range" min="1" max="10" name="q9_attack_speed" className="w-full accent-accent-gold h-2 bg-[#222] rounded-lg appearance-none cursor-pointer" onChange={handleInputChange} />
                            </div>

                            <div className="bg-[#111] p-[20px] border border-border-dark mb-[20px] rounded-[4px]">
                                <label className="block mb-[15px] text-[16px]">10. Seberapa penting item dengan atribut lengkap (Str/Agi/Int)?</label>
                                <input type="range" min="1" max="10" name="q10_stat" className="w-full accent-accent-gold h-2 bg-[#222] rounded-lg appearance-none cursor-pointer" onChange={handleInputChange} />
                            </div>

                            <button type="button" onClick={calculateResults} className="block w-full p-[15px] bg-accent-gold text-black font-bold border-none cursor-pointer font-cinzel text-[18px] mt-[30px] transition-transform hover:scale-[1.01] duration-300">
                                ANALYZE ITEMS
                            </button>
                        </form>

                        <div ref={resultsRef}>
                            {results.length > 0 && (
                                <div id="fuzzyResults" className="mt-[40px]">
                                    <h3 className="font-cinzel text-accent-gold text-center text-3xl mb-8 uppercase tracking-widest">HASIL REKOMENDASI ITEM</h3>
                                    <div className="flex flex-wrap gap-[20px] justify-center mt-[20px]">
                                        {results.map((item, idx) => (
                                            <div className="w-[180px] border border-accent-gold p-[15px] bg-[#111] text-center rounded transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(195,139,95,0.3)]" key={item.name}>
                                                <Image
                                                    src={item.image}
                                                    width={70}
                                                    height={70}
                                                    sizes="70px"
                                                    alt={item.name}
                                                    className="mb-4 mx-auto"
                                                    style={{ objectFit: "contain" }}
                                                    loading="lazy"
                                                />
                                                <h4 className="text-accent-gold mt-[10px] font-bold text-lg">{item.name}</h4>
                                                <p className="text-[#ccc] text-[12px] mt-1 font-semibold uppercase tracking-tighter">Role: {item.role}</p>
                                                <p className="text-[#aaa] text-[12px] mt-1 border-t border-border-dark pt-2">Score: {(scores[item.name] || 0).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default function HeroAnalyzer({ params }: { params: Promise<{ heroName: string }> }) {
    const { heroName } = use(params);

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black text-white font-cinzel flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-10 h-10 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-[#ccc]">Memuat analyzer...</p>
                </div>
            </div>
        }>
            <AnalyzerContent heroName={heroName} />
        </Suspense>
    );
}