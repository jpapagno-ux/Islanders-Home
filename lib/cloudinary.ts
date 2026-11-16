const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD ?? "jhlnq5h5";

/** Cloudinary delivery URL with automatic format and quality, limited to a maximum width. */
export function cld(publicId: string, width: number) {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,c_limit,w_${width}/${publicId}`;
}

const WIDTHS = [480, 768, 1024, 1600, 2400];

export function cldSrcSet(publicId: string) {
  return WIDTHS.map((w) => `${cld(publicId, w)} ${w}w`).join(", ");
}
