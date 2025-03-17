import classNames from "classnames";
import { ReactNode } from "react";
import { ColumnState } from "./table";
import style from "./table-sort-button.module.scss";

type TableSortButtonProps = Readonly<{
	state: ColumnState;
	children?: ReactNode;
}>;

const TableSortButton = ({
	state,
	children
}: TableSortButtonProps) => (
	<div
		className={classNames([
			style.button,
			state.isSortedColumn && style.sorted,
			state.direction &&
				style[state.direction.toLowerCase()]
		])}>
		{children}
	</div>
);

export default TableSortButton;
