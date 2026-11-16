import { cld, cldSrcSet } from "@/lib/cloudinary";
import type { Photo } from "@/lib/content/sample";

/** Cloudinary photograph that fills its (relatively positioned) parent. */
export function CldImg({
  photo,
  sizes = "100vw",
  priority = false,
  contain = false,
  className = "",
  alt,
}: {
  photo: Photo;
  sizes?: string;
  priority?: boolean;
  contain?: boolean;
  className?: string;
  alt?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={cld(photo.publicId, 1024)}
      srcSet={cldSrcSet(photo.publicId)}
      sizes={sizes}
      alt={alt ?? photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`absolute inset-0 h-full w-full ${contain ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}
