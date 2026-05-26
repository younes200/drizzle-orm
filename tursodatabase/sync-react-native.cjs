Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../_virtual/_rolldown/runtime.cjs');
const require_tursodatabase_driver_core = require('./driver-core.cjs');
let _tursodatabase_sync_react_native = require("@tursodatabase/sync-react-native");

//#region src/tursodatabase/sync-react-native.ts
function rowToArray(row) {
	return Object.keys(row).map((key) => row[key]);
}
/** Maps sync-react-native Statement to the database-common shape Drizzle expects. */
function adaptStatement(stmt) {
	const adapted = {
		raw(asArrays) {
			return {
				all: async (...params) => {
					const rows = await stmt.all(...params);
					if (asArrays === false) return rows;
					return rows.map(rowToArray);
				},
				get: async (...params) => {
					const row = await stmt.get(...params);
					if (row === void 0) return row;
					if (asArrays === false) return row;
					return rowToArray(row);
				}
			};
		},
		run: (...params) => stmt.run(...params),
		bind: (...params) => {
			stmt.bind(...params);
			return adapted;
		}
	};
	return adapted;
}
/** Adapts sync-react-native Database for Drizzle's Turso driver (prepare/raw/transaction). */
function adaptSyncReactNativeClient(client) {
	return {
		prepare: (sql) => adaptStatement(client.prepare(sql)),
		transaction: (fn) => async () => client.transaction(fn)
	};
}
function drizzle(config) {
	const { client, ...drizzleConfig } = config;
	const db = require_tursodatabase_driver_core.construct(adaptSyncReactNativeClient(client), drizzleConfig);
	db.$client = client;
	return db;
}
(function(_drizzle) {
	function mock(config) {
		return require_tursodatabase_driver_core.construct({}, config);
	}
	_drizzle.mock = mock;
})(drizzle || (drizzle = {}));

//#endregion
exports.adaptSyncReactNativeClient = adaptSyncReactNativeClient;
exports.connect = _tursodatabase_sync_react_native.connect;
Object.defineProperty(exports, 'drizzle', {
  enumerable: true,
  get: function () {
    return drizzle;
  }
});
//# sourceMappingURL=sync-react-native.cjs.map