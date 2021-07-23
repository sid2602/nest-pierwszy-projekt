import { ShopService } from './../shop/shop.service';
import { Inject, Injectable } from '@nestjs/common';
import BasketProductDto from 'src/interfaces/basketProduct.dto';

export interface Message {
  isSuccess: boolean;
  index?: number;
}

@Injectable()
export class BasketService {
  private readonly basket: BasketProductDto[] = [];

  constructor(@Inject(ShopService) private readonly shopService: ShopService) {}

  async addProductToBasket(product: BasketProductDto): Promise<Message> {
    const { name, quantity } = product;

    if (typeof name !== 'string' || typeof quantity !== 'number') {
      return {
        isSuccess: false,
      };
    }

    if (!(await this.shopService.hasProduct(name)))
      return {
        isSuccess: false,
      };

    const index = this.basket.push(product) - 1;

    return {
      isSuccess: true,
      index,
    };
  }

  async deleteProductFromBasket(id: number): Promise<Message> {
    if (this.basket[id]) {
      this.basket.splice(id, 1);
      return {
        isSuccess: true,
      };
    }

    return {
      isSuccess: false,
    };
  }

  getBasket(): BasketProductDto[] {
    return this.basket;
  }

  async getTotalPrice(): Promise<number> {
    const prices = await Promise.all(
      this.basket.map(
        async (basketItem) =>
          await this.shopService.getProductPrice(basketItem),
      ),
    );

    const totalPrice = await prices.reduce((prev, curr) => (prev += curr), 0);

    return Math.round(totalPrice * 100) / 100;
  }
}
