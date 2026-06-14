Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.cjs');
let __entity_ts = require("../../entity.cjs");
let __utils_ts = require("../../utils.cjs");
let __query_promise_ts = require("../../query-promise.cjs");
let __sqlite_core_query_builders_select_ts = require("../query-builders/select.cjs");

//#region src/sqlite-core/async/select.ts
var SQLiteAsyncSelectBase = class extends __sqlite_core_query_builders_select_ts.SQLiteSelectBase {
	static [__entity_ts.entityKind] = "SQLiteAsyncSelect";
	/** @internal */
	_prepare(prepare = false) {
		if (!this.session) throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
		const fieldsList = (0, __utils_ts.orderSelectedFields)(this.config.fields);
		return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), "arrays", prepare, "all", this.dialect.mapperGenerators.rows(fieldsList, this.joinsNotNullableMap), {
			type: "select",
			tables: [...this.usedTables]
		}, this.cacheConfig);
	}
	prepare() {
		return this._prepare(true);
	}
	run = (placeholderValues) => {
		return this._prepare().run(placeholderValues);
	};
	all = (placeholderValues) => {
		return this._prepare().all(placeholderValues);
	};
	get = (placeholderValues) => {
		return this._prepare().get(placeholderValues);
	};
	values = (placeholderValues) => {
		return this._prepare().values(placeholderValues);
	};
	async execute() {
		return this._prepare().execute();
	}
};
(0, __utils_ts.applyMixins)(SQLiteAsyncSelectBase, [__query_promise_ts.QueryPromise]);

//#endregion
exports.SQLiteAsyncSelectBase = SQLiteAsyncSelectBase;
//# sourceMappingURL=select.cjs.map