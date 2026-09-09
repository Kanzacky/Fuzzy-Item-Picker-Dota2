export interface HeroData {
    id: string;
    name: string;
    title: string;
    subtitle: string;
    description: string;
    bannerImg: string;
    bannerPos?: string;
    abilities: string[];
}

export const heroRegistry: Record<string, HeroData> = {
    "lina": {
        id: "lina",
        name: "LINA",
        title: "Fiery Soul",
        subtitle: "Increases attack and speed with every spell",
        description: "As deadly as she is fragile, Lina effortlessly strike down any foe foolish enough to be caught alone. Gaining attack speed with each spell she casts, she scours enemies with flame and heat lightning ensuring few can survive her assaults.",
        bannerImg: "/file2/lina.jpg",
        bannerPos: "object-top",
        abilities: [
            "/analyzer/dragon_slave.png",
            "/analyzer/fiery_soul.png",
            "/analyzer/light_strike_array.png",
            "/analyzer/laguna_blade.png"
        ]
    }
};

const otherHeroes = [
    "Alchemist", "Blood Seeker", "Brewmaster", "Bristleback", "Centaur Warrunner",
    "Chaos Knight", "Clinkz", "Crystal Maiden", "Dark Seer", "Dark Willow",
    "Dawnbreaker", "Dazzle", "Death Prophet", "Disruptor", "Doom Bringer",
    "Dragon Knight", "Drow Ranger", "Earth Spirit", "Earthshaker", "Elder Titan",
    "Ember Spirit", "Enchantress", "Enigma", "Grimstroke", "Gyrocopter",
    "Hoodwink", "Phantom Lancer", "Pudge", "abaddon", "antimage",
    "arcwarden", "axe", "bane", "batrider", "beastmaster",
    "bountyhunter", "chen", "clockwerk", "facelessvoid", "jugernaut"
];

otherHeroes.forEach(name => {
    const id = name.toLowerCase().replace(/\s+/g, "");
    if (!heroRegistry[id]) {
        heroRegistry[id] = {
            id,
            name: name.toUpperCase(),
            title: "Dota 2 Hero",
            subtitle: "Strategic analysis and item build recommendations",
            description: `${name} is a powerful hero in Dota 2. This analyzer helps you find the perfect items to dominate the battlefield and lead your team to victory.`,
            bannerImg: `/imghero/${name.replace(/\s+/g, "%20")}.jpeg`, // Use portrait as fallback
            bannerPos: "object-top",
            abilities: [
                "/analyzer/fire.png", // Generic placeholders
                "/analyzer/fire.png",
                "/analyzer/fire.png",
                "/analyzer/fire.png"
            ]
        };
    }
});
