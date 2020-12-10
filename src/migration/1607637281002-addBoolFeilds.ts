import {MigrationInterface, QueryRunner} from "typeorm";

export class addBoolFeilds1607637281002 implements MigrationInterface {
    name = 'addBoolFeilds1607637281002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "tattooer" DROP COLUMN "approved"`);
        // await queryRunner.query(`ALTER TABLE "tattooer" ADD "readyToShow" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tattooer" ADD "needReview" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tattooer" ADD "needUpdate" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "style"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "style"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tattooer"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tattooer"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);

        await queryRunner.renameColumn('tattooer', 'approved', 'readyToShow');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tattooer"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tattooer"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "style"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "style"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "city"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "tattooer" DROP COLUMN "needUpdate"`);
        await queryRunner.query(`ALTER TABLE "tattooer" DROP COLUMN "needReview"`);
        // await queryRunner.query(`ALTER TABLE "tattooer" DROP COLUMN "readyToShow"`);
        // await queryRunner.query(`ALTER TABLE "tattooer" ADD "approved" boolean NOT NULL DEFAULT false`);

        await queryRunner.renameColumn('tattooer', 'readyToShow', 'approved');
    }

}
