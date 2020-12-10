import {MigrationInterface, QueryRunner} from "typeorm";

export class user1607556041965 implements MigrationInterface {
    name = 'user1607556041965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
