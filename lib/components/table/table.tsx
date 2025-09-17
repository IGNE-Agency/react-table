import classNames from "classnames";
import { type ReactNode, useState } from "react";
import style from "./table.module.scss";

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
const Table = <T extends {}>({
	data,
	columns,
	makeKey,
	className,
	empty,
}: TableProps<T>) => {
	const [sort, setSort] = useSort(columns);

	return (
		<table
			cellSpacing="0"
			className={classNames([style.table, className])}
			style={
				{
					"--columns": columns.length,
				} as React.CSSProperties
			}
		>
			<thead>
				<tr>
					{columns.map((column, columnIndex) => {
						const isSortedColumn = columnIndex === sort?.index;
						const direction = sort?.direction;
						const Header = column.onSorted ? "button" : "div";

						return (
							<th
								key={column.key}
								scope="col"
								className={column.sticky ? style.sticky : undefined}
							>
								<Header
									type={column.onSorted && "button"}
									className={style.header}
									onClick={
										column.onSorted
											? async () => {
													const newDirection =
														!isSortedColumn || sort?.direction !== "Desc"
															? "Desc"
															: "Asc";
													await column.onSorted?.(newDirection);
													setSort({
														index: columnIndex,
														direction: newDirection,
													});
												}
											: undefined
									}
								>
									{typeof column.title === "function"
										? column.title({
												isSortedColumn,
												direction,
											})
										: column.title}
								</Header>
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{!data?.length
					? empty
					: data.map((row, i) => (
							<tr key={makeKey(row, i)}>
								{columns.map((column) => (
									<td
										key={column.key}
										className={column.sticky ? style.sticky : undefined}
									>
										{column.render(row)}
									</td>
								))}
							</tr>
						))}
			</tbody>
		</table>
	);
};

export default Table;

const useSort = <T,>(columns: TableProps<T>["columns"]) =>
	useState<
		| Readonly<{
				index?: number;
				direction?: OrderDirection;
		  }>
		| undefined
	>(() => {
		const defaultSortedColumnIndex = columns.findIndex(
			(column) => column.defaultSorted,
		);
		if (defaultSortedColumnIndex === -1) return;
		const defaultSortedColumn = columns[defaultSortedColumnIndex];

		if (defaultSortedColumn.onSorted) {
			const direction =
				defaultSortedColumn.defaultSorted === true
					? "Desc"
					: defaultSortedColumn.defaultSorted || "Desc";
			return {
				direction,
				index: defaultSortedColumnIndex,
			};
		}

		return {
			index: defaultSortedColumnIndex,
			direction:
				typeof defaultSortedColumn.defaultSorted === "string"
					? defaultSortedColumn.defaultSorted
					: undefined,
		};
	});
