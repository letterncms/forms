import { can as e, navigate as t, plural as n, t as r, timeAgo as i, useAbility as a } from "@letterncms/sdk";
import { Button as o, Icon as s, Sparkline as c, Stat as l, Widget as u, WidgetRow as d, cn as f, compactNumber as p } from "@letterncms/ui";
import { Fragment as m, jsx as h, jsxs as g } from "react/jsx-runtime";
// admin/src/WidgetSubmissions.tsx
function _() {
	let _ = a("forms/activity", { limit: 4 }, { refetchInterval: 6e4 }), y = _.data, b = y ? v(y.days.slice(7)) : 0, x = y ? v(y.days.slice(0, 7)) : 0;
	return /* @__PURE__ */ h(u, {
		action: {
			label: r("All Forms"),
			to: "/forms"
		},
		query: _,
		empty: y?.forms === 0 ? {
			icon: "form",
			title: r("No forms yet"),
			action: e("forms.manage") && /* @__PURE__ */ h(o, {
				size: "sm",
				icon: "plus",
				onClick: () => t("/forms"),
				children: r("New Form")
			})
		} : y?.latest.length === 0 && {
			icon: "inbox",
			title: r("No submissions yet")
		},
		children: y && /* @__PURE__ */ g(m, { children: [
			/* @__PURE__ */ g("div", {
				className: "grid grid-cols-2 gap-4 @md:grid-cols-4",
				children: [
					/* @__PURE__ */ h(l, {
						size: "sm",
						label: r("Unread"),
						value: p(y.new)
					}),
					/* @__PURE__ */ h(l, {
						size: "sm",
						label: r("Last 7 days"),
						value: p(b),
						delta: x ? (b - x) / x : null
					}),
					/* @__PURE__ */ h("div", {
						className: "col-span-2 flex items-end",
						children: /* @__PURE__ */ h(c, {
							values: y.days,
							className: "h-9 w-full",
							label: n(v(y.days), "{count} submission in the last 14 days", "{count} submissions in the last 14 days")
						})
					})
				]
			}),
			/* @__PURE__ */ h("p", {
				className: "m-0 mt-4 mb-1 text-xs text-muted",
				children: r("Latest")
			}),
			y.latest.map((e) => /* @__PURE__ */ h(d, {
				to: `/forms/${e.form}?tab=submissions`,
				leading: /* @__PURE__ */ h(s, {
					name: e.status === "new" ? "mail" : "envelope-open",
					size: 15,
					className: f("shrink-0", e.status === "new" ? "text-ink" : "text-faint")
				}),
				title: /* @__PURE__ */ h("span", {
					className: e.status === "new" ? "font-medium" : void 0,
					children: e.summary || r("No answers")
				}),
				description: e.formTitle,
				meta: i(e.createdAt)
			}, e.id))
		] })
	});
}
function v(e) {
	return e.reduce((e, t) => e + t, 0);
}
export { _ as default };
