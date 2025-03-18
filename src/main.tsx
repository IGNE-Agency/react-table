import { type SetStateAction, StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
	type OrderDirection,
	Table,
	type TableColumn,
	TableSortButton,
} from "../lib/main";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("App could not mount. Root not found.");
}

const root = createRoot(rootElement);

const App = () => {
	const [params, setParams] = useSearchParams();
	// biome-ignore lint/correctness/useExhaustiveDependencies: Wrong
	const posts = useMemo<ReadonlyArray<Post>>(
		() =>
			fakePosts.toSorted(
				sort(params.get("sort"), params.get("dir") as OrderDirection),
			),
		[params.get("sort"), params.get("dir")],
	);

	const columns = useMemo<ReadonlyArray<TableColumn<Post>>>(
		() => [
			{
				key: "id",
				title: (state) => (
					<>
						id <TableSortButton state={state}>v</TableSortButton>
					</>
				),
				render: (post) => post.id,
				onSorted: (dir) => {
					setParams((params) => {
						params.set("dir", dir);
						params.set("sort", "id");
						return params;
					});
				},
			},
			{
				key: "title",
				title: (state) => (
					<>
						Title <TableSortButton state={state}>v</TableSortButton>
					</>
				),
				render: (post) => post.title,
				onSorted: (dir) => {
					setParams((params) => {
						params.set("dir", dir);
						params.set("sort", "title");
						return params;
					});
				},
			},
			{
				key: "contentLength",
				title: (state) => (
					<>
						Content length <TableSortButton state={state}>v</TableSortButton>
					</>
				),
				render: (post) => post.content.length,
				onSorted: (dir) => {
					setParams((params) => {
						params.set("dir", dir);
						params.set("sort", "contentLength");
						return params;
					});
				},
			},
		],
		[setParams],
	);

	return (
		<>
			<h1>Posts</h1>
			<Table columns={columns} data={posts} makeKey={({ id }) => id} />
		</>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);

type Post = Readonly<{
	id: string;
	title: string;
	content: string;
}>;

const useSearchParams = () => {
	const [params, setParams] = useState(
		new URLSearchParams(window.location.search),
	);

	const update = (action: SetStateAction<URLSearchParams>) => {
		const newParams = new URLSearchParams(
			typeof action === "function" ? action(params) : action,
		);
		setParams(newParams);
		const searchIndex = window.location.search
			? window.location.href.indexOf(window.location.search)
			: window.location.href.length;
		window.history.replaceState(
			null,
			"",
			`${window.location.href.slice(0, searchIndex)}?${newParams.toString()}`,
		);
	};

	return [params, update] as const;
};

const sort =
	(by?: string | null | undefined, dir?: OrderDirection | null | undefined) =>
	<T extends Record<string, unknown>>(a: T, b: T): number => {
		if (!by || !dir) {
			return 0;
		}

		const [lhs, rhs] = dir === "Asc" ? [a, b] : [b, a];
		switch (by) {
			case "id": {
				return (rhs.id as string).localeCompare(lhs.id as string);
			}
			case "title": {
				return (rhs.title as string).localeCompare(lhs.title as string);
			}
			case "contentLength": {
				return (lhs.content as string).length - (rhs.content as string).length;
			}
			default:
				return 0;
		}
	};

const fakePosts = [...new Array(5).keys()].map(() => ({
	id: globalThis.crypto.randomUUID(),
	title: [
		"Lorem Ipsum",
		"Test Post",
		"Nothing interesting",
		"Another title (bites the dust)",
	][Math.floor(Math.random() * 4)],
	content:
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam deleniti voluptatem optio expedita aliquam veritatis repudiandae, saepe corporis id, rerum voluptas quisquam illum veniam odio tenetur vitae consequatur, voluptate voluptatibus.".slice(
			0,
			Math.ceil(Math.random() * 244),
		),
}));
