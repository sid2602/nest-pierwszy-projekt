import { ShopItemDetails } from './shop-item-details.entity';
import { ShopItem } from './shop-item.entity';
import BasketProductDto from 'src/interfaces/basketProduct.dto';
import { Injectable } from '@nestjs/common';
import {
  GetPaginatedListOfProductsResponse,
  ShopProduct,
} from '../interfaces/shopProduct';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Like, Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>,
  ) {}

  async getProducts(
    pageNumber = 1,
  ): Promise<GetPaginatedListOfProductsResponse> {
    const maxOnPage = 5;
    const currPage = pageNumber;

    const [items, count] = await ShopItem.findAndCount({
      skip: maxOnPage * (currPage - 1),
      take: maxOnPage,
      relations: ['details', 'sets'],
    });

    const pages = Math.ceil(count / maxOnPage);

    return {
      items,
      pages,
    };
  }

  async findProducts(searchTerm: string): Promise<ShopProduct[]> {
    const count = await getConnection()
      .createQueryBuilder()
      .select('COUNT(shopItem.id)', 'count')
      .from(ShopItem, 'shopItem')
      .getRawOne();

    console.log(count);

    return await getConnection()
      .createQueryBuilder()
      .select('shopItem')
      .from(ShopItem, 'shopItem')
      .where('shopItem.description LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      })
      .orderBy('shopItem.id', 'ASC')
      .getMany();
  }

  async getProduct(id: string): Promise<ShopProduct> {
    return await ShopItem.findOneOrFail(id);
  }

  async hasProduct(productName: string): Promise<boolean> {
    return (await this.getProducts()).items.some(
      (product) => product.name === productName,
    );
  }

  async getProductPrice(product: BasketProductDto): Promise<number> {
    if (!(await this.hasProduct(product.name))) {
      return 0;
    }

    const price = (await this.getProducts()).items.find(
      (item) => item.name === product.name,
    ).taxedPrice;

    return Math.round(price * 1.23 * product.quantity * 100) / 100;
  }

  async deleteProduct(id: string) {
    await ShopItem.delete(id);
  }

  async addProduct(product: ShopProduct): Promise<ShopProduct> {
    const newItem = new ShopItem();
    newItem.name = product.name;
    newItem.description = product.description;
    newItem.taxedPrice = product.taxedPrice;

    await newItem.save();

    const details = new ShopItemDetails();
    details.color = 'green';
    details.width = 20;
    details.height = 60;

    await details.save();

    newItem.details = details;

    await newItem.save();

    return newItem;
  }

  async addBoughtCounter(id: number) {
    await ShopItem.update(id, {
      wasEverBought: true,
    });
    const item = await ShopItem.findOneOrFail(id);

    item.boughtCounter++;

    await item.save();
  }
}
