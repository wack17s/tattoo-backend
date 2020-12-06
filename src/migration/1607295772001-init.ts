import {MigrationInterface, QueryRunner} from "typeorm";

export class init1607295772001 implements MigrationInterface {
    name = 'init1607295772001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "city"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "style"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "style"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tattooer"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tattooer"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "tattooer"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tattooer"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "style"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "style"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."createdAt" IS NULL`);
    }

}
