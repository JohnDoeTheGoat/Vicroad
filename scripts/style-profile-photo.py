#!/usr/bin/env python3
"""Match 3db951 photo background to 8f2c9a1e reference + subtle shadow."""
from __future__ import annotations

from io import BytesIO
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
REF = ROOT / "people" / "8f2c9a1e4b7d46e3a5c08f91d2e6b4a0" / "photo.png"
ORIG = Path(
    r"C:\Users\Harvey2\.cursor\projects\c-Users-Harvey2-Desktop-Programs-VicRoad-mainedited\assets"
) / (
    "c__Users_Harvey2_AppData_Roaming_Cursor_User_workspaceStorage_8279efaa053d6deb996b58f82084a338_"
    "images_photo-edba658d-01c3-4c93-b384-c35ddf43d520.png"
)
OUT = ROOT / "people" / "3db95159005b48e7a875bd30aa7a0ad4" / "photo.jpg"


def reference_bg_rgb(ref: np.ndarray) -> tuple[int, int, int]:
    h = ref.shape[0]
    top = ref[: max(1, int(h * 0.14)), :]
    bright = top[
        (top[:, :, 0] > 185) & (top[:, :, 1] > 195) & (top[:, :, 2] > 205)
    ]
    if len(bright) < 50:
        bright = top.reshape(-1, 3)
    med = np.median(bright, axis=0).astype(int)
    return int(med[0]), int(med[1]), int(med[2])


def remove_background(src: Image.Image) -> Image.Image:
    from rembg import remove

    buf = BytesIO()
    src.save(buf, format="PNG")
    out = remove(buf.getvalue())
    return Image.open(BytesIO(out)).convert("RGBA")


def composite_with_shadow(cutout: Image.Image, bg: tuple[int, int, int]) -> Image.Image:
    w, h = cutout.size
    pad = 16
    canvas = Image.new("RGBA", (w + pad * 2, h + pad * 2), (*bg, 255))

    alpha = cutout.split()[3]
    shadow_a = alpha.filter(ImageFilter.GaussianBlur(12))
    shadow = Image.new("RGBA", (w, h), (52, 62, 72, 0))
    shadow.putalpha(shadow_a.point(lambda p: int(p * 0.34)))
    canvas.paste(shadow, (pad + 4, pad + 7), shadow)
    canvas.paste(cutout, (pad, pad), cutout)

    out = Image.new("RGB", (w, h), bg)
    left = (canvas.width - w) // 2
    top = (canvas.height - h) // 2
    crop = canvas.crop((left, top, left + w, top + h))
    out.paste(crop.convert("RGB"), (0, 0), crop.split()[3])
    return out


def main() -> None:
    src_path = ORIG if ORIG.is_file() else OUT
    ref = np.array(Image.open(REF).convert("RGB"))
    src = Image.open(src_path).convert("RGB")
    bg = reference_bg_rgb(ref)
    cutout = remove_background(src)
    result = composite_with_shadow(cutout, bg)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    result.save(OUT, format="JPEG", quality=95, optimize=True, progressive=False)
    print(f"Source: {src_path}")
    print(f"Background RGB: {bg}")
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
