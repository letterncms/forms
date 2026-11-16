import { registry as e, t } from "@letterncms/sdk";
import { lazy as n } from "react";
import { blockViews as r, useEditorContext as i } from "@letterncms/blocks";
import { Button as a, Fields as o, Icon as s, Tooltip as c, cn as l } from "@letterncms/ui";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
// admin/src/FieldView.tsx
var f = () => ({
	handle: "label",
	type: "text",
	component: "forms-label",
	label: t("Label")
});
function p({ node: e, onSettings: n }) {
	let { store: r, types: p } = i(), m = e.type.slice(5), h = e.props, g = p.get(e.type), _ = String(h.options ?? "").split("\n").filter(Boolean).map((e) => e.includes("|") ? e.split("|")[1] : e), v = "rounded-md border border-border-strong bg-bg px-3 text-sm text-faint";
	return m === "hidden" ? /* @__PURE__ */ d(a, {
		variant: "ghost",
		size: "md",
		icon: "eye-off",
		onClick: () => n(e.id),
		className: "border border-dashed border-border text-xs! font-normal! text-faint!",
		children: [
			t("Hidden"),
			" ",
			/* @__PURE__ */ u("span", {
				className: "font-mono",
				children: h.name || t("unnamed")
			}),
			" = ",
			h.value || "\"\""
		]
	}) : /* @__PURE__ */ d("div", {
		className: "space-y-1.5 py-1",
		onClick: () => r.select(e.id),
		children: [
			m !== "checkbox" && m !== "consent" && /* @__PURE__ */ d("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ u(o, {
						bare: !0,
						className: "min-w-0 flex-1",
						fields: [{
							...f(),
							display: "heading",
							placeholder: t("Label")
						}],
						values: h,
						onChange: (t, n) => r.updateProps(e.id, { label: n })
					}),
					h.required && /* @__PURE__ */ u("span", {
						className: "text-xs text-faint",
						children: t("Required")
					}),
					/* @__PURE__ */ u(c, {
						content: t("Field Settings"),
						children: /* @__PURE__ */ u(a, {
							variant: "ghost",
							size: "xs",
							onClick: () => n(e.id),
							className: "px-1! font-mono text-2xs! font-normal! text-faint! hover:text-text!",
							children: h.name || t("name?")
						})
					})
				]
			}),
			m === "textarea" ? /* @__PURE__ */ u("div", {
				className: l(v, "h-20 py-2"),
				children: h.placeholder
			}) : m === "select" ? /* @__PURE__ */ d("div", {
				className: l(v, "flex h-9 items-center justify-between"),
				children: [h.placeholder || t("Choose"), /* @__PURE__ */ u(s, {
					name: "chevron-down",
					size: 13
				})]
			}) : m === "radio" || m === "checkboxes" ? /* @__PURE__ */ u("div", {
				className: "space-y-1",
				children: _.map((e, t) => /* @__PURE__ */ d("div", {
					className: "flex items-center gap-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ u("span", { className: l("size-3.5 border border-border-strong", m === "radio" ? "rounded-full" : "rounded-xs") }),
						" ",
						e
					]
				}, t))
			}) : m === "checkbox" || m === "consent" ? /* @__PURE__ */ d("div", {
				className: "flex items-start gap-2 text-sm",
				children: [/* @__PURE__ */ u("span", { className: "mt-0.5 size-3.5 shrink-0 rounded-xs border border-border-strong" }), m === "consent" ? /* @__PURE__ */ u("span", {
					className: "text-muted",
					dangerouslySetInnerHTML: { __html: String(h.text ?? "") }
				}) : /* @__PURE__ */ u(o, {
					bare: !0,
					className: "min-w-0 flex-1",
					fields: [f()],
					values: h,
					onChange: (t, n) => r.updateProps(e.id, { label: n })
				})]
			}) : m === "file" ? /* @__PURE__ */ d("div", {
				className: l(v, "flex h-12 items-center gap-2 border-dashed"),
				children: [
					/* @__PURE__ */ u(s, {
						name: "upload",
						size: 14
					}),
					" ",
					t("Choose a File")
				]
			}) : /* @__PURE__ */ d("div", {
				className: l(v, "flex h-9 items-center gap-2"),
				children: [/* @__PURE__ */ u(s, {
					name: g?.icon ?? "text",
					size: 13
				}), h.placeholder]
			}),
			h.help && /* @__PURE__ */ u("p", {
				className: "m-0 text-xs text-faint",
				children: h.help
			}),
			h.show_if?.field && /* @__PURE__ */ u("p", {
				className: "m-0 text-2xs text-focus",
				children: t("Shown when {field} {operator} {value}", {
					field: h.show_if.field,
					operator: h.show_if.op ?? "equals",
					value: h.show_if.value
				})
			})
		]
	});
}
function m() {
	r.set("form/*", p);
}
// admin/src/fields.tsx
function h({ field: e, value: t, onChange: n, disabled: r }) {
	return /* @__PURE__ */ u("input", {
		value: t ?? "",
		disabled: r,
		onChange: (e) => n(e.target.value),
		placeholder: e.placeholder,
		"aria-label": e.label,
		className: l("w-full min-w-0 bg-transparent outline-none", e.display === "heading" && "text-sm font-medium text-text placeholder:text-faint")
	});
}
m(), e.fields.set("forms-label", h), e.widgets.set("forms-submissions", n(() => import("./chunks/WidgetSubmissions-DcrKdjjR.js"))), e.components.set("forms/builder", n(() => import("./chunks/FormBuilder-Dk-5--9W.js"))), e.components.set("forms/submission", n(() => import("./chunks/Submission-CoCAgAU_.js")));
