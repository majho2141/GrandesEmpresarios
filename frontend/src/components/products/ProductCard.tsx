import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Product } from '@/services/api/product.service';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const {
    id,
    name,
    description,
    public_price,
    thumbnail,
    enterprise,
    category,
    discount
  } = product;

  // Calcular el precio con descuento si existe
  const finalPrice = discount > 0 
    ? public_price - (public_price * (discount / 100)) 
    : public_price;

  // Imagen por defecto si no hay thumbnail
  const imageUrl = thumbnail && thumbnail !== 'Thumbnail' 
    ? thumbnail 
    : '/products/default-product.jpg';

  return (
    <Card className="group h-full flex flex-col bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative w-full pt-[75%] overflow-hidden rounded-t-xl">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-[#F18F01] text-white font-semibold px-3 py-1 rounded-lg">
            {discount}% OFF
          </div>
        )}
      </div>
      <CardHeader className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <CardTitle className="text-lg font-montserrat text-[#2E4057] font-semibold group-hover:text-[#048BA8] transition-colors duration-300">
              {name}
            </CardTitle>
            <p className="text-sm text-[#2E4057]/70 font-opensans">
              {enterprise.name}
            </p>
          </div>
          <div className="text-right">
            {discount > 0 && (
              <p className="text-sm line-through text-[#2E4057]/50 font-opensans">
                ${public_price.toLocaleString('es-CO')}
              </p>
            )}
            <span className="px-4 py-2 bg-[#048BA8]/10 rounded-lg font-montserrat text-lg font-semibold text-[#048BA8]">
              ${finalPrice.toLocaleString('es-CO')}
            </span>
          </div>
        </div>
        <CardDescription className="text-sm font-opensans text-[#2E4057]/80 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {category && (
          <span className="inline-block px-3 py-1 text-xs font-opensans bg-[#F4F4F8] text-[#2E4057] rounded-full">
            {category.name}
          </span>
        )}
      </CardContent>
      <CardFooter className="pt-4 border-t border-[#E1E1E8]">
        <Link href={`/productos/${id}`} className="w-full">
          <Button 
            variant="outline" 
            fullWidth 
            className="bg-white border-[#048BA8] text-[#048BA8] hover:bg-[#048BA8] hover:text-white transition-all duration-300"
          >
            Ver detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}; 