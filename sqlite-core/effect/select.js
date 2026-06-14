import { entityKind } from "../../entity.js";
import { orderSelectedFields } from "../../utils.js";
import { applyEffectWrapper } from "../../effect-core/query-effect.js";
import { SQLiteSelectBase } from "../query-builders/select.js";

//#region src/sqlite-core/effect/select.ts
var SQLiteEffectSelectBase = class extends SQLiteSelectBase {
	static [entityKind] = "SQLiteEffectSelect";
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
	execute = (placeholderValues) => {
		return this._prepare().execute(placeholderValues);
	};
};
applyEffectWrapper(SQLiteEffectSelectBase);

//#endregion
export { SQLiteEffectSelectBase };
//# sourceMappingURL=select.js.map