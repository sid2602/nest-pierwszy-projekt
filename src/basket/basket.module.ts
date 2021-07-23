import { ShopModule } from './../shop/shop.module';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { Module, forwardRef } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => ShopModule)],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketModule],
})
export class BasketModule {}
