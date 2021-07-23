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

  addProductToBasket(product: BasketProductDto): Message {
    const { name, quantity } = product;

    if (typeof name !== 'string' || typeof quantity !== 'number') {
      return {
        isSuccess: false,
      };
    }

    if (this.shopService.getProductIndex(name) === -1)
      return {
        isSuccess: false,
      };

    const index = this.basket.push(product) - 1;

    return {
      isSuccess: true,
      index,
    };
  }

  deleteProductFromBasket(id: number): Message {
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

  getTotalPrice(): number {
    const prices = this.basket.map((basketItem) =>
      this.shopService.getProductPrice(basketItem),
    );

    const totalPrice = prices.reduce((prev, curr) => (prev += curr), 0);

    return Math.round(totalPrice * 100) / 100;
  }
}
