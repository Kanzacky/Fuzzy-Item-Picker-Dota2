import json
import requests

# =========================
# KONFIGURASI
# =========================
INPUT_FILE = "dota_item_predictions.json"
OUTPUT_FILE = "items_fixed.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

SPECIAL_MAP = {
    "Eye of Skadi": "skadi",
    "Scythe of Vyse": "sheepstick",
    "Shiva's Guard": "shivas_guard"
}

# =========================
# FUNGSI
# =========================
def cek_url(url, timeout=5):
    try:
        r = requests.head(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        return r.status_code
    except requests.exceptions.RequestException:
        return None

def generate_cdn_url(item_name):
    name = item_name.lower()
    name = name.replace("'", "")
    name = name.replace(" ", "_")
    return f"https://cdn.dota2.com/apps/dota2/images/items/{name}_lg.png"

# =========================
# LOAD DATA
# =========================
with open(INPUT_FILE, "r", encoding="utf-8") as f:
    items = json.load(f)

print("🔄 Memperbaiki link gambar item Dota 2...\n")

# =========================
# PROSES PERBAIKAN
# =========================
for item in items:
    name = item["item_name"]
    old_url = item["official_image_url"]

    # 1️⃣ cek link lama
    status = cek_url(old_url)
    if status == 200:
        print(f"✅ {name:20} | OK")
        continue

    # 2️⃣ generate otomatis
    new_url = generate_cdn_url(name)
    if cek_url(new_url) == 200:
        item["official_image_url"] = new_url
        print(f"🔧 {name:20} | AUTO-GENERATED")
        continue

    # 3️⃣ special mapping
    if name in SPECIAL_MAP:
        mapped = SPECIAL_MAP[name]
        special_url = f"https://cdn.dota2.com/apps/dota2/images/items/{mapped}_lg.png"
        if cek_url(special_url) == 200:
            item["official_image_url"] = special_url
            print(f"🧠 {name:20} | SPECIAL MAP")
            continue

    # 4️⃣ gagal total
    print(f"❌ {name:20} | TIDAK DITEMUKAN")

# =========================
# SIMPAN HASIL
# =========================
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(items, f, indent=4, ensure_ascii=False)

print(f"\n✔️ Selesai! File tersimpan sebagai: {OUTPUT_FILE}")
