import BasketProductDto from 'src/interfaces/basketProduct.dto';
import { Injectable } from '@nestjs/common';
import { ShopProduct } from '../interfaces/shopProduct';

const products = [
  {
    name: 'Pomidory',
    description: 'Super Hiszpańskie pomidory mniammmm.',
    taxedPrice: 6,
  },
  {
    name: 'Truskawki',
    description: 'Polskie truskawki. Prosto od tutejszego rolnika',
    taxedPrice: 10,
  },
  {
    name: 'Kiwi',
    description: 'Afrykańskie kiwi. Smaczne i zdrowe',
    taxedPrice: 12,
  },
];

@Injectable()
export class ShopService {
  private readonly shopProducts: ShopProduct[] = products;

  getProducts(): ShopProduct[] {
    return this.shopProducts;
  }

  getProductIndex(productName: string): number {
    return this.shopProducts.findIndex(
      (product) => product.name === productName,
    );
  }

  getProductPrice(product: BasketProductDto): number {
    const index = this.getProductIndex(product.name);

    if (index === -1) {
      return 0;
    }

    return (
      Math.round(
        this.shopProducts[index].taxedPrice * 1.23 * product.quantity * 100,
      ) / 100
    );
  }
}
