import { can as e, invalidate as t, navigate as n, run as r, t as i, useAbility as a } from "@letterncms/sdk";
import { useState as o } from "react";
import { Badge as s, Button as c, DataView as l, Dialog as u, EmptyState as d, Fields as f, Icon as p, IconButton as m, Menu as h, Page as g, toast as _ } from "@letterncms/ui";
import { Fragment as v, jsx as y, jsxs as b } from "react/jsx-runtime";
// admin/src/FormsScreen.tsx
function x() {
	let t = a("forms/list"), [r, u] = o(!1);
	return /* @__PURE__ */ b(g, {
		width: "wide",
		crumbs: [{
			label: i("Forms"),
			icon: "form"
		}],
		actions: e("forms.manage") && /* @__PURE__ */ y(c, {
			variant: "primary",
			icon: "plus",
			onClick: () => u(!0),
			children: i("New Form")
		}),
		children: [/* @__PURE__ */ y(l, {
			id: "forms",
			label: i("Forms"),
			items: t.data ?? [],
			rowKey: (e) => e.handle,
			rowHref: (e) => `/forms/${e.handle}`,
			loading: t.isLoading,
			error: t.isError,
			onRetry: () => void t.refetch(),
			searchText: (e) => `${e.title} ${e.handle}`,
			columns: [
				{
					id: "title",
					label: i("Name"),
					value: (e) => e.title,
					render: (e) => /* @__PURE__ */ b("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ y(p, {
							name: "form",
							size: 16,
							className: "shrink-0 text-muted"
						}), /* @__PURE__ */ y("span", {
							className: "truncate",
							children: e.title
						})]
					})
				},
				{
					id: "status",
					label: i("Status"),
					width: "120px",
					value: (e) => Number(e.enabled),
					render: (e) => /* @__PURE__ */ y(s, {
						tone: e.enabled ? "success" : "neutral",
						children: e.enabled ? i("On") : i("Off")
					})
				},
				{
					id: "fields",
					label: i("Fields"),
					width: "90px",
					align: "end",
					value: (e) => e.fields,
					render: (e) => e.fields
				},
				{
					id: "total",
					label: i("Submissions"),
					width: "120px",
					align: "end",
					value: (e) => e.total,
					render: (e) => e.total
				},
				{
					id: "new",
					label: i("Unread"),
					width: "90px",
					align: "end",
					value: (e) => e.new,
					render: (e) => e.new > 0 ? /* @__PURE__ */ y(s, {
						tone: "info",
						children: e.new
					}) : "—"
				}
			],
			actions: (t) => /* @__PURE__ */ y(h, {
				trigger: /* @__PURE__ */ y(m, {
					icon: "more",
					label: i("Actions for {name}", { name: t.title }),
					size: "xs"
				}),
				items: [
					{
						label: i("Fields"),
						icon: "field",
						onSelect: () => n(`/forms/${t.handle}`)
					},
					{
						label: i("Submissions"),
						icon: "inbox",
						onSelect: () => n(`/forms/${t.handle}?tab=submissions`)
					},
					e("forms.manage") && {
						label: i("Settings"),
						icon: "settings",
						onSelect: () => n(`/forms/${t.handle}?tab=settings`)
					}
				]
			}),
			empty: /* @__PURE__ */ y(d, {
				icon: "form",
				title: i("No forms yet"),
				description: i("Build one with the same editor you write pages with."),
				action: e("forms.manage") && /* @__PURE__ */ y(c, {
					variant: "primary",
					icon: "plus",
					onClick: () => u(!0),
					children: i("New Form")
				})
			})
		}), r && /* @__PURE__ */ y(S, { onClose: () => u(!1) })]
	});
}
function S({ onClose: e }) {
	let [a, s] = o(""), [l, d] = o(!1), p = a.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
	return /* @__PURE__ */ y(u, {
		open: !0,
		onOpenChange: (t) => !t && e(),
		size: "sm",
		title: i("New Form"),
		description: i("Starts with name, email and message."),
		footer: /* @__PURE__ */ b(v, { children: [/* @__PURE__ */ y(c, {
			onClick: e,
			children: i("Cancel")
		}), /* @__PURE__ */ y(c, {
			variant: "primary",
			disabled: !p,
			loading: l,
			onClick: async () => {
				d(!0);
				try {
					await r("forms/save", {
						handle: p,
						title: a,
						fields: [
							{
								type: "form/text",
								props: {
									label: i("Name"),
									name: "name",
									required: !0,
									autocomplete: "name"
								}
							},
							{
								type: "form/email",
								props: {
									label: i("Email"),
									name: "email",
									required: !0
								}
							},
							{
								type: "form/textarea",
								props: {
									label: i("Message"),
									name: "message",
									required: !0
								}
							}
						]
					}), t("forms/"), n(`/forms/${p}`);
				} catch (e) {
					_.error(e);
				} finally {
					d(!1);
				}
			},
			children: i("Create")
		})] }),
		children: /* @__PURE__ */ y(f, {
			fields: [{
				handle: "title",
				type: "text",
				label: i("Name"),
				autofocus: !0,
				placeholder: i("Quote Request"),
				instructions: p ? i("Handle: {handle}", { handle: p }) : void 0
			}],
			values: { title: a },
			onChange: (e, t) => s(t)
		})
	});
}
export { x as default };
