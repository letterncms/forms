import { can as e, invalidate as t, run as n, t as r, useAbility as i } from "@letterncms/sdk";
import { useMemo as a, useRef as o, useState as s } from "react";
import { EditorProvider as c, EditorStore as l, WriteEditor as u, useCatalog as d } from "@letterncms/blocks";
import { EmptyState as f, SaveBar as p, Spinner as m } from "@letterncms/ui";
import { jsx as h, jsxs as g } from "react/jsx-runtime";
// admin/src/FormBuilder.tsx
var _ = [
	"paragraph",
	"heading",
	"columns",
	"divider",
	"callout"
];
function v({ props: e }) {
	let t = i("forms/get", { handle: e.handle }, { refetchOnWindowFocus: !1 });
	return t.isLoading ? /* @__PURE__ */ h("div", {
		className: "grid place-items-center py-10 text-faint",
		children: /* @__PURE__ */ h(m, {})
	}) : t.data ? /* @__PURE__ */ h(y, { form: t.data }, t.data.handle) : /* @__PURE__ */ h(f, {
		icon: "form",
		title: r("Form not found")
	});
}
function y({ form: i }) {
	let { catalog: f, types: v } = d(), y = o(i.fields), [b, x] = s(!1), [S, C] = s(!1), [w, T] = s(null), [E, D] = s(0), O = o(i.fields), k = a(() => new l(y.current, (e) => {
		O.current = e, x(!0);
	}), [E]), A = e("forms.manage"), j = a(() => [...[...v.keys()].filter((e) => e.startsWith("form/") && e !== "forms/form"), ..._], [v]), M = async () => {
		C(!0), T(null);
		try {
			let e = await n("forms/save", {
				handle: i.handle,
				fields: O.current
			});
			y.current = e.fields, x(!1), t("forms/");
		} catch (e) {
			T(e instanceof Error ? e.message : String(e));
		} finally {
			C(!1);
		}
	};
	return f ? /* @__PURE__ */ g("div", {
		className: "max-w-[640px] pl-14",
		children: [
			/* @__PURE__ */ h(c, {
				value: {
					store: k,
					types: v,
					catalog: f,
					entryId: null,
					fieldHandle: "fields",
					allowed: j,
					getValues: () => ({}),
					title: i.title
				},
				children: /* @__PURE__ */ h(u, {})
			}, E),
			/* @__PURE__ */ h("p", {
				className: "mt-2 text-xs text-faint",
				children: r("Type / to add fields. Use Columns to put fields side by side.")
			}),
			A && /* @__PURE__ */ h(p, {
				dirty: b,
				saving: S,
				error: w,
				onSave: () => void M(),
				onDiscard: () => {
					O.current = y.current, x(!1), T(null), D((e) => e + 1);
				}
			})
		]
	}) : /* @__PURE__ */ h("div", {
		className: "grid place-items-center py-10 text-faint",
		children: /* @__PURE__ */ h(m, {})
	});
}
export { v as default };
