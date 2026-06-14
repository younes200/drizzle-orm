Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_tursodatabase_driver_core = require('./driver-core.cjs');

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
		transaction: (fn) => async () => client.transaction(fn),
		run: (sql, ...params) => client.prepare(sql).run(...params),
		all: (sql, ...params) => client.prepare(sql).all(...params),
		get: (sql, ...params) => client.prepare(sql).get(...params)
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
Object.defineProperty(exports, 'drizzle', {
  enumerable: true,
  get: function () {
    return drizzle;
  }
});
//# sourceMappingURL=sync-react-native.cjs.map