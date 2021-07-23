import { ShopItem } from './shop-item.entity';
import BasketProductDto from 'src/interfaces/basketProduct.dto';
import { Injectable } from '@nestjs/common';
import { ShopProduct } from '../interfaces/shopProduct';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
  constructor(
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>,
  ) {}

  async getProducts(): Promise<ShopProduct[]> {
    return await this.shopItemRepository.find();
  }

  async getProduct(id: string): Promise<ShopProduct> {
    return await this.shopItemRepository.findOneOrFail(id);
  }

  async hasProduct(productName: string): Promise<boolean> {
    return (await this.getProducts()).some(
      (product) => product.name === productName,
    );
  }

  async getProductPrice(product: BasketProductDto): Promise<number> {
    if (!(await this.hasProduct(product.name))) {
      return 0;
    }

    const price = (await this.getProducts()).find(
      (item) => item.name === product.name,
    ).taxedPrice;

    return Math.round(price * 1.23 * product.quantity * 100) / 100;
  }

  async deleteProduct(id: string) {
    await this.shopItemRepository.delete(id);
  }

  async addProduct(product: ShopProduct): Promise<ShopProduct> {
    const newItem = new ShopItem();
    newItem.name = product.name;
    newItem.description = product.description;
    newItem.taxedPrice = product.taxedPrice;

    await this.shopItemRepository.save(newItem);

    return newItem;
  }
}
