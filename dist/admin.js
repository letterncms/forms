import { registry as e, t } from "@letterncms/sdk";
import { lazy as n } from "react";
import { blockViews as r, useEditorContext as i } from "@letterncms/blocks";
import { Button as a, Fields as o, Icon as s, cn as c } from "@letterncms/ui";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
// admin/src/FieldView.tsx
var d = () => ({
	handle: "label",
	type: "text",
	component: "forms-label",
	label: t("Label")
});
function f({ node: e, onSettings: n }) {
	let { store: r, types: f } = i(), p = e.type.slice(5), m = e.props, h = f.get(e.type), g = String(m.options ?? "").split("\n").filter(Boolean).map((e) => e.includes("|") ? e.split("|")[1] : e), _ = "rounded-md border border-border-strong bg-bg px-3 text-sm text-faint";
	return p === "hidden" ? /* @__PURE__ */ u(a, {
		variant: "ghost",
		size: "md",
		icon: "eye-off",
		onClick: () => n(e.id),
		className: "border border-dashed border-border text-xs! font-normal! text-faint!",
		children: [
			t("Hidden"),
			" ",
			/* @__PURE__ */ l("span", {
				className: "font-mono",
				children: m.name || t("unnamed")
			}),
			" = ",
			m.value || "\"\""
		]
	}) : /* @__PURE__ */ u("div", {
		className: "space-y-1.5 py-1",
		onClick: () => r.select(e.id),
		children: [
			p !== "checkbox" && p !== "consent" && /* @__PURE__ */ u("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ l(o, {
						bare: !0,
						className: "min-w-0 flex-1",
						fields: [{
							...d(),
							display: "heading",
							placeholder: t("Label")
						}],
						values: m,
						onChange: (t, n) => r.updateProps(e.id, { label: n })
					}),
					m.required && /* @__PURE__ */ l("span", {
						className: "text-xs text-faint",
						children: t("Required")
					}),
					/* @__PURE__ */ l(a, {
						variant: "ghost",
						size: "xs",
						onClick: () => n(e.id),
						title: t("Field Settings"),
						className: "px-1! font-mono text-2xs! font-normal! text-faint! hover:text-text!",
						children: m.name || t("name?")
					})
				]
			}),
			p === "textarea" ? /* @__PURE__ */ l("div", {
				className: c(_, "h-20 py-2"),
				children: m.placeholder
			}) : p === "select" ? /* @__PURE__ */ u("div", {
				className: c(_, "flex h-9 items-center justify-between"),
				children: [m.placeholder || t("Choose"), /* @__PURE__ */ l(s, {
					name: "chevron-down",
					size: 13
				})]
			}) : p === "radio" || p === "checkboxes" ? /* @__PURE__ */ l("div", {
				className: "space-y-1",
				children: g.map((e, t) => /* @__PURE__ */ u("div", {
					className: "flex items-center gap-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ l("span", { className: c("size-3.5 border border-border-strong", p === "radio" ? "rounded-full" : "rounded-xs") }),
						" ",
						e
					]
				}, t))
			}) : p === "checkbox" || p === "consent" ? /* @__PURE__ */ u("div", {
				className: "flex items-start gap-2 text-sm",
				children: [/* @__PURE__ */ l("span", { className: "mt-0.5 size-3.5 shrink-0 rounded-xs border border-border-strong" }), p === "consent" ? /* @__PURE__ */ l("span", {
					className: "text-muted",
					dangerouslySetInnerHTML: { __html: String(m.text ?? "") }
				}) : /* @__PURE__ */ l(o, {
					bare: !0,
					className: "min-w-0 flex-1",
					fields: [d()],
					values: m,
					onChange: (t, n) => r.updateProps(e.id, { label: n })
				})]
			}) : p === "file" ? /* @__PURE__ */ u("div", {
				className: c(_, "flex h-12 items-center gap-2 border-dashed"),
				children: [
					/* @__PURE__ */ l(s, {
						name: "upload",
						size: 14
					}),
					" ",
					t("Choose a File")
				]
			}) : /* @__PURE__ */ u("div", {
				className: c(_, "flex h-9 items-center gap-2"),
				children: [/* @__PURE__ */ l(s, {
					name: h?.icon ?? "text",
					size: 13
				}), m.placeholder]
			}),
			m.help && /* @__PURE__ */ l("p", {
				className: "m-0 text-xs text-faint",
				children: m.help
			}),
			m.show_if?.field && /* @__PURE__ */ l("p", {
				className: "m-0 text-2xs text-focus",
				children: t("Shown when {field} {operator} {value}", {
					field: m.show_if.field,
					operator: m.show_if.op ?? "equals",
					value: m.show_if.value
				})
			})
		]
	});
}
function p() {
	r.set("form/*", f);
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
p(), e.fields.set("forms-label", m), e.widgets.set("forms-submissions", n(() => import("./chunks/WidgetSubmissions-DcrKdjjR.js"))), e.components.set("forms/builder", n(() => import("./chunks/FormBuilder-Dk-5--9W.js"))), e.components.set("forms/submission", n(() => import("./chunks/Submission-CoCAgAU_.js")));
