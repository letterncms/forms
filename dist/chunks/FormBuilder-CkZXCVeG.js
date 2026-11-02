import { blockNavigation as e, can as t, invalidate as n, locale as r, navigate as i, plural as a, run as o, t as s, timeAgo as c, useAbility as l, useManifest as u, useTab as d } from "@letterncms/sdk";
import { useEffect as f, useMemo as p, useRef as m, useState as h } from "react";
import { EditorProvider as g, EditorStore as _, WriteEditor as v, useCatalog as y } from "@letterncms/blocks";
import { Badge as b, Button as x, DataView as S, Dialog as C, EmptyState as w, Fields as T, Page as E, SelectionBar as D, Spinner as O, Tabs as k, confirm as A, toast as j } from "@letterncms/ui";
import { Fragment as M, jsx as N, jsxs as P } from "react/jsx-runtime";
// admin/src/FormBuilder.tsx
function F() {
	return [
		{
			handle: "submit",
			type: "text",
			label: s("Button Label"),
			width: "half"
		},
		{
			handle: "enabled",
			type: "toggle",
			label: s("Accept Submissions"),
			width: "half"
		},
		{
			handle: "success",
			type: "textarea",
			label: s("Success Message"),
			rows: 2
		},
		{
			handle: "redirect",
			type: "url",
			component: "link",
			label: s("Or Redirect To"),
			placeholder: s("A Thank-You Page")
		},
		{
			handle: "notify",
			type: "tags",
			label: s("Email Submissions To"),
			placeholder: "name@example.com"
		},
		{
			handle: "subject",
			type: "text",
			label: s("Email Subject"),
			instructions: s("Use {form} or any {field_name}.")
		},
		{
			handle: "reply_to_field",
			type: "text",
			label: s("Reply-to Field"),
			instructions: s("The field that holds the sender’s email."),
			width: "half"
		},
		{
			handle: "store",
			type: "toggle",
			label: s("Keep Submissions in {brand}"),
			width: "half"
		},
		{
			handle: "confirmation",
			type: "toggle",
			label: s("Send the Person a Confirmation Email")
		},
		{
			handle: "confirmation_subject",
			type: "text",
			label: s("Confirmation Subject"),
			if: { confirmation: !0 }
		},
		{
			handle: "confirmation_message",
			type: "richtext",
			label: s("Confirmation Message"),
			if: { confirmation: !0 }
		},
		{
			handle: "honeypot",
			type: "toggle",
			label: s("Hidden Spam Trap"),
			width: "half"
		},
		{
			handle: "min_seconds",
			type: "number",
			label: s("Minimum Seconds to Fill In"),
			min: 0,
			max: 60,
			width: "half"
		},
		{
			handle: "webhook",
			type: "url",
			label: s("Webhook"),
			instructions: s("Each submission is POSTed as JSON to this https:// URL (Zapier, Make, n8n, your CRM).")
		}
	];
}
function I(e) {
	return e.flatMap((e) => {
		let t = e.props ?? {};
		return [...typeof t.name == "string" && e.type !== "form/hidden" ? [{
			name: t.name,
			label: String(t.label ?? t.name),
			words: [
				"label",
				"help",
				"placeholder",
				"options",
				"text"
			].filter((e) => typeof t[e] == "string" && t[e] !== ""),
			props: t
		}] : [], ...I(e.children ?? [])];
	});
}
function L({ fields: e, settings: t, locales: n, disabled: r, onChange: i }) {
	let a = u().site, o = a.locales.filter((e) => e !== a.defaultLocale), [c, l] = h(o[0]), d = (e) => new Intl.DisplayNames([e], { type: "language" }).of(e) ?? e, f = n[c] ?? {}, p = I(e), m = [
		{
			handle: "s:submit",
			type: "text",
			label: s("Button Label"),
			placeholder: t.submit,
			width: "half"
		},
		{
			handle: "s:success",
			type: "textarea",
			label: s("Success Message"),
			placeholder: t.success,
			rows: 2
		},
		...t.confirmation ? [{
			handle: "s:confirmation_subject",
			type: "text",
			label: s("Confirmation Subject"),
			placeholder: t.confirmation_subject
		}, {
			handle: "s:confirmation_message",
			type: "richtext",
			label: s("Confirmation Message")
		}] : [],
		...p.flatMap((e) => e.words.map((t) => ({
			handle: `f:${e.name}:${t}`,
			type: t === "options" ? "textarea" : "text",
			label: `${e.label} · ${{
				label: s("Label"),
				help: s("Help Text"),
				placeholder: s("Placeholder"),
				options: s("Options"),
				text: s("Statement")
			}[t]}`,
			placeholder: e.props[t],
			instructions: t === "options" ? s("Keep each value: value|Label.") : void 0
		})))
	], g = Object.fromEntries(m.map((e) => {
		let [t, n, r] = e.handle.split(":");
		return [e.handle, (t === "s" ? f.settings?.[n] : f.fields?.[n]?.[r]) ?? ""];
	}));
	return /* @__PURE__ */ P("div", {
		className: "max-w-[640px]",
		children: [o.length > 1 && /* @__PURE__ */ N(k, {
			value: c,
			onChange: l,
			tabs: o.map((e) => ({
				value: e,
				label: d(e)
			})),
			className: "mb-6"
		}), /* @__PURE__ */ N(T, {
			fields: m,
			values: g,
			disabled: r,
			onChange: (e, t) => {
				let [r, a, o] = e.split(":");
				i({
					...n,
					[c]: r === "s" ? {
						...f,
						settings: {
							...f.settings,
							[a]: t
						}
					} : {
						...f,
						fields: {
							...f.fields,
							[a]: {
								...f.fields?.[a],
								[o]: t
							}
						}
					}
				});
			}
		})]
	});
}
var R = () => ({
	handle: "title",
	type: "text",
	label: s("Form Name")
}), z = () => [{
	handle: "search",
	type: "text",
	label: s("Search Submissions"),
	icon: "search",
	size: "sm",
	placeholder: s("Search…"),
	className: "w-56"
}, {
	handle: "status",
	type: "select",
	label: s("Show"),
	display: "segmented",
	required: !0,
	options: {
		all: s("Inbox"),
		new: s("Unread"),
		archived: s("Archived"),
		spam: s("Spam")
	}
}], B = (e) => ({
	new: s("New"),
	read: s("Read"),
	spam: s("Spam"),
	archived: s("Archived")
})[e], V = [
	"paragraph",
	"heading",
	"columns",
	"divider",
	"callout"
];
function H({ params: e }) {
	let t = l("forms/get", { handle: e.handle }, { refetchOnWindowFocus: !1 });
	return t.isLoading ? /* @__PURE__ */ N("div", {
		className: "grid h-full place-items-center text-faint",
		children: /* @__PURE__ */ N(O, {})
	}) : t.data ? /* @__PURE__ */ N(U, { form: t.data }, t.data.handle) : /* @__PURE__ */ N(E, {
		crumbs: [{
			label: s("Forms"),
			to: "/forms",
			icon: "form"
		}, { label: s("Not Found") }],
		children: /* @__PURE__ */ N(w, { title: s("Form not found") })
	});
}
function U({ form: r }) {
	let [a, c] = d([
		"fields",
		"settings",
		"languages",
		"submissions"
	]), l = u().site.locales.length > 1, [b, S] = h(r.locales ?? {}), { catalog: C, types: w } = y(), [D, O] = h(r.title), [I, z] = h(r.settings), [B, H] = h(!1), [U, G] = h(!1), K = m(r.fields), q = p(() => new _(r.fields, (e) => {
		K.current = e, H(!0);
	}), []), J = t("forms.manage"), Y = p(() => [...[...w.keys()].filter((e) => e.startsWith("form/") && e !== "forms/form"), ...V], [w]);
	return f(() => e(() => B ? s("Discard unsaved changes to this form?") : null), [B]), /* @__PURE__ */ P(E, {
		width: "default",
		crumbs: [{
			label: s("Forms"),
			to: "/forms",
			icon: "form"
		}, { label: D || r.handle }],
		actions: J && /* @__PURE__ */ P(M, { children: [/* @__PURE__ */ N(x, {
			variant: "ghost",
			icon: "trash",
			onClick: async () => {
				await A({
					title: s("Delete “{title}”?", { title: D || r.handle }),
					description: s("Submissions are kept. Pages that embed it will show nothing."),
					confirm: s("Delete"),
					danger: !0
				}) && (await o("forms/delete", { handle: r.handle }).catch(j.error), H(!1), n("forms/"), i("/forms"));
			},
			children: s("Delete")
		}), /* @__PURE__ */ N(x, {
			variant: "primary",
			disabled: !B,
			loading: U,
			onClick: async () => {
				G(!0);
				try {
					await o("forms/save", {
						handle: r.handle,
						title: D,
						fields: K.current,
						settings: I,
						locales: b
					}), H(!1), n("forms/"), j.success(s("Form saved"));
				} catch (e) {
					j.error(e);
				} finally {
					G(!1);
				}
			},
			children: s("Save")
		})] }),
		children: [
			/* @__PURE__ */ N(T, {
				bare: !0,
				fields: [R()],
				values: { title: D },
				disabled: !J,
				onChange: (e, t) => {
					O(t), H(!0);
				},
				className: "mb-6 [&_input]:!h-auto [&_input]:!border-0 [&_input]:!p-0 [&_input]:!text-2xl [&_input]:!font-semibold [&_input]:!shadow-none"
			}),
			/* @__PURE__ */ N(k, {
				value: a,
				onChange: c,
				tabs: [
					{
						value: "fields",
						label: s("Fields")
					},
					{
						value: "settings",
						label: s("Settings")
					},
					...l ? [{
						value: "languages",
						label: s("Languages")
					}] : [],
					{
						value: "submissions",
						label: s("Submissions")
					}
				],
				className: "mb-8"
			}),
			a === "fields" && C && /* @__PURE__ */ P("div", {
				className: "max-w-[640px] pl-14",
				children: [/* @__PURE__ */ N(g, {
					value: {
						store: q,
						types: w,
						catalog: C,
						entryId: null,
						fieldHandle: "fields",
						allowed: Y,
						getValues: () => ({}),
						title: D
					},
					children: /* @__PURE__ */ N(v, {})
				}), /* @__PURE__ */ N("p", {
					className: "mt-2 text-xs text-faint",
					children: s("Type / to add fields. Use Columns to put fields side by side.")
				})]
			}),
			a === "settings" && /* @__PURE__ */ N("div", {
				className: "max-w-[640px]",
				children: /* @__PURE__ */ N(T, {
					fields: F(),
					values: I,
					disabled: !J,
					onChange: (e, t) => {
						z({
							...I,
							[e]: t
						}), H(!0);
					}
				})
			}),
			a === "languages" && l && /* @__PURE__ */ N(L, {
				fields: K.current,
				settings: I,
				locales: b,
				disabled: !J,
				onChange: (e) => {
					S(e), H(!0);
				}
			}),
			a === "submissions" && /* @__PURE__ */ N(W, { form: r })
		]
	});
}
function W({ form: e }) {
	let [i, u] = h("all"), [d, f] = h(""), [m, g] = h(1), [_, v] = h(/* @__PURE__ */ new Set()), [y, E] = h(null), O = l("forms/submissions", {
		form: e.handle,
		status: i,
		search: d || void 0,
		page: m,
		perPage: 100
	}), k = O.data?.items ?? [], F = p(() => {
		let e = /* @__PURE__ */ new Set();
		return k.forEach((t) => Object.keys(t.data).forEach((t) => e.add(t))), [...e].slice(0, 3);
	}, [k]), I = async (e, t) => {
		await o("forms/submission-update", {
			ids: e,
			status: t
		}).catch(j.error), v(/* @__PURE__ */ new Set()), n("forms/");
	};
	return /* @__PURE__ */ P("div", { children: [
		/* @__PURE__ */ N(S, {
			id: `submissions.${e.handle}`,
			label: s("Submissions"),
			items: k,
			source: {
				ability: "forms/submissions",
				input: {
					form: e.handle,
					status: i,
					search: d || void 0
				},
				perPage: 100
			},
			rowKey: (e) => e.id,
			pagination: O.data && {
				page: O.data.page,
				pages: O.data.pages,
				total: O.data.total,
				perPage: 100,
				onPage: g
			},
			onRowClick: (e) => {
				E(e), e.status === "new" && I([e.id], "read");
			},
			loading: O.isLoading,
			error: O.isError,
			onRetry: () => void O.refetch(),
			selection: {
				ids: _,
				onSelect: (e, t) => v((n) => {
					let r = new Set(n);
					return e.forEach((e) => t ? r.add(e) : r.delete(e)), r;
				})
			},
			toolbar: /* @__PURE__ */ P(M, { children: [/* @__PURE__ */ N(T, {
				layout: "inline",
				bare: !0,
				className: "flex flex-wrap items-center gap-2",
				fields: z(),
				values: {
					search: d,
					status: i
				},
				onChange: (e, t) => {
					g(1), v(/* @__PURE__ */ new Set()), e === "search" ? f(t) : u(t);
				}
			}), /* @__PURE__ */ N(x, {
				size: "sm",
				icon: "download",
				onClick: async () => {
					let t = await o("forms/export", { form: e.handle }), n = URL.createObjectURL(new Blob([t.csv], { type: "text/csv" }));
					Object.assign(document.createElement("a"), {
						href: n,
						download: t.filename
					}).click(), URL.revokeObjectURL(n);
				},
				children: s("Export CSV")
			})] }),
			columns: [
				...F.map((e) => ({
					id: e,
					label: e,
					render: (t) => /* @__PURE__ */ N("span", {
						className: t.status === "new" ? "font-medium text-text" : "font-normal",
						children: String(Array.isArray(t.data[e]) ? t.data[e].join(", ") : t.data[e] ?? "—")
					})
				})),
				{
					id: "_status",
					label: s("Status"),
					width: "100px",
					render: (e) => /* @__PURE__ */ N(b, {
						tone: e.status === "new" ? "info" : "neutral",
						children: B(e.status)
					})
				},
				{
					id: "_date",
					label: s("Received"),
					width: "120px",
					align: "end",
					render: (e) => c(e.createdAt)
				}
			],
			empty: /* @__PURE__ */ N(w, {
				icon: "inbox",
				title: s("No submissions"),
				description: i === "spam" ? s("Nothing caught as spam.") : void 0
			})
		}),
		/* @__PURE__ */ P(D, {
			count: _.size,
			onClear: () => v(/* @__PURE__ */ new Set()),
			children: [[
				"read",
				"archived",
				"spam"
			].map((e) => /* @__PURE__ */ N(x, {
				size: "sm",
				variant: "ghost",
				onClick: () => I([..._], e),
				children: s(e === "read" ? "Mark Read" : e === "archived" ? "Archive" : "Spam")
			}, e)), t("forms.manage") && /* @__PURE__ */ N(x, {
				size: "sm",
				variant: "ghost",
				onClick: async () => {
					if (await A({
						title: a(_.size, "Delete {count} submission?", "Delete {count} submissions?"),
						description: s("This cannot be undone."),
						confirm: s("Delete"),
						danger: !0
					})) try {
						await o("forms/submission-delete", { ids: [..._] }), v(/* @__PURE__ */ new Set()), n("forms/");
					} catch (e) {
						j.error(e);
					}
				},
				children: s("Delete")
			})]
		}),
		y && /* @__PURE__ */ N(C, {
			open: !0,
			onOpenChange: () => E(null),
			title: s("Submission"),
			description: new Date(y.createdAt).toLocaleString(r(), {
				dateStyle: "medium",
				timeStyle: "short"
			}),
			size: "md",
			footer: /* @__PURE__ */ P(M, { children: [
				/* @__PURE__ */ N(b, { children: B(y.status) }),
				/* @__PURE__ */ N("span", { className: "flex-1" }),
				y.data.email && /* @__PURE__ */ N(x, {
					icon: "mail",
					onClick: () => location.href = `mailto:${y.data.email}`,
					children: s("Reply")
				}),
				/* @__PURE__ */ N(x, {
					onClick: () => {
						I([y.id], "spam"), E(null);
					},
					children: s("Spam")
				}),
				/* @__PURE__ */ N(x, {
					variant: "primary",
					onClick: () => {
						I([y.id], "archived"), E(null);
					},
					children: s("Archive")
				})
			] }),
			children: /* @__PURE__ */ P("dl", {
				className: "m-0 grid grid-cols-[140px_1fr] gap-x-4 gap-y-3 text-sm",
				children: [
					Object.entries(y.data).map(([e, t]) => /* @__PURE__ */ P("div", {
						className: "contents",
						children: [/* @__PURE__ */ N("dt", {
							className: "text-muted",
							children: e
						}), /* @__PURE__ */ N("dd", {
							className: "m-0 whitespace-pre-wrap break-words",
							children: Array.isArray(t) ? t.join(", ") : String(t)
						})]
					}, e)),
					y.files.map((e, t) => /* @__PURE__ */ P("div", {
						className: "contents",
						children: [/* @__PURE__ */ N("dt", {
							className: "text-muted",
							children: e.field
						}), /* @__PURE__ */ P("dd", {
							className: "m-0",
							children: [
								/* @__PURE__ */ N("a", {
									href: `/api/admin/forms/files/${y.id}/${t}`,
									className: "underline",
									children: e.name
								}),
								" ",
								/* @__PURE__ */ N("span", {
									className: "text-xs text-faint",
									children: new Intl.NumberFormat(r(), {
										style: "unit",
										unit: "kilobyte",
										maximumFractionDigits: 0
									}).format(e.size / 1024)
								})
							]
						})]
					}, t)),
					y.meta.page && /* @__PURE__ */ P(M, { children: [/* @__PURE__ */ N("dt", {
						className: "text-muted",
						children: s("Page")
					}), /* @__PURE__ */ N("dd", {
						className: "m-0 truncate text-xs",
						children: y.meta.page
					})] })
				]
			})
		})
	] });
}
export { H as FormBuilder };
