interface ProductImageProps {
  categoria: string;
  alt: string;
  img?: string;
}

/** Muestra la foto del producto. Si no existe, muestra la imagen gris de su categoría. */
export default function ProductImage({ categoria, alt, img }: ProductImageProps) {
  const respaldo = `/img/${categoria}.svg`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={img || respaldo}
      alt={alt}
      className="imagen"
      onError={(e) => { e.currentTarget.src = respaldo; }}
    />
  );
}
