import { jsxs as b, jsx as n } from "react/jsx-runtime";
import k from "classnames";
import { useState as _ } from "react";
import '../../assets/table.css';const x = "_table_1hpbm_1", v = "_sticky_1hpbm_39", D = "_header_1hpbm_45", a = {
  table: x,
  sticky: v,
  header: D
}, j = ({
  data: r,
  columns: t,
  makeKey: d,
  className: o,
  empty: f
}) => {
  const [i, S] = N(t);
  return /* @__PURE__ */ b(
    "table",
    {
      cellSpacing: "0",
      className: k([a.table, o]),
      style: {
        "--columns": t.length
      },
      children: [
        /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { children: t.map((e, c) => {
          const s = c === (i == null ? void 0 : i.index), y = i == null ? void 0 : i.direction, p = e.onSorted ? "button" : "div";
          return /* @__PURE__ */ n(
            "th",
            {
              scope: "col",
              className: e.sticky ? a.sticky : void 0,
              children: /* @__PURE__ */ n(
                p,
                {
                  type: e.onSorted && "button",
                  className: a.header,
                  onClick: e.onSorted ? async () => {
                    var h;
                    const l = !s || (i == null ? void 0 : i.direction) !== "Desc" ? "Desc" : "Asc";
                    await ((h = e.onSorted) == null ? void 0 : h.call(e, l)), S({
                      index: c,
                      direction: l
                    });
                  } : void 0,
                  children: typeof e.title == "function" ? e.title({
                    isSortedColumn: s,
                    direction: y
                  }) : e.title
                }
              )
            },
            e.key
          );
        }) }) }),
        /* @__PURE__ */ n("tbody", { children: r != null && r.length ? r.map((e, c) => /* @__PURE__ */ n("tr", { children: t.map((s) => /* @__PURE__ */ n(
          "td",
          {
            className: s.sticky ? a.sticky : void 0,
            children: s.render(e)
          },
          s.key
        )) }, d(e, c))) : f })
      ]
    }
  );
}, N = (r) => _(() => {
  const t = r.findIndex(
    (o) => o.defaultSorted
  );
  if (t === -1) return;
  const d = r[t];
  return d.onSorted ? {
    direction: d.defaultSorted === !0 ? "Desc" : d.defaultSorted || "Desc",
    index: t
  } : {
    index: t,
    direction: typeof d.defaultSorted == "string" ? d.defaultSorted : void 0
  };
});
export {
  j as default
};
