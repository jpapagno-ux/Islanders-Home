"use client";

import { CldImg } from "@/components/site/CldImg";
import type { Photo } from "@/lib/content/sample";
import { useEffect, useRef, useState } from "react";

export type GalleryPhoto = Photo;

const CATEGORIES = ["All", "Exterior", "Interior", "Waterfront", "Pool", "Lifestyle", "Floorplans"];

export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [cat, setCat] = useState("All");
  const [light, setLight] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);
  const shown = photos.filter((p) => cat === "All" || p.category === cat);
  const current = light !== null && shown.length ? shown[((light % shown.length) + shown.length) % shown.length] : null;

  useEffect(() => {
    if (light === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLight(null);
      if (e.key === "ArrowRight") setLight((i) => (i === null ? i : i + 1));
      if (e.key === "ArrowLeft") setLight((i) => (i === null ? i : i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [light]);

  const scroll = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });
  const arrow = "h-[52px] w-[52px] cursor-pointer border border-ocean text-[20px] text-ocean hover:bg-ocean hover:text-paper";

  return (
    <div>
      <div className="wrap">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="eyebrow">Gallery</div>
            <div className="rule" />
            <h2 className="display">
              The house, <em>room by room.</em>
            </h2>
          </div>
          <div className="flex gap-2.5">
            <button type="button" className={arrow} aria-label="Previous photographs" onClick={() => scroll(-1)}>
              ←
            </button>
            <button type="button" className={arrow} aria-label="Next photographs" onClick={() => scroll(1)}>
              →
            </button>
          </div>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => {
                setCat(c);
                setLight(null);
              }}
              className={`min-h-[44px] cursor-pointer border border-ocean px-4 text-[12px] font-semibold uppercase tracking-[0.16em] ${cat === c ? "bg-ocean text-paper" : "text-ocean"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div ref={rail} className="rail flex gap-3.5 overflow-x-auto px-[clamp(20px,5vw,64px)] pb-4">
        {shown.map((p, i) => (
          <button
            key={p.publicId}
            type="button"
            aria-label={`Open full screen: ${p.alt}`}
            onClick={() => setLight(i)}
            className="zoom relative aspect-[3/2] flex-[0_0_clamp(280px,62vw,760px)] cursor-zoom-in bg-seaglass"
          >
            <CldImg photo={p} sizes="(max-width: 768px) 80vw, 760px" />
            <span className="label absolute bottom-0 left-0 bg-paper px-3.5 py-2 text-ocean">{p.category}</span>
          </button>
        ))}
        {shown.length === 0 && (
          <div className="flex min-h-[240px] flex-[1_1_100%] items-end bg-sand p-8 font-serif text-[26px] text-ocean">
            No photographs in this category yet.
          </div>
        )}
      </div>
      <p className="wrap text-[13px]">Swipe on a phone, or use the arrows. Tap a photograph to open it full screen.</p>

      {current && (
        <div role="dialog" aria-modal="true" aria-label="Full-screen gallery" className="fixed inset-0 z-50 flex flex-col bg-[rgba(20,40,46,0.96)]">
          <div className="label flex items-center justify-between px-5 py-4 text-paper">
            <span>
              {shown.indexOf(current) + 1} / {shown.length} · {current.category}
            </span>
            <button type="button" className="btn btn-line-light !min-h-[44px] !px-5" onClick={() => setLight(null)} autoFocus>
              Close
            </button>
          </div>
          <div className="relative min-h-0 flex-1">
            <CldImg photo={current} sizes="100vw" contain priority />
          </div>
          <div className="flex justify-center gap-3 p-4">
            <button type="button" aria-label="Previous photograph" className="h-[52px] w-14 cursor-pointer border border-paper text-[20px] text-paper" onClick={() => setLight((i) => (i ?? 0) - 1)}>
              ←
            </button>
            <button type="button" aria-label="Next photograph" className="h-[52px] w-14 cursor-pointer border border-paper text-[20px] text-paper" onClick={() => setLight((i) => (i ?? 0) + 1)}>
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
