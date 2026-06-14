import { entityKind } from "../../entity.js";
import { applyMixins, orderSelectedFields } from "../../utils.js";
import { QueryPromise } from "../../query-promise.js";
import { SQLiteSelectBase } from "../query-builders/select.js";

//#region src/sqlite-core/async/select.ts
var SQLiteAsyncSelectBase = class extends SQLiteSelectBase {
	static [entityKind] = "SQLiteAsyncSelect";
	/** @internal */
	_prepare(prepare = false) {
		if (!this.session) throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
		const fieldsList = orderSelectedFields(this.config.fields);
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
applyMixins(SQLiteAsyncSelectBase, [QueryPromise]);

//#endregion
export { SQLiteAsyncSelectBase };
//# sourceMappingURL=select.js.map