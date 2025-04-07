import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  business: string;
}

export const ProductCard = ({
  name,
  description,
  price,
  image,
  category,
  business,
}: ProductCardProps) => {
  return (
    <Card className="group h-full flex flex-col bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative w-full pt-[75%] overflow-hidden rounded-t-xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardHeader className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <CardTitle className="text-lg font-montserrat text-[#2E4057] font-semibold group-hover:text-[#048BA8] transition-colors duration-300">
              {name}
            </CardTitle>
            <p className="text-sm text-[#2E4057]/70 font-opensans">
              {business}
            </p>
          </div>
          <span className="px-4 py-2 bg-[#048BA8]/10 rounded-lg font-montserrat text-lg font-semibold text-[#048BA8]">
            ${price.toLocaleString('es-CO')}
          </span>
        </div>
        <CardDescription className="text-sm font-opensans text-[#2E4057]/80 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className="inline-block px-3 py-1 text-xs font-opensans bg-[#F4F4F8] text-[#2E4057] rounded-full">
          {category}
        </span>
      </CardContent>
      <CardFooter className="pt-4 border-t border-[#E1E1E8]">
        <Button 
          variant="outline" 
          fullWidth 
          className="bg-white border-[#048BA8] text-[#048BA8] hover:bg-[#048BA8] hover:text-white transition-all duration-300"
        >
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  );
}; 