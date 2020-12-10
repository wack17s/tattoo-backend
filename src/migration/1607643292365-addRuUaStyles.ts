import {MigrationInterface, QueryRunner} from "typeorm";

export class addRuUaStyles1607643292365 implements MigrationInterface {
    name = 'addRuUaStyles1607643292365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "style" ADD "ru" character varying`);
        await queryRunner.query(`ALTER TABLE "style" ADD "ua" character varying`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "en" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."en" IS NULL`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "ua" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."ua" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "style"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "style"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tattooer"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tattooer"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tattooer"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tattooer"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "style"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "style"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."ua" IS NULL`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "ua" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."en" IS NULL`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "en" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "style" DROP COLUMN "ua"`);
        await queryRunner.query(`ALTER TABLE "style" DROP COLUMN "ru"`);
    }

}
