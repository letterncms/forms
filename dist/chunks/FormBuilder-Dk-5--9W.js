import { can as e, invalidate as t, run as n, useAbility as r } from "@letterncms/sdk";
import { useMemo as i, useRef as a, useState as o } from "react";
import { EditorProvider as s, EditorStore as c, WriteEditor as l, useCatalog as u } from "@letterncms/blocks";
import { NotFoundState as d, SaveBar as f, Spinner as p } from "@letterncms/ui";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
// admin/src/FormBuilder.tsx
var g = [
	"paragraph",
	"heading",
	"columns",
	"divider",
	"callout"
];
function _({ props: e }) {
	let t = r("forms/get", { handle: e.handle }, { refetchOnWindowFocus: !1 });
	return t.isLoading ? /* @__PURE__ */ m("div", {
		className: "grid place-items-center py-10 text-faint",
		children: /* @__PURE__ */ m(p, {})
	}) : t.data ? /* @__PURE__ */ m(v, { form: t.data }, t.data.handle) : /* @__PURE__ */ m(d, { icon: "form" });
}
function v({ form: r }) {
	let { catalog: d, types: _ } = u(), v = a(r.fields), [y, b] = o(!1), [x, S] = o(!1), [C, w] = o(null), [T, E] = o(0), D = a(r.fields), O = i(() => new c(v.current, (e) => {
		D.current = e, b(!0);
	}), [T]), k = e("forms.manage"), A = i(() => [...[..._.keys()].filter((e) => e.startsWith("form/") && e !== "forms/form"), ...g], [_]), j = async () => {
		S(!0), w(null);
		try {
			let e = await n("forms/save", {
				handle: r.handle,
				fields: D.current
			});
			v.current = e.fields, b(!1), t("forms/", "form-words/", "form-submissions/");
		} catch (e) {
			w(e instanceof Error ? e.message : String(e));
		} finally {
			S(!1);
		}
	};
	return d ? /* @__PURE__ */ h("div", {
		className: "pl-14 xl:-ml-14",
		children: [/* @__PURE__ */ m(s, {
			value: {
				store: O,
				types: _,
				catalog: d,
				entryId: null,
				fieldHandle: "fields",
				allowed: A,
				getValues: () => ({}),
				title: r.title
			},
			children: /* @__PURE__ */ m(l, {})
		}, T), k && /* @__PURE__ */ m(f, {
			dirty: y,
			saving: x,
			error: C,
			onSave: () => void j(),
			onDiscard: () => {
				D.current = v.current, b(!1), w(null), E((e) => e + 1);
			}
		})]
	}) : /* @__PURE__ */ m("div", {
		className: "grid place-items-center py-10 text-faint",
		children: /* @__PURE__ */ m(p, {})
	});
}
export { _ as default };
