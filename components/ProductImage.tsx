interface ProductImageProps {
  categoria: string;
  alt: string;
}

export default function ProductImage({ categoria, alt }: ProductImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/img/${categoria}.svg`} alt={alt} className="imagen" />
  );
}
