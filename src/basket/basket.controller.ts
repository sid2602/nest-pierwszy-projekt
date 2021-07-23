import { BasketService } from './basket.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import BasketProductDto from 'src/interfaces/basketProduct.dto';
import { Message } from './basket.service';
@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService) {}

  @Post()
  async addProduct(@Body() product: BasketProductDto): Promise<Message> {
    return this.basketService.addProductToBasket(product);
  }

  @Get()
  async getBasket(): Promise<BasketProductDto[]> {
    return this.basketService.getBasket();
  }

  @Delete(':id')
  async deleteProductFromBasket(@Param('id') id: string): Promise<Message> {
    return this.basketService.deleteProductFromBasket(Number(id));
  }

  @Get('/total-price')
  async getBasketTotalPrice(): Promise<number> {
    return this.basketService.getTotalPrice();
  }
}
