
		// return html`
		// 	<table>
		// 		<thead>
		// 		${repeat(
		// 			table.getHeaderGroups(),
		// 			(headerGroup) => headerGroup.id,
		// 			(headerGroup) => html`
		// 				<tr>
		// 					${repeat(
		// 						headerGroup.headers,
		// 						(header) => header.id,
		// 						(header) => html`
		// 							<th>
		// 								${
		// 									!header.isPlaceholder
		// 										? flexRender(
		// 												header.column.columnDef.header,
		// 												header.getContext(),
		// 											)
		// 										: null
		// 								}
		// 							</th>
		// 						`,
		// 					)}
		// 				</tr>
		// 			`,
		// 		)}
		// 		</thead>
		// 		<tbody>
		// 		${repeat(
		// 			table.getRowModel().rows,
		// 			(row) => row.id,
		// 			(row) => html`
		// 				<tr>
		// 					${repeat(
		// 						row.getVisibleCells(),
		// 						(cell) => cell.id,
		// 						(cell) => html`
		// 							<td>
		// 								${flexRender(cell.column.columnDef.cell, cell.getContext())}
		// 							</td>
		// 						`,
		// 					)}
		// 				</tr>
		// 			`,
		// 		)}
		// 		</tbody>
		// 	</table>
		// `