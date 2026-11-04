import { invalidate as e, locale as t, run as n, t as r, useAbility as i } from "@letterncms/sdk";
import { useEffect as a } from "react";
import { Badge as o, Button as s, Dialog as c, QueryError as l, Spinner as u, toast as d } from "@letterncms/ui";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
// admin/src/Submission.tsx
var h = (e) => ({
	new: r("New"),
	read: r("Read"),
	spam: r("Spam"),
	archived: r("Archived")
})[e];
function g({ props: g, close: _ }) {
	let v = i("forms/submission", { id: g.id }, { refetchOnWindowFocus: !1 }), y = v.data;
	a(() => {
		y && e("forms/submissions", "forms/list", "forms/activity");
	}, [y?.id]);
	let b = async (t) => {
		try {
			await n("forms/submission-update", {
				ids: [g.id],
				status: t
			}), e("forms/"), _?.();
		} catch (e) {
			d.error(e);
		}
	}, x = (e) => new Intl.NumberFormat(t(), {
		style: "unit",
		unit: "kilobyte",
		maximumFractionDigits: 0
	}).format(e / 1024), S = typeof y?.data.email == "string" ? y.data.email : null;
	return /* @__PURE__ */ p(c, {
		open: !0,
		onOpenChange: (e) => !e && _?.(),
		title: r("Submission"),
		description: y ? new Date(y.createdAt).toLocaleString(t(), {
			dateStyle: "medium",
			timeStyle: "short"
		}) : void 0,
		size: "md",
		footer: y && /* @__PURE__ */ m(f, { children: [
			/* @__PURE__ */ p(o, { children: h(y.status) }),
			/* @__PURE__ */ p("span", { className: "flex-1" }),
			S && /* @__PURE__ */ p(s, {
				icon: "mail",
				onClick: () => location.href = `mailto:${S}`,
				children: r("Reply")
			}),
			/* @__PURE__ */ p(s, {
				onClick: () => void b("spam"),
				children: r("Spam")
			}),
			/* @__PURE__ */ p(s, {
				variant: "primary",
				onClick: () => void b("archived"),
				children: r("Archive")
			})
		] }),
		children: v.isError ? /* @__PURE__ */ p(l, { onRetry: () => void v.refetch() }) : y ? /* @__PURE__ */ m("dl", {
			className: "m-0 grid grid-cols-[140px_1fr] gap-x-4 gap-y-3 text-sm max-sm:grid-cols-1 max-sm:gap-y-1",
			children: [
				Object.entries(y.data).map(([e, t]) => /* @__PURE__ */ m("div", {
					className: "contents",
					children: [/* @__PURE__ */ p("dt", {
						className: "text-muted",
						children: y.labels[e] ?? e
					}), /* @__PURE__ */ p("dd", {
						className: "m-0 whitespace-pre-wrap break-words max-sm:mb-2",
						children: Array.isArray(t) ? t.join(", ") : String(t ?? "")
					})]
				}, e)),
				y.files.map((e, t) => /* @__PURE__ */ m("div", {
					className: "contents",
					children: [/* @__PURE__ */ p("dt", {
						className: "text-muted",
						children: y.labels[e.field] ?? e.field
					}), /* @__PURE__ */ m("dd", {
						className: "m-0 max-sm:mb-2",
						children: [
							/* @__PURE__ */ p("a", {
								href: `/api/admin/forms/files/${y.id}/${t}`,
								className: "underline",
								children: e.name
							}),
							" ",
							/* @__PURE__ */ p("span", {
								className: "text-xs text-faint",
								children: x(e.size)
							})
						]
					})]
				}, t)),
				y.meta.page && /* @__PURE__ */ m("div", {
					className: "contents",
					children: [/* @__PURE__ */ p("dt", {
						className: "text-muted",
						children: r("Page")
					}), /* @__PURE__ */ p("dd", {
						className: "m-0 truncate text-xs",
						children: y.meta.page
					})]
				})
			]
		}) : /* @__PURE__ */ p("div", {
			className: "grid place-items-center py-6 text-faint",
			children: /* @__PURE__ */ p(u, {})
		})
	});
}
export { g as default };
