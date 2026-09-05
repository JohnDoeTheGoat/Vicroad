#!/usr/bin/env python3
"""Re-export profile images from source PNGs and refresh obfuscated vr1."""
from __future__ import annotations

import base64
import json
from pathlib import Path

from PIL import Image

PROFILE_ID = "3db95159005b48e7a875bd30aa7a0ad4"
ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(
    r"C:\Users\Harvey2\.cursor\projects\c-Users-Harvey2-Desktop-Programs-VicRoad-mainedited\assets"
)
PHOTO_SRC = ASSETS / (
    "c__Users_Harvey2_AppData_Roaming_Cursor_User_workspaceStorage_8279efaa053d6deb996b58f82084a338_"
    "images_photo-edba658d-01c3-4c93-b384-c35ddf43d520.png"
)
SIG_SRC = ASSETS / (
    "c__Users_Harvey2_AppData_Roaming_Cursor_User_workspaceStorage_8279efaa053d6deb996b58f82084a338_"
    "images_signature-9639f748-378e-4ad1-8f17-07751e73d385.png"
)
OUT_DIR = ROOT / "people" / PROFILE_ID
PROFILE_JSON = ROOT / "profiles" / f"{PROFILE_ID}.json"
HOLOGRAM = (
    "../OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/"
    "68f76fb0e5537db2ab995755/ce36f2db6_Hologram2.png"
)


def save_jpg(img: Image.Image, dest: Path, quality: int = 95) -> None:
    rgb = img.convert("RGB")
    rgb.save(
        dest,
        format="JPEG",
        quality=quality,
        optimize=True,
        progressive=False,
        subsampling=0,
    )


def crop_signature(img: Image.Image) -> Image.Image:
    gray = img.convert("L")
    # Treat near-white as background; keep dark ink.
    mask = gray.point(lambda p: 0 if p > 245 else 255)
    bbox = mask.getbbox()
    if not bbox:
        return img
    return img.crop(bbox)


def build_payload() -> dict:
    base = f"../people/{PROFILE_ID}"
    photo = f"{base}/photo.jpg"
    signature = f"{base}/signature.jpg"
    return {
        "paste_selector": (
            "div.w-full.h-full.flex.items-center.justify-center.text-gray-400.bg-gray-200"
        ),
        "paste_index": 0,
        "paste_photo_url": photo,
        "licence_photo_url": photo,
        "photo_url": photo,
        "target_filename": "b83abeb89_IMG_6942.jpg",
        "replacements": {
            "b83abeb89_IMG_6942.jpg": photo,
            "462aab022_IMG_6942.jpg": photo,
        },
        "hologram_url": HOLOGRAM,
        "signature_photo_url": signature,
    }


def main() -> None:
    if not PHOTO_SRC.is_file():
        raise SystemExit(f"Missing source photo: {PHOTO_SRC}")
    if not SIG_SRC.is_file():
        raise SystemExit(f"Missing source signature: {SIG_SRC}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    photo = Image.open(PHOTO_SRC)
    save_jpg(photo, OUT_DIR / "photo.jpg", quality=95)

    signature = crop_signature(Image.open(SIG_SRC))
    save_jpg(signature, OUT_DIR / "signature.jpg", quality=95)

    payload = build_payload()
    PROFILE_JSON.write_text(
        json.dumps({"vr1": base64.b64encode(json.dumps(payload).encode("utf-8")).decode("ascii")}),
        encoding="utf-8",
    )

    print(f"Wrote {OUT_DIR / 'photo.jpg'} ({(OUT_DIR / 'photo.jpg').stat().st_size} bytes)")
    print(f"Wrote {OUT_DIR / 'signature.jpg'} ({(OUT_DIR / 'signature.jpg').stat().st_size} bytes)")
    print(f"Updated {PROFILE_JSON}")


if __name__ == "__main__":
    main()
