import { ShopItem } from './shop-item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ShopItemDetails extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 15,
  })
  color: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @OneToOne(() => ShopItem)
  shopItem: ShopItem;
}
