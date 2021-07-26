import { MigrationInterface, QueryRunner } from 'typeorm';

export class dsadsad1627284928020 implements MigrationInterface {
  name = 'dsadsad1627284928020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `shop_item` DROP COLUMN `name`');
    await queryRunner.query(
      'ALTER TABLE `shop_item` ADD `name` varchar(25) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `shop_item` DROP COLUMN `name`');
    await queryRunner.query(
      'ALTER TABLE `shop_item` ADD `name` varchar(60) NOT NULL',
    );
  }
}
