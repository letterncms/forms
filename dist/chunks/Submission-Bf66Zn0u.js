import { invalidate as e, locale as t, run as n, t as r, useAbility as i } from "@letterncms/sdk";
import { useEffect as a } from "react";
import { Badge as o, Button as s, Dialog as c, QueryError as l, Spinner as u, formatBytes as d, toast as f } from "@letterncms/ui";
import { Fragment as p, jsx as m, jsxs as h } from "react/jsx-runtime";
// admin/src/Submission.tsx
var g = (e) => ({
	new: r("New"),
	read: r("Read"),
	spam: r("Spam"),
	archived: r("Archived")
})[e];
function _({ props: _, close: v }) {
	let y = i("forms/submission", { id: _.id }, { refetchOnWindowFocus: !1 }), b = y.data;
	a(() => {
		b && e("forms/submissions", "forms/list", "forms/activity");
	}, [b?.id]);
	let x = async (t) => {
		try {
			await n("forms/submission-update", {
				ids: [_.id],
				status: t
			}), e("forms/"), v?.();
		} catch (e) {
			f.error(e);
		}
	}, S = typeof b?.data.email == "string" ? b.data.email : null;
	return /* @__PURE__ */ m(c, {
		open: !0,
		onOpenChange: (e) => !e && v?.(),
		title: r("Submission"),
		description: b ? new Date(b.createdAt).toLocaleString(t(), {
			dateStyle: "medium",
			timeStyle: "short"
		}) : void 0,
		size: "md",
		footer: b && /* @__PURE__ */ h(p, { children: [
			/* @__PURE__ */ m(o, { children: g(b.status) }),
			/* @__PURE__ */ m("span", { className: "flex-1" }),
			S && /* @__PURE__ */ m(s, {
				icon: "mail",
				onClick: () => location.href = `mailto:${S}`,
				children: r("Reply")
			}),
			/* @__PURE__ */ m(s, {
				onClick: () => void x("spam"),
				children: r("Spam")
			}),
			/* @__PURE__ */ m(s, {
				variant: "primary",
				onClick: () => void x("archived"),
				children: r("Archive")
			})
		] }),
		children: y.isError ? /* @__PURE__ */ m(l, { onRetry: () => void y.refetch() }) : b ? /* @__PURE__ */ h("dl", {
			className: "m-0 grid grid-cols-[140px_1fr] gap-x-4 gap-y-3 text-sm max-sm:grid-cols-1 max-sm:gap-y-1",
			children: [
				Object.entries(b.data).map(([e, t]) => /* @__PURE__ */ h("div", {
					className: "contents",
					children: [/* @__PURE__ */ m("dt", {
						className: "text-muted",
						children: b.labels[e] ?? e
					}), /* @__PURE__ */ m("dd", {
						className: "m-0 whitespace-pre-wrap break-words max-sm:mb-2",
						children: Array.isArray(t) ? t.join(", ") : String(t ?? "")
					})]
				}, e)),
				b.files.map((e, t) => /* @__PURE__ */ h("div", {
					className: "contents",
					children: [/* @__PURE__ */ m("dt", {
						className: "text-muted",
						children: b.labels[e.field] ?? e.field
					}), /* @__PURE__ */ h("dd", {
						className: "m-0 max-sm:mb-2",
						children: [
							/* @__PURE__ */ m("a", {
								href: `/api/admin/forms/files/${b.id}/${t}`,
								className: "underline",
								children: e.name
							}),
							" ",
							/* @__PURE__ */ m("span", {
								className: "text-xs text-faint",
								children: d(e.size)
							})
						]
					})]
				}, t)),
				b.meta.page && /* @__PURE__ */ h("div", {
					className: "contents",
					children: [/* @__PURE__ */ m("dt", {
						className: "text-muted",
						children: r("Page")
					}), /* @__PURE__ */ m("dd", {
						className: "m-0 truncate text-xs",
						children: b.meta.page
					})]
				})
			]
		}) : /* @__PURE__ */ m("div", {
			className: "grid place-items-center py-6 text-faint",
			children: /* @__PURE__ */ m(u, {})
		})
	});
}
export { _ as default };
