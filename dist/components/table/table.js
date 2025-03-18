import { jsxs as p, jsx as r } from "react/jsx-runtime";
import b from "classnames";
import { useState as u } from "react";
import '../../assets/table.css';const k = "_table_1hpbm_1", _ = "_sticky_1hpbm_39", x = "_header_1hpbm_45", a = {
  table: k,
  sticky: _,
  header: x
}, C = ({
  data: i,
  columns: t,
  makeKey: n,
  className: o,
  empty: f
}) => {
  const [d, h] = m(t);
  return /* @__PURE__ */ p(
    "table",
    {
      cellSpacing: "0",
      className: b([a.table, o]),
      style: {
        // @ts-ignore Typescript doesnt like custom css vars
        "--columns": t.length
      },
      children: [
        /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ r("tr", { children: t.map((e, c) => {
          const s = c === (d == null ? void 0 : d.index), S = d == null ? void 0 : d.direction, y = e.onSorted ? "button" : "div";
          return /* @__PURE__ */ r(
            "th",
            {
              scope: "col",
              className: e.sticky ? a.sticky : void 0,
              children: /* @__PURE__ */ r(
                y,
                {
                  type: e.onSorted && "button",
                  className: a.header,
                  onClick: e.onSorted ? async () => {
                    const l = !s || (d == null ? void 0 : d.direction) !== "Desc" ? "Desc" : "Asc";
                    await e.onSorted(
                      l
                    ), h({
                      index: c,
                      direction: l
                    });
                  } : void 0,
                  children: typeof e.title == "function" ? e.title({
                    isSortedColumn: s,
                    direction: S
                  }) : e.title
                }
              )
            },
            e.key
          );
        }) }) }),
        /* @__PURE__ */ r("tbody", { children: i != null && i.length ? i.map((e, c) => /* @__PURE__ */ r("tr", { children: t.map((s) => /* @__PURE__ */ r(
          "td",
          {
            className: s.sticky ? a.sticky : void 0,
            children: s.render(e)
          },
          s.key
        )) }, n(e, c))) : f })
      ]
    }
  );
}, m = (i) => u(() => {
  const t = i.findIndex(
    (o) => o.defaultSorted
  );
  if (t === -1) return;
  const n = i[t];
  return n.onSorted ? {
    direction: n.defaultSorted === !0 ? "Desc" : n.defaultSorted || "Desc",
    index: t
  } : {
    index: t,
    direction: typeof n.defaultSorted == "string" ? n.defaultSorted : void 0
  };
});
export {
  C as default
};
