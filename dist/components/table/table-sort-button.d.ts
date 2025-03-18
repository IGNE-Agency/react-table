import { ReactNode } from 'react';
import { ColumnState } from './table';
type TableSortButtonProps = Readonly<{
    state: ColumnState;
    children?: ReactNode;
}>;
declare const TableSortButton: ({ state, children }: TableSortButtonProps) => import("react/jsx-runtime").JSX.Element;
export default TableSortButton;
