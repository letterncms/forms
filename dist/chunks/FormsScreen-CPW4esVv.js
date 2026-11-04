import { can as e, invalidate as t, navigate as n, run as r, setQuery as i, t as a, useAbility as o, useLocation as s } from "@letterncms/sdk";
import { useEffect as c, useState as l } from "react";
import { Badge as u, Button as d, DataView as f, Dialog as p, EmptyState as m, Fields as h, Icon as g, IconButton as _, Menu as v, Page as y, ScreenTabs as b, StatusDot as x, toast as S, useScreenTabs as C } from "@letterncms/ui";
import { Fragment as w, jsx as T, jsxs as E } from "react/jsx-runtime";
// admin/src/FormsScreen.tsx
function D() {
	let t = o("forms/list"), { query: r } = s(), [p, h] = l(() => r.new === "1" && e("forms.manage"));
	c(() => {
		r.new && i({ new: null });
	}, [r.new]);
	let [S, w] = C(["forms"]);
	return /* @__PURE__ */ E(y, {
		width: "wide",
		crumbs: [{
			label: a("Forms"),
			icon: "form"
		}],
		actions: S === "forms" && e("forms.manage") && /* @__PURE__ */ T(d, {
			variant: "primary",
			icon: "plus",
			onClick: () => h(!0),
			children: a("New Form")
		}),
		children: [/* @__PURE__ */ T(b, {
			value: S,
			onChange: w,
			tabs: [{
				value: "forms",
				label: a("Forms")
			}],
			children: /* @__PURE__ */ T(f, {
				id: "forms",
				label: a("Forms"),
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
						label: a("Name"),
						value: (e) => e.title,
						render: (e) => /* @__PURE__ */ E("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ T(g, {
								name: "form",
								size: 16,
								className: "shrink-0 text-muted"
							}), /* @__PURE__ */ T("span", {
								className: "truncate",
								children: e.title
							})]
						})
					},
					{
						id: "status",
						label: a("Status"),
						width: "120px",
						value: (e) => Number(e.enabled),
						render: (e) => /* @__PURE__ */ T(x, {
							status: e.enabled ? "success" : "neutral",
							label: e.enabled ? a("On") : a("Off")
						})
					},
					{
						id: "fields",
						label: a("Fields"),
						width: "90px",
						align: "end",
						value: (e) => e.fields,
						render: (e) => e.fields
					},
					{
						id: "total",
						label: a("Submissions"),
						width: "120px",
						align: "end",
						value: (e) => e.total,
						render: (e) => e.total
					},
					{
						id: "new",
						label: a("Unread"),
						width: "90px",
						align: "end",
						value: (e) => e.new,
						render: (e) => e.new > 0 ? /* @__PURE__ */ T(u, {
							tone: "info",
							children: e.new
						}) : "—"
					}
				],
				actions: (t) => /* @__PURE__ */ T(v, {
					trigger: /* @__PURE__ */ T(_, {
						icon: "more",
						label: a("Actions for {name}", { name: t.title }),
						size: "xs"
					}),
					items: [
						{
							label: a("Fields"),
							icon: "field",
							onSelect: () => n(`/forms/${t.handle}`)
						},
						{
							label: a("Submissions"),
							icon: "inbox",
							onSelect: () => n(`/forms/${t.handle}?tab=submissions`)
						},
						e("forms.manage") && {
							label: a("Settings"),
							icon: "settings",
							onSelect: () => n(`/forms/${t.handle}?tab=settings`)
						}
					]
				}),
				empty: /* @__PURE__ */ T(m, {
					icon: "form",
					title: a("No forms yet"),
					description: a("Build one with the same editor you write pages with.")
				})
			})
		}), p && /* @__PURE__ */ T(O, { onClose: () => h(!1) })]
	});
}
function O({ onClose: e }) {
	let [i, o] = l(""), [s, c] = l(!1), u = i.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
	return /* @__PURE__ */ T(p, {
		open: !0,
		onOpenChange: (t) => !t && e(),
		size: "sm",
		title: a("New Form"),
		description: a("Starts with name, email and message."),
		footer: /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ T(d, {
			onClick: e,
			children: a("Cancel")
		}), /* @__PURE__ */ T(d, {
			variant: "primary",
			disabled: !u,
			loading: s,
			onClick: async () => {
				c(!0);
				try {
					await r("forms/save", {
						handle: u,
						title: i,
						fields: [
							{
								type: "form/text",
								props: {
									label: a("Name"),
									name: "name",
									required: !0,
									autocomplete: "name"
								}
							},
							{
								type: "form/email",
								props: {
									label: a("Email"),
									name: "email",
									required: !0
								}
							},
							{
								type: "form/textarea",
								props: {
									label: a("Message"),
									name: "message",
									required: !0
								}
							}
						]
					}), t("forms/"), n(`/forms/${u}`);
				} catch (e) {
					S.error(e);
				} finally {
					c(!1);
				}
			},
			children: a("Create")
		})] }),
		children: /* @__PURE__ */ T(h, {
			fields: [{
				handle: "title",
				type: "text",
				label: a("Name"),
				autofocus: !0,
				placeholder: a("Quote Request"),
				instructions: u ? a("Handle: {handle}", { handle: u }) : void 0
			}],
			values: { title: i },
			onChange: (e, t) => o(t)
		})
	});
}
export { D as default };
