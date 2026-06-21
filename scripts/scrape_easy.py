#!/usr/bin/env python3
import json, re, time, os, unicodedata, urllib.request, urllib.parse, html

BASE = "https://www.easy.com.ar/api/catalog_system/pub/products/search"
HEAD = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}
IMGDIR = "/Users/matiasnicolaszacagnino/todomaquinas/assets/productos"
os.makedirs(IMGDIR, exist_ok=True)
for f in os.listdir(IMGDIR):  # limpiar imágenes previas
    if f.endswith(".jpg"): os.remove(os.path.join(IMGDIR, f))

# (query, debe_contener, categoría, emoji, cuántos, destacar)
TERMINOS = [
    ("taladro percutor",  "taladro",     "Herramientas Eléctricas", "🔩", 2, True),
    ("amoladora angular", "amoladora",   "Herramientas Eléctricas", "⚙️", 2, True),
    ("atornillador",      "atornillador","Herramientas Eléctricas", "🪛", 1, True),
    ("sierra circular",   "sierra",      "Herramientas Eléctricas", "🪚", 1, False),
    ("lijadora",          "lijadora",    "Herramientas Eléctricas", "🟫", 1, False),
    ("caladora",          "caladora",    "Herramientas Eléctricas", "📐", 1, False),
    ("rotomartillo",      "rotomartillo","Herramientas Eléctricas", "🔨", 1, False),
    ("soldadora",         "soldadora",   "Máquinas",                "⚡", 2, True),
    ("compresor de aire", "compresor",   "Máquinas",                "💨", 1, True),
    ("hidrolavadora",     "hidrolavadora","Máquinas",               "🚿", 1, False),
    ("generador",         "generador",   "Máquinas",                "🔌", 1, False),
    ("motosierra",        "motosierra",  "Máquinas",                "🌲", 1, False),
    ("hormigonera",       "hormigonera", "Máquinas",                "🛢️", 1, False),
    ("juego de llaves",   "llave",       "Herramientas Manuales",   "🔧", 1, True),
    ("destornillador",    "destornillador","Herramientas Manuales", "🪛", 1, False),
    ("martillo",          "martillo",    "Herramientas Manuales",   "🔨", 1, False),
    ("pinza",             "pinza",       "Herramientas Manuales",   "🗜️", 1, False),
    ("nivel burbuja",     "nivel",       "Herramientas Manuales",   "📏", 1, False),
    ("cinta metrica",     "metrica",     "Herramientas Manuales",   "📐", 1, True),
    ("llave allen",       "allen",       "Herramientas Manuales",   "🔑", 1, False),
    ("tornillos",         "tornillo",    "Fijaciones",              "🔩", 1, False),
    ("tarugos",           "tarugo",      "Fijaciones",              "🧱", 1, False),
    ("mecha metal",       "mecha",       "Fijaciones",              "🦴", 1, True),
    ("carretilla",        "carretilla",  "Construcción",            "🛒", 1, False),
    ("balde albañil",     "balde",       "Construcción",            "🪣", 1, False),
    ("cuchara albañil",   "cuchara",     "Construcción",            "🧱", 1, False),
    ("rodillo pintura",   "rodillo",     "Pinturería",              "🎨", 1, False),
    ("pincel",            "pincel",      "Pinturería",              "🖌️", 1, False),
    ("cinta papel",       "papel",       "Pinturería",              "📎", 1, False),
    ("casco seguridad",   "casco",       "Seguridad",               "⛑️", 1, False),
    ("guantes",           "guante",      "Seguridad",               "🧤", 1, False),
    ("antiparras",        "antiparra",   "Seguridad",               "🥽", 1, True),
    ("protector auditivo","auditivo",    "Seguridad",               "🎧", 1, False),
    ("manguera reforzada","manguera",    "Jardín",                  "🪢", 1, False),
    ("tijera de podar",   "tijera",      "Jardín",                  "✂️", 1, False),
]

def norm(s):
    s = unicodedata.normalize("NFD", (s or "").lower())
    return "".join(c for c in s if unicodedata.category(c) != "Mn")

def fetch(term):
    # espacios como %20 (VTEX rechaza el '+')
    q = urllib.parse.quote(term)
    url = f"{BASE}?ft={q}&_from=0&_to=15"
    for intento in range(3):
        try:
            req = urllib.request.Request(url, headers=HEAD)
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.loads(r.read().decode("utf-8", "replace"))
        except Exception as e:
            if intento == 2: raise
            time.sleep(1.2)

def clean(txt):
    if not txt: return ""
    txt = html.unescape(re.sub(r"<[^>]+>", " ", txt))
    return re.sub(r"\s+", " ", txt).strip()

def descargar(url, dest):
    try:
        req = urllib.request.Request(url, headers=HEAD)
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        if len(data) < 800: return False
        with open(dest, "wb") as f: f.write(data)
        return True
    except Exception as e:
        print("   img err:", e); return False

vistos, productos, pid = set(), [], 0

for term, must, cat, emoji, cuantos, destacar in TERMINOS:
    try:
        data = fetch(term)
    except Exception as e:
        print("FALLO", term, e); continue
    must_n = norm(must)
    tomados = 0
    for p in data:
        if tomados >= cuantos: break
        prodid = p.get("productId")
        if not prodid or prodid in vistos: continue
        nombre = clean(p.get("productName"))
        if must_n not in norm(nombre):  # filtro de relevancia
            continue
        items = p.get("items") or []
        if not items: continue
        it = items[0]
        imgs = it.get("images") or []
        sellers = it.get("sellers") or []
        if not imgs or not sellers: continue
        offer = sellers[0].get("commertialOffer") or {}
        price = offer.get("Price") or 0
        listp = offer.get("ListPrice") or 0
        img_url = imgs[0].get("imageUrl")
        if price <= 0 or not img_url: continue
        pid += 1
        fname = f"p{pid}.jpg"
        if not descargar(img_url, os.path.join(IMGDIR, fname)):
            pid -= 1; continue
        vistos.add(prodid)
        marca = clean(p.get("brand")) or "Genérica"
        desc = clean(p.get("description")) or clean(p.get("metaTagDescription")) or nombre
        if len(desc) > 230: desc = desc[:227].rsplit(" ", 1)[0] + "…"
        productos.append({
            "id": pid, "nombre": nombre, "categoria": cat,
            "precio": int(round(price)),
            "precio_anterior": int(round(listp)) if listp > price else 0,
            "marca": marca, "descripcion": desc,
            "stock": (pid * 7) % 32 + 6,
            "destacado": 1 if destacar and tomados == 0 else 0,
            "emoji": emoji, "imagen": f"assets/productos/{fname}",
        })
        tomados += 1
        print(f"  ✓ [{cat[:14]:14}] {nombre[:42]:42} ${int(price)}")
    time.sleep(0.5)

# relacionados de la misma categoría
by_cat = {}
for p in productos: by_cat.setdefault(p["categoria"], []).append(p["id"])
allids = [p["id"] for p in productos]
for p in productos:
    rel = [str(i) for i in by_cat[p["categoria"]] if i != p["id"]][:3]
    for i in allids:
        if len(rel) >= 3: break
        if i != p["id"] and str(i) not in rel: rel.append(str(i))
    p["relacionados"] = ";".join(rel)

def cf(v):
    s = str(v)
    return '"' + s.replace('"', '""') + '"' if any(c in s for c in [",", '"', "\n"]) else s

cols = ["id","nombre","categoria","precio","precio_anterior","marca","descripcion","stock","destacado","emoji","imagen","relacionados"]
with open("/Users/matiasnicolaszacagnino/todomaquinas/data/productos.csv", "w", encoding="utf-8") as f:
    f.write(",".join(cols) + "\n")
    for p in productos:
        f.write(",".join(cf(p[c]) for c in cols) + "\n")

print(f"\nTOTAL: {len(productos)} productos")
print("por categoría:", {c: len(v) for c, v in by_cat.items()})
