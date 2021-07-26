import { ShopSet } from './shop-set.entity';

import { ShopItemDetails } from './shop-item-details.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ShopItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 25,
  })
  name: string;

  @Column({
    type: 'text',
    default: null,
    nullable: true,
  })
  description: string | null;

  @Column({
    type: 'float',
    precision: 6,
    scale: 2,
  })
  taxedPrice: number;

  @Column({
    default: 0,
  })
  boughtCounter: number;

  @Column({
    default: false,
  })
  wasEverBought: boolean;

  @OneToOne(() => ShopItemDetails)
  @JoinColumn()
  details: ShopItemDetails;

  @ManyToOne(() => ShopItem, (entity) => entity.subShopItems)
  mainShopItem: ShopItem;

  @OneToMany(() => ShopItem, (entity) => entity.mainShopItem)
  subShopItems: ShopItem[];

  @ManyToMany(() => ShopSet, (entity) => entity.items)
  @JoinTable()
  sets: ShopSet[];
}
