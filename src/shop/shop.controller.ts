import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  GetPaginatedListOfProductsResponse,
  ShopProduct,
} from '../interfaces/shopProduct';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/find/:searchTerm')
  async testFindItem(
    @Param('searchTerm') searchTerm: string,
  ): Promise<ShopProduct[]> {
    return this.shopService.findProducts(searchTerm);
  }

  @Get('/:pageNumber')
  async getProducts(
    @Param('pageNumber') pageNumber: string,
  ): Promise<GetPaginatedListOfProductsResponse> {
    return this.shopService.getProducts(Number(pageNumber));
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
