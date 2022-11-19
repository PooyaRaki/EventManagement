import { MigrationInterface, QueryRunner } from "typeorm";

export class user1668757168390 implements MigrationInterface {
    name = 'user1668757168390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Auth"."user" ("id" SERIAL NOT NULL, "email" character varying(200) NOT NULL, "phone" character varying(15), "salt" character varying(200) NOT NULL, "password" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" smallint NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "Auth"."user" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8e1f623798118e629b46a9e629" ON "Auth"."user" ("phone") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "Auth"."IDX_8e1f623798118e629b46a9e629"`);
        await queryRunner.query(`DROP INDEX "Auth"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "Auth"."user"`);
    }

}
