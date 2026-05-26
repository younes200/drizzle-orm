import { TursoDatabaseDatabase } from "./driver-core.cjs";
import { DrizzleConfig } from "../utils.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import * as _tursodatabase_sync_react_native0 from "@tursodatabase/sync-react-native";
import { BindParams, Database, Row, connect } from "@tursodatabase/sync-react-native";

//#region src/tursodatabase/sync-react-native.d.ts
type DatabaseOpts = (Database extends {
  new (path: string, opts: infer D): any;
} ? D : any) & {
  path: string;
};
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
      all: (...params: BindParams[]) => Promise<unknown[][] | Row[]>;
      get: (...params: BindParams[]) => Promise<unknown[] | Row | undefined>;
    };
    run: (...params: BindParams[]) => Promise<_tursodatabase_sync_react_native0.RunResult>;
    bind: (...params: BindParams[]) => /*elided*/any;
  };
  transaction: (fn: () => Promise<unknown>) => () => Promise<unknown>;
};
declare function drizzle<TSchema extends Record<string, unknown> = Record<string, never>, TRelations extends AnyRelations = EmptyRelations, TClient extends SyncReactNativeDatabaseClient = SyncReactNativeDatabaseClient>(config: DrizzleConfig<TSchema, TRelations> & {
  client: TClient;
}): TursoDatabaseDatabase<TSchema, TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TSchema extends Record<string, unknown> = Record<string, never>, TRelations extends AnyRelations = EmptyRelations>(config?: DrizzleConfig<TSchema, TRelations>): TursoDatabaseDatabase<TSchema, TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { DatabaseOpts, SyncReactNativeDatabaseClient, adaptSyncReactNativeClient, connect, drizzle };
//# sourceMappingURL=sync-react-native.d.cts.map