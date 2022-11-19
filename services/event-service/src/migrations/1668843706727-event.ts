import {
    QueryRunner,
    MigrationInterface,
} from 'typeorm';

export class event1668843706727 implements MigrationInterface {
    name = 'event1668843706727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Event"."eventRoles" ("id" SERIAL NOT NULL, "instrumentId" smallint NOT NULL, "seats" smallint NOT NULL, "status" smallint NOT NULL, "eventId" integer, CONSTRAINT "EventInstrument" UNIQUE ("instrumentId", "eventId"), CONSTRAINT "PK_3fb2bf86530b025d8a01bf4cc8a" PRIMARY KEY ("id")); COMMENT ON COLUMN "Event"."eventRoles"."instrumentId" IS 'id of instrument'; COMMENT ON COLUMN "Event"."eventRoles"."seats" IS 'Number of performers each instrument can have'`);
        await queryRunner.query(`CREATE TABLE "Event"."performers" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "roleId" integer, "eventId" integer, CONSTRAINT "EventUserRole" UNIQUE ("userId", "roleId", "eventId"), CONSTRAINT "PK_c3e1872e240bf23fa46efc57489" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Event"."event" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "title" character varying(200) NOT NULL, "description" character varying(1000), "startedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" smallint NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Event"."eventRoles" ADD CONSTRAINT "FK_76eeb640e2bc3ca0934963d95ed" FOREIGN KEY ("eventId") REFERENCES "Event"."event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Event"."performers" ADD CONSTRAINT "FK_2b4bd57d239b146841d1cc57e02" FOREIGN KEY ("roleId") REFERENCES "Event"."eventRoles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Event"."performers" ADD CONSTRAINT "FK_7169fa46984817c83aff8c1d354" FOREIGN KEY ("eventId") REFERENCES "Event"."event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Event"."performers" DROP CONSTRAINT "FK_7169fa46984817c83aff8c1d354"`);
        await queryRunner.query(`ALTER TABLE "Event"."performers" DROP CONSTRAINT "FK_2b4bd57d239b146841d1cc57e02"`);
        await queryRunner.query(`ALTER TABLE "Event"."eventRoles" DROP CONSTRAINT "FK_76eeb640e2bc3ca0934963d95ed"`);
        await queryRunner.query(`DROP TABLE "Event"."event"`);
        await queryRunner.query(`DROP TABLE "Event"."performers"`);
        await queryRunner.query(`DROP TABLE "Event"."eventRoles"`);
    }

}
