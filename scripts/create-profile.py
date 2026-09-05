#!/usr/bin/env python3
"""Create a new VicRoad profile from source photo + signature PNGs."""
from __future__ import annotations

import argparse
import base64
import json
import os
import uuid
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
# GitHub Pages deployment target. The repo name is no longer hardcoded so the
# app can be served from any repo name; override either value via environment.
GITHUB_ACCOUNT = os.environ.get("VICROAD_GITHUB_ACCOUNT", "unknownrootcommand")
REPO_NAME = os.environ.get("VICROAD_REPO_NAME", "VicRoad")
HOLOGRAM = (
    "../OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/"
    "68f76fb0e5537db2ab995755/ce36f2db6_Hologram2.png"
)


def save_jpg(img: Image.Image, dest: Path, quality: int = 95) -> None:
    img.convert("RGB").save(
        dest,
        format="JPEG",
        quality=quality,
        optimize=True,
        progressive=False,
        subsampling=0,
    )


def crop_signature(img: Image.Image) -> Image.Image:
    gray = img.convert("L")
    mask = gray.point(lambda p: 0 if p > 245 else 255)
    bbox = mask.getbbox()
    return img.crop(bbox) if bbox else img


def build_payload(profile_id: str) -> dict:
    base = f"../people/{profile_id}"
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
    parser = argparse.ArgumentParser()
    parser.add_argument("--photo", type=Path, required=True)
    parser.add_argument("--signature", type=Path, required=True)
    parser.add_argument("--id", type=str, default=None, help="32-char hex profile id")
    args = parser.parse_args()

    profile_id = (args.id or uuid.uuid4().hex).replace("-", "")
    if len(profile_id) != 32:
        raise SystemExit("Profile id must be 32 hex characters")

    photo_src = args.photo.resolve()
    sig_src = args.signature.resolve()
    if not photo_src.is_file():
        raise SystemExit(f"Missing photo: {photo_src}")
    if not sig_src.is_file():
        raise SystemExit(f"Missing signature: {sig_src}")

    out_dir = ROOT / "people" / profile_id
    out_dir.mkdir(parents=True, exist_ok=True)

    save_jpg(Image.open(photo_src), out_dir / "photo.jpg")
    save_jpg(crop_signature(Image.open(sig_src)), out_dir / "signature.jpg")

    profile_json = ROOT / "profiles" / f"{profile_id}.json"
    payload = build_payload(profile_id)
    profile_json.write_text(
        json.dumps(
            {"vr1": base64.b64encode(json.dumps(payload).encode("utf-8")).decode("ascii")}
        ),
        encoding="utf-8",
    )

    print("PROFILE_ID=" + profile_id)
    print(f"people/{profile_id}/photo.jpg")
    print(f"people/{profile_id}/signature.jpg")
    print(f"profiles/{profile_id}.json")
    print(
        f"URL: https://{GITHUB_ACCOUNT}.github.io/{REPO_NAME}/?id="
        + profile_id
    )


if __name__ == "__main__":
    main()
