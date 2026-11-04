import { prefetchAbility as e, registry as t, t as n } from "@letterncms/sdk";
import { lazy as r } from "react";
import { blockViews as i, useEditorContext as a } from "@letterncms/blocks";
import { Fields as o, Icon as s, cn as c } from "@letterncms/ui";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
// admin/src/FieldView.tsx
var d = () => ({
	handle: "label",
	type: "text",
	component: "forms-label",
	label: n("Label")
});
function f({ node: e, onSettings: t }) {
	let { store: r, types: i } = a(), f = e.type.slice(5), p = e.props, m = i.get(e.type), h = String(p.options ?? "").split("\n").filter(Boolean).map((e) => e.includes("|") ? e.split("|")[1] : e), g = "rounded-md border border-border-strong bg-bg px-3 text-sm text-faint";
	return f === "hidden" ? /* @__PURE__ */ u("button", {
		type: "button",
		onClick: () => t(e.id),
		className: "flex h-8 items-center gap-2 rounded-md border border-dashed border-border px-3 text-xs text-faint",
		children: [
			/* @__PURE__ */ l(s, {
				name: "eye-off",
				size: 13
			}),
			" ",
			n("Hidden"),
			" ",
			/* @__PURE__ */ l("span", {
				className: "font-mono",
				children: p.name || n("unnamed")
			}),
			" = ",
			p.value || "\"\""
		]
	}) : /* @__PURE__ */ u("div", {
		className: "space-y-1.5 py-1",
		onClick: () => r.select(e.id),
		children: [
			f !== "checkbox" && f !== "consent" && /* @__PURE__ */ u("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ l(o, {
						bare: !0,
						className: "min-w-0 flex-1",
						fields: [{
							...d(),
							display: "heading",
							placeholder: n("Label")
						}],
						values: p,
						onChange: (t, n) => r.updateProps(e.id, { label: n })
					}),
					p.required && /* @__PURE__ */ l("span", {
						className: "text-xs text-faint",
						children: n("Required")
					}),
					/* @__PURE__ */ l("button", {
						type: "button",
						onClick: () => t(e.id),
						className: "rounded-xs px-1 font-mono text-2xs text-faint hover:bg-hover hover:text-text",
						title: n("Field Settings"),
						children: p.name || n("name?")
					})
				]
			}),
			f === "textarea" ? /* @__PURE__ */ l("div", {
				className: c(g, "h-20 py-2"),
				children: p.placeholder
			}) : f === "select" ? /* @__PURE__ */ u("div", {
				className: c(g, "flex h-9 items-center justify-between"),
				children: [p.placeholder || n("Choose…"), /* @__PURE__ */ l(s, {
					name: "chevron-down",
					size: 13
				})]
			}) : f === "radio" || f === "checkboxes" ? /* @__PURE__ */ l("div", {
				className: "space-y-1",
				children: h.map((e, t) => /* @__PURE__ */ u("div", {
					className: "flex items-center gap-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ l("span", { className: c("size-3.5 border border-border-strong", f === "radio" ? "rounded-full" : "rounded-[3px]") }),
						" ",
						e
					]
				}, t))
			}) : f === "checkbox" || f === "consent" ? /* @__PURE__ */ u("div", {
				className: "flex items-start gap-2 text-sm",
				children: [/* @__PURE__ */ l("span", { className: "mt-0.5 size-3.5 shrink-0 rounded-[3px] border border-border-strong" }), f === "consent" ? /* @__PURE__ */ l("span", {
					className: "text-muted",
					dangerouslySetInnerHTML: { __html: String(p.text ?? "") }
				}) : /* @__PURE__ */ l(o, {
					bare: !0,
					className: "min-w-0 flex-1",
					fields: [d()],
					values: p,
					onChange: (t, n) => r.updateProps(e.id, { label: n })
				})]
			}) : f === "file" ? /* @__PURE__ */ u("div", {
				className: c(g, "flex h-12 items-center gap-2 border-dashed"),
				children: [
					/* @__PURE__ */ l(s, {
						name: "upload",
						size: 14
					}),
					" ",
					n("Choose a File")
				]
			}) : /* @__PURE__ */ u("div", {
				className: c(g, "flex h-9 items-center gap-2"),
				children: [/* @__PURE__ */ l(s, {
					name: m?.icon ?? "text",
					size: 13
				}), p.placeholder]
			}),
			p.help && /* @__PURE__ */ l("p", {
				className: "m-0 text-xs text-faint",
				children: p.help
			}),
			p.show_if?.field && /* @__PURE__ */ l("p", {
				className: "m-0 text-2xs text-focus",
				children: n("Shown when {field} {operator} {value}", {
					field: p.show_if.field,
					operator: p.show_if.op ?? "equals",
					value: p.show_if.value
				})
			})
		]
	});
}
function p() {
	i.set("form/*", f);
}
// admin/src/fields.tsx
function m({ field: e, value: t, onChange: n, disabled: r }) {
	return /* @__PURE__ */ l("input", {
		value: t ?? "",
		disabled: r,
		onChange: (e) => n(e.target.value),
		placeholder: e.placeholder,
		"aria-label": e.label,
		className: c("w-full min-w-0 bg-transparent outline-none", e.display === "heading" && "text-sm font-medium text-text placeholder:text-faint")
	});
}
p(), t.fields.set("forms-label", m), t.widgets.set("forms-submissions", r(() => import("./chunks/WidgetSubmissions-reQLraLS.js"))), t.routes.set("/forms", {
	path: "/forms",
	component: r(() => import("./chunks/FormsScreen-CPW4esVv.js")),
	load: () => e("forms/list")
}), t.routes.set("/forms/:handle", {
	path: "/forms/:handle",
	component: r(() => import("./chunks/FormBuilder-mdwTxBip.js").then((e) => ({ default: e.FormBuilder }))),
	load: ({ handle: t }) => e("forms/get", { handle: t })
});
