import { ReactNode } from 'react';
export type OrderDirection = "Asc" | "Desc";
export type ColumnState = Readonly<{
    isSortedColumn: boolean;
    direction: OrderDirection | undefined;
}>;
export type TableColumn<T> = Readonly<{
    /** Key for React to keep track. */
    key: string;
    /** The title to render above the column.
     *
     * Can be any react node.
     */
    title: ((state: ColumnState) => ReactNode) | ReactNode;
    /** How to render the table cells.
     *
     * Can be any react node.
     */
    render: (cell: T) => ReactNode;
    /** The function to call when a column title is clicked to start sorting. */
    onSorted?: (direction: OrderDirection) => Promise<void> | void;
    /** Whether this column is sorted by default.
     *
     * Does not actually do anything; this is just for syncing table display with outer state.
     */
    defaultSorted?: boolean | OrderDirection;
    /** Whether this columns should stay in view when scrolling (i.e. "stick" in place). */
    sticky?: boolean;
}>;
type TableProps<T> = Readonly<{
    /** The data from which the `columns` will be rendered. */
    data: ReadonlyArray<T> | null | undefined;
    /** The format and metadata for rendering the `data`. */
    columns: ReadonlyArray<TableColumn<T>>;
    /** A function to generate keys for React to keep track. */
    makeKey: (item: T, index: number) => React.Key;
    /** className for the table element. */
    className?: string;
    /** What to render when there is no data. Overwrites the default. */
    empty?: ReactNode;
}>;
/** An element that renders its `data` in a grid-like fashion, with native
 * HTML table elements underneath to keep it accessible.
 */
declare const Table: <T extends {}>({ data, columns, makeKey, className, empty, }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Table;
