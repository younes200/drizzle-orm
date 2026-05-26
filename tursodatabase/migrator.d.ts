import { TursoDatabaseDatabase } from "./driver-core.js";
import * as __migrator_ts0 from "../migrator.js";
import { AnyRelations } from "../relations.js";

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
//# sourceMappingURL=migrator.d.ts.map