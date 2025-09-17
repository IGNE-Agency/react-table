import { jsxs as b, jsx as n } from "react/jsx-runtime";
import k from "classnames";
import { useState as _ } from "react";
import '../../assets/table.css';const u = "_table_1hpbm_1", x = "_sticky_1hpbm_39", D = "_header_1hpbm_45", a = {
  table: u,
  sticky: x,
  header: D
}, m = ({
  data: i,
  columns: t,
  makeKey: r,
  className: o,
  empty: h
}) => {
  const [d, S] = N(t);
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
          const s = c === (d == null ? void 0 : d.index), y = d == null ? void 0 : d.direction, p = e.onSorted ? "button" : "div";
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
                    var f;
                    const l = !s || (d == null ? void 0 : d.direction) !== "Desc" ? "Desc" : "Asc";
                    await ((f = e.onSorted) == null ? void 0 : f.call(e, l)), S({
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
        /* @__PURE__ */ n("tbody", { children: i != null && i.length ? i.map((e, c) => /* @__PURE__ */ n("tr", { children: t.map((s) => /* @__PURE__ */ n(
          "td",
          {
            className: s.sticky ? a.sticky : void 0,
            children: s.render(e)
          },
          s.key
        )) }, r(e, c))) : h })
      ]
    }
  );
}, N = (i) => _(() => {
  const t = i.findIndex(
    (o) => o.defaultSorted
  );
  if (t === -1) return;
  const r = i[t];
  return r.onSorted ? {
    direction: r.defaultSorted === !0 ? "Desc" : r.defaultSorted || "Desc",
    index: t
  } : {
    index: t,
    direction: typeof r.defaultSorted == "string" ? r.defaultSorted : void 0
  };
});
export {
  m as default
};
