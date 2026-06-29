import { basePath } from "@/lib/site";

type PosterPictureProps = {
  name: string;
  className: string;
  width?: number;
  height?: number;
};

/** Responsive poster with a smaller WebP variant when available (see scripts/optimize-posters.cjs). */
export default function PosterPicture({ name, className, width, height }: PosterPictureProps) {
  const stem = name.replace(/\.webp$/i, "");
  const dir = `${basePath}/resources/poster_images`;

  return (
    <picture>
      <source srcSet={`${dir}/${stem}_540w.webp`} type="image/webp" />
      <img
        src={`${dir}/${name}`}
        alt=""
        width={width}
        height={height}
        decoding="async"
        loading="lazy"
        className={className}
      />
    </picture>
  );
}
