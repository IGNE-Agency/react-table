# React Table

A simple table component for React.

## How to

### Render columns

It is advisable to define a columns variable with `useMemo()` so that it will
not be re-generated on each component render.  
But take care what value you use to watch for changes!

When working with async data with Tanstack query, it is best to use the `data`
attribute from useQuery.

```tsx
const { data } = useQuery({ /* options */ })
const columns = useMemo(() => [
  {
    key: "name",
    title: (state) => "User name",
    /* etc */
  },
], [data]); // <-- columns will only rerender when there's new data
```

### Sorting

The data you provide to the table determines the content and order of the rows.  
**Any of the `sort`-related props are only intended for displaying a sort state in the table header.**

```tsx
const columns = useMemo(() => [
  {
    title: (state) => (
      <>
        {/* Only show an error when it is the sorted column and point it to the right direction */}
        User Name {state.isSortedColumn
          ? state.direction === "Asc"
            ? "↓"
            : "↑"
          : ""}
      </>
    ),
    /* etc */
  },
], [data]);
```

The `onSorted` callback will be fired after you click a sortable header.
Use it to trigger a change of the data you pass to the table.

Note that currently, when selecting a new column it will always default to `"Desc"`.  
**This is rather limiting**: a PR will be made to fix this.

## Development

This component was developed [using Bun for running & package management](https://bun.sh), [BiomeJS for formatting and linting](https://biomejs.dev) [and `vite` for hosting](https://vite.dev). Run it locally using `bun run dev`.
