import { MigrationInterface, QueryRunner } from "typeorm";

export class role1668772040543 implements MigrationInterface {
    name = 'role1668772040543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Auth"."user" ADD "role" character varying(50) NOT NULL`);
        await queryRunner.query(`CREATE INDEX "Role" ON "Auth"."user" ("role") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d44ccf43b8a0d6b9978affb88" ON "Auth"."user" ("status") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "Auth"."IDX_3d44ccf43b8a0d6b9978affb88"`);
        await queryRunner.query(`DROP INDEX "Auth"."Role"`);
        await queryRunner.query(`ALTER TABLE "Auth"."user" DROP COLUMN "role"`);
    }

}
