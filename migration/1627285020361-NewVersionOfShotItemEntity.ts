import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersionOfShotItemEntity1627285020361 implements MigrationInterface {
    name = 'NewVersionOfShotItemEntity1627285020361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `shop_item` ADD `name` varchar(25) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `shop_item` ADD `name` varchar(60) NOT NULL");
    }

}
