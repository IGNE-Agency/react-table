# React Table

A simple table component for React.

## How to

### Sort

Use the `onSorted` function on a column item to enable sorting by that column.

It supports sorting asynchronously. However if you are not able to do return a 
promise (eg. because the actual request is a side-effect), the sort will not
work properly.  
Eg: the _direction_ argument for `onSorted(direction)` will lag behind.

Example:  
`click sort -> set filters -> useEffect on filter -> fetch -> rerender table`

In this case you need to figure out the sort direction yourself.

## Development

This component was developed [using Bun for running & package management](https://bun.sh), [BiomeJS for formatting and linting](https://biomejs.dev) [and `vite` for hosting](https://vite.dev). Run it locally using `bun run dev`.
