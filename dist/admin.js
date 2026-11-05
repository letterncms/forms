import { registry as e, t } from "@letterncms/sdk";
import { lazy as n } from "react";
import { blockViews as r, useEditorContext as i } from "@letterncms/blocks";
import { Fields as a, Icon as o, cn as s } from "@letterncms/ui";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
// admin/src/FieldView.tsx
var u = () => ({
	handle: "label",
	type: "text",
	component: "forms-label",
	label: t("Label")
});
function d({ node: e, onSettings: n }) {
	let { store: r, types: d } = i(), f = e.type.slice(5), p = e.props, m = d.get(e.type), h = String(p.options ?? "").split("\n").filter(Boolean).map((e) => e.includes("|") ? e.split("|")[1] : e), g = "rounded-md border border-border-strong bg-bg px-3 text-sm text-faint";
	return f === "hidden" ? /* @__PURE__ */ l("button", {
		type: "button",
		onClick: () => n(e.id),
		className: "flex h-8 items-center gap-2 rounded-md border border-dashed border-border px-3 text-xs text-faint",
		children: [
			/* @__PURE__ */ c(o, {
				name: "eye-off",
				size: 13
			}),
			" ",
			t("Hidden"),
			" ",
			/* @__PURE__ */ c("span", {
				className: "font-mono",
				children: p.name || t("unnamed")
			}),
			" = ",
			p.value || "\"\""
		]
	}) : /* @__PURE__ */ l("div", {
		className: "space-y-1.5 py-1",
		onClick: () => r.select(e.id),
		children: [
			f !== "checkbox" && f !== "consent" && /* @__PURE__ */ l("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ c(a, {
						bare: !0,
						className: "min-w-0 flex-1",
						fields: [{
							...u(),
							display: "heading",
							placeholder: t("Label")
						}],
						values: p,
						onChange: (t, n) => r.updateProps(e.id, { label: n })
					}),
					p.required && /* @__PURE__ */ c("span", {
						className: "text-xs text-faint",
						children: t("Required")
					}),
					/* @__PURE__ */ c("button", {
						type: "button",
						onClick: () => n(e.id),
						className: "rounded-xs px-1 font-mono text-2xs text-faint hover:bg-hover hover:text-text",
						title: t("Field Settings"),
						children: p.name || t("name?")
					})
				]
			}),
			f === "textarea" ? /* @__PURE__ */ c("div", {
				className: s(g, "h-20 py-2"),
				children: p.placeholder
			}) : f === "select" ? /* @__PURE__ */ l("div", {
				className: s(g, "flex h-9 items-center justify-between"),
				children: [p.placeholder || t("Choose…"), /* @__PURE__ */ c(o, {
					name: "chevron-down",
					size: 13
				})]
			}) : f === "radio" || f === "checkboxes" ? /* @__PURE__ */ c("div", {
				className: "space-y-1",
				children: h.map((e, t) => /* @__PURE__ */ l("div", {
					className: "flex items-center gap-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ c("span", { className: s("size-3.5 border border-border-strong", f === "radio" ? "rounded-full" : "rounded-[3px]") }),
						" ",
						e
					]
				}, t))
			}) : f === "checkbox" || f === "consent" ? /* @__PURE__ */ l("div", {
				className: "flex items-start gap-2 text-sm",
				children: [/* @__PURE__ */ c("span", { className: "mt-0.5 size-3.5 shrink-0 rounded-[3px] border border-border-strong" }), f === "consent" ? /* @__PURE__ */ c("span", {
					className: "text-muted",
					dangerouslySetInnerHTML: { __html: String(p.text ?? "") }
				}) : /* @__PURE__ */ c(a, {
					bare: !0,
					className: "min-w-0 flex-1",
					fields: [u()],
					values: p,
					onChange: (t, n) => r.updateProps(e.id, { label: n })
				})]
			}) : f === "file" ? /* @__PURE__ */ l("div", {
				className: s(g, "flex h-12 items-center gap-2 border-dashed"),
				children: [
					/* @__PURE__ */ c(o, {
						name: "upload",
						size: 14
					}),
					" ",
					t("Choose a File")
				]
			}) : /* @__PURE__ */ l("div", {
				className: s(g, "flex h-9 items-center gap-2"),
				children: [/* @__PURE__ */ c(o, {
					name: m?.icon ?? "text",
					size: 13
				}), p.placeholder]
			}),
			p.help && /* @__PURE__ */ c("p", {
				className: "m-0 text-xs text-faint",
				children: p.help
			}),
			p.show_if?.field && /* @__PURE__ */ c("p", {
				className: "m-0 text-2xs text-focus",
				children: t("Shown when {field} {operator} {value}", {
					field: p.show_if.field,
					operator: p.show_if.op ?? "equals",
					value: p.show_if.value
				})
			})
		]
	});
}
function f() {
	r.set("form/*", d);
}
// admin/src/fields.tsx
function p({ field: e, value: t, onChange: n, disabled: r }) {
	return /* @__PURE__ */ c("input", {
		value: t ?? "",
		disabled: r,
		onChange: (e) => n(e.target.value),
		placeholder: e.placeholder,
		"aria-label": e.label,
		className: s("w-full min-w-0 bg-transparent outline-none", e.display === "heading" && "text-sm font-medium text-text placeholder:text-faint")
	});
}
f(), e.fields.set("forms-label", p), e.widgets.set("forms-submissions", n(() => import("./chunks/WidgetSubmissions-CbVL0WqH.js"))), e.components.set("forms/builder", n(() => import("./chunks/FormBuilder-BfJJD1Ut.js"))), e.components.set("forms/submission", n(() => import("./chunks/Submission-Bf66Zn0u.js")));
