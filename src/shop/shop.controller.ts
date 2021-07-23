import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ShopProduct } from '../interfaces/shopProduct';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get()
  async getProducts(): Promise<ShopProduct[]> {
    return this.shopService.getProducts();
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string): Promise<ShopProduct> {
    return this.shopService.getProduct(id);
  }

  @Delete('/:id')
  async removeProduct(@Param('id') id: string) {
    this.shopService.deleteProduct(id);
  }

  @Post('/')
  async createNewProduct(@Body() product: ShopProduct): Promise<ShopProduct> {
    return this.shopService.addProduct(product);
  }
}
