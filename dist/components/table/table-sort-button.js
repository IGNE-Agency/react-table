import { jsx as c } from "react/jsx-runtime";
import e from "classnames";
import '../../assets/table-sort-button.css';const n = "_button_158ku_1", r = "_sorted_158ku_7", d = "_desc_158ku_11", _ = "_asc_158ku_15", t = {
  button: n,
  sorted: r,
  desc: d,
  asc: _
}, i = ({ state: o, children: s }) => /* @__PURE__ */ c(
  "div",
  {
    className: e([
      t.button,
      o.isSortedColumn && t.sorted,
      o.direction && t[o.direction.toLowerCase()]
    ]),
    children: s
  }
);
export {
  i as default
};
