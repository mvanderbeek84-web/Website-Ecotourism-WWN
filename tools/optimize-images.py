#!/usr/bin/env python3
"""Make light AVIF copies of the site photos (run after adding or changing a photo).

    python3 tools/optimize-images.py          # make/refresh AVIFs that are missing or out of date
    python3 tools/optimize-images.py --check  # only report what is missing or out of date

For every  assets/img/<name>-l.jpg  it writes  assets/img/avif/<name>-480/-800/-1200/-1800.avif
(long edge in pixels; never larger than the JPG). The hero gets a 2400 version too.
A copy is redone automatically when its JPG changes (tracked by a checksum in
assets/img/avif/checksums.json). The page falls back to the JPG by itself if an AVIF is missing.
Needs Python 3 with Pillow 11 or newer (pip install pillow).
"""
import hashlib, json, os, sys, glob
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "assets", "img")
OUT = os.path.join(IMG, "avif")
SUMS = os.path.join(OUT, "checksums.json")
SIZES = [480, 800, 1200, 1800]
QUALITY = 60          # AVIF 60 looks the same as the JPGs at about 25-40% smaller files
SETTINGS = "q%d-v1" % QUALITY

def sha(path):
    return hashlib.sha1(open(path, "rb").read()).hexdigest()

def main():
    check = "--check" in sys.argv
    os.makedirs(OUT, exist_ok=True)
    sums = json.load(open(SUMS)) if os.path.exists(SUMS) else {}
    todo, wanted = [], set()
    for jpg in sorted(glob.glob(os.path.join(IMG, "*-l.jpg"))):
        name = os.path.basename(jpg)[:-6]
        sizes = SIZES + ([2400] if name.startswith("hero-") else [])
        outs = [os.path.join(OUT, "%s-%d.avif" % (name, s)) for s in sizes]
        wanted.update(os.path.basename(o) for o in outs)
        key = sha(jpg) + "/" + SETTINGS
        if sums.get(name) != key or not all(os.path.exists(o) for o in outs):
            todo.append((name, jpg, sizes, outs, key))
    stale = [f for f in os.listdir(OUT) if f.endswith(".avif") and f not in wanted]
    if check:
        for t in todo: print("needs update:", t[0])
        for f in stale: print("no longer used:", f)
        print("OK" if not todo else "%d photo(s) need updating" % len(todo))
        sys.exit(1 if todo else 0)
    for name, jpg, sizes, outs, key in todo:
        src = Image.open(jpg).convert("RGB")
        for s, out in zip(sizes, outs):
            im = src.copy()
            if max(im.size) > s:
                im.thumbnail((s, s), Image.LANCZOS)
            im.save(out, "AVIF", quality=QUALITY, speed=6)
        sums[name] = key
        print("made", name)
    for f in stale:
        os.remove(os.path.join(OUT, f)); print("removed", f)
    for n in list(sums):
        if not os.path.exists(os.path.join(IMG, n + "-l.jpg")): del sums[n]
    json.dump(sums, open(SUMS, "w"), indent=1, sort_keys=True)
    print("done: %d updated" % len(todo))

if __name__ == "__main__":
    main()
