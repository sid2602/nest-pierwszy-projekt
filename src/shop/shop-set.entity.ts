import { ShopItem } from './shop-item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ShopSet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @ManyToMany(() => ShopItem, (entity) => entity.sets)
  items: ShopItem[];
}
