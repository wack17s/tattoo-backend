import {MigrationInterface, QueryRunner} from "typeorm";

export class init1607457330495 implements MigrationInterface {
    name = 'init1607457330495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "city_name_enum" AS ENUM('cherkasy', 'chernihiv', 'chernivtsi', 'dnipro', 'donetsk', 'ivano-frankivsk', 'kharkiv', 'kherson', 'khmelnytskyi', 'kropyvnytskyi', 'kyiv', 'luhansk', 'lutsk', 'lviv', 'mykolaiv', 'odessa', 'poltava', 'rivne', 'sumy', 'ternopil', 'uzhhorod', 'vinnytsia', 'zaporizhzhia', 'zhytomyr', 'kryvyi rih', 'mariupol', 'sevastopol', 'simferopol', 'makiivka', 'kamianske', 'kremenchuk', 'bila tserkva', 'uman')`);
        await queryRunner.query(`CREATE TABLE "city" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" "city_name_enum" NOT NULL, "en" character varying NOT NULL, "ru" character varying NOT NULL, "ua" character varying NOT NULL, CONSTRAINT "PK_b45b59cf09a68b20992eb7d3335" PRIMARY KEY ("id", "name"))`);
        await queryRunner.query(`CREATE TYPE "style_name_enum" AS ENUM('blackwork', 'chicano', 'japan', 'neotraditional', 'newschool', 'realism', 'traditional', 'tribal', 'watercolor', 'graphics', 'dotwork', 'linework', 'black grey', 'trash polka', 'color', 'test')`);
        await queryRunner.query(`CREATE TABLE "style" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" "style_name_enum" NOT NULL, "en" character varying NOT NULL, CONSTRAINT "PK_badc3fe5f9f10216a7fe7662886" PRIMARY KEY ("id", "name"))`);
        await queryRunner.query(`CREATE TABLE "tattooer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "instagram" character varying NOT NULL, "approved" boolean NOT NULL DEFAULT false, "posts" jsonb NOT NULL DEFAULT '[]', "city_id" character varying, "style_ids" character varying array, "profilePic" character varying, "about" character varying, "aboutRaw" character varying, "postsCount" character varying, "followersCount" character varying, "followingCount" character varying, CONSTRAINT "PK_66cd2f2472e6ec52ad07899c901" PRIMARY KEY ("id", "instagram"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a5104fef9a0a9e277f1992e2a0" ON "tattooer" ("instagram") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_a5104fef9a0a9e277f1992e2a0"`);
        await queryRunner.query(`DROP TABLE "tattooer"`);
        await queryRunner.query(`DROP TABLE "style"`);
        await queryRunner.query(`DROP TYPE "style_name_enum"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TYPE "city_name_enum"`);
    }

}
