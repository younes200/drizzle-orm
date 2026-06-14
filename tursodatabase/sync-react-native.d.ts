import { TursoDatabaseDatabase } from "./driver-core.js";
import { AnyRelations, EmptyRelations } from "../relations.js";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.js";
import * as _tursodatabase_sync_react_native0 from "@tursodatabase/sync-react-native";
import { BindParams, Row } from "@tursodatabase/sync-react-native";

//#region src/tursodatabase/sync-react-native.d.ts
/** Structural type so apps are not tied to drizzle's peer copy of @tursodatabase/sync-react-native. */
type SyncReactNativeDatabaseClient = {
  prepare(sql: string): {
    all(...params: BindParams[]): Promise<Row[]>;
    get(...params: BindParams[]): Promise<Row | undefined>;
    run(...params: BindParams[]): Promise<unknown>;
    bind(...params: BindParams[]): unknown;
  };
  transaction<T>(fn: () => T | Promise<T>): Promise<T>;
};
/** Adapts sync-react-native Database for Drizzle's Turso driver (prepare/raw/transaction). */
declare function adaptSyncReactNativeClient(client: SyncReactNativeDatabaseClient): {
  prepare: (sql: string) => {
    raw(asArrays?: boolean): {
      all: (...params: BindParams[]) => Promise<Row[] | unknown[][]>;
      get: (...params: BindParams[]) => Promise<unknown[] | Row | undefined>;
    };
    run: (...params: BindParams[]) => Promise<_tursodatabase_sync_react_native0.RunResult>;
    bind: (...params: BindParams[]) => /*elided*/any;
  };
  transaction: (fn: () => Promise<unknown>) => () => Promise<unknown>;
  run: (sql: string, ...params: BindParams[]) => Promise<unknown>;
  all: (sql: string, ...params: BindParams[]) => Promise<Row[]>;
  get: (sql: string, ...params: BindParams[]) => Promise<Row | undefined>;
};
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends SyncReactNativeDatabaseClient = SyncReactNativeDatabaseClient>(config: DrizzleSQLiteConfig<TRelations> & {
  client: TClient;
}): TursoDatabaseDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzleSQLiteConfig<TRelations>): TursoDatabaseDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { SyncReactNativeDatabaseClient, adaptSyncReactNativeClient, drizzle };
//# sourceMappingURL=sync-react-native.d.ts.map