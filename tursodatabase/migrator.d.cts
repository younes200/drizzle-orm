import { TursoDatabaseDatabase } from "./driver-core.cjs";
import * as __migrator_ts0 from "../migrator.cjs";
import { AnyRelations } from "../relations.cjs";

//#region src/tursodatabase/migrator.d.ts
interface MigrationConfig {
  migrations: Record<string, string>;
}
declare function migrate<TSchema extends Record<string, unknown>, TRelations extends AnyRelations>(db: TursoDatabaseDatabase<TSchema, TRelations>, config: MigrationConfig): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
interface State {
  success: boolean;
  error?: Error;
}
declare const useMigrations: (db: TursoDatabaseDatabase<any, any>, migrations: MigrationConfig) => State;
//#endregion
export { MigrationConfig, migrate, useMigrations };
//# sourceMappingURL=migrator.d.cts.map