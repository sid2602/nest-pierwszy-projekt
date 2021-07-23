import { Controller, Get, Inject } from '@nestjs/common';
import { ShopProduct } from '../interfaces/shopProduct';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get()
  async getProducts(): Promise<ShopProduct[]> {
    return this.shopService.getProducts();
  }
}
