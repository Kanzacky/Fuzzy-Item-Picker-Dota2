export interface Item {
    name: string;
    role: string;
    price: number;
    image: string;
}

const ITEMS_CACHE_KEY = "dota2_items_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function getItems(): Promise<Item[]> {
    if (typeof window !== "undefined") {
        const cached = localStorage.getItem(ITEMS_CACHE_KEY);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                return data;
            }
        }
    }

    try {
        const res = await fetch("/analyzer/items_c45_ready.csv", {
            headers: { "Cache-Control": "public, max-age=86400" },
        });
        if (!res.ok) throw new Error("Failed to load CSV");

        const text = await res.text();
        const lines = text.split("\n").map(l => l.trim()).filter(l => l !== "");
        const headers = lines[0].split(",").map(h => h.trim());

        const loadedItems: Item[] = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(",");
            const row: Record<string, string> = {};
            headers.forEach((h, idx) => {
                row[h] = (values[idx] || "").trim();
            });

            if (!row.item_name || !row.official_image_url) continue;

            loadedItems.push({
                name: row.item_name,
                role: row.Item_Role || "utility",
                price: Number(row.Price) || 0,
                image: row.official_image_url,
            });
        }

        if (typeof window !== "undefined") {
            localStorage.setItem(ITEMS_CACHE_KEY, JSON.stringify({
                data: loadedItems,
                timestamp: Date.now(),
            }));
        }

        return loadedItems;
    } catch (err) {
        console.error("Error fetching items:", err);
        return [];
    }
}

export function high(v: number | string): number {
    const x = Number(v);
    if (isNaN(x)) return 0;
    if (x <= 5) return 0;
    if (x >= 8) return 1;
    return (x - 5) / 3;
}

export function calculateScores(
    items: Item[],
    formData: Record<string, number | string>
): Record<string, number> {
    const scores: Record<string, number> = {};

    items.forEach((item) => {
        let s = 0;

        if (formData.q1_burst === "yes" && item.role === "damage") s += 5;
        if (formData.q2_defense === "yes" && item.role === "survivability") s += 3;
        s += high(formData.q3_crit) * (item.role === "damage" ? 2 : 0);
        s += high(formData.q4_agility) * (item.role === "agility_carry" ? 3 : 0);
        s += high(formData.q5_tank) * (item.role === "survivability" ? 3 : 0);
        if (item.name.toLowerCase().includes("king bar")) {
            s += high(formData.q6_magic_immunity) * 6;
        }
        if (formData.q7_anti_evasion === "yes" && item.role === "utility") s += 2;
        s += high(formData.q8_cc) * (item.role === "utility" ? 3 : 0);
        s += high(formData.q9_attack_speed) * (item.role === "agility_carry" ? 3 : 0);
        s += high(formData.q10_stat) * (item.role === "utility" ? 2 : 0);
        s += Math.max(0, 1 - item.price / 7000);

        scores[item.name] = s;
    });

    return scores;
}

export function getTopItems(items: Item[], scores: Record<string, number>, count = 6): Item[] {
    return [...items]
        .sort((a, b) => (scores[b.name] || 0) - (scores[a.name] || 0))
        .slice(0, count);
}