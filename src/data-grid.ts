import { html, LitElement, type PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import {
	flexRender,
	getCoreRowModel,
	TableController,
	type ColumnDef,
	type SortingFn,
	type SortingFnOption,
	type SortingState,
	getSortedRowModel,
} from '@tanstack/lit-table'

type Row = Record<string, unknown>

@customElement('data-col')
export class DataCol extends LitElement {
	@property() field!: string
	@property() label!: string
	@property({ type: Boolean }) sortable = false
	@property() sortingFn: SortingFnOption<Row> = 'auto'
}

@customElement('data-grid')
export class DataGrid extends LitElement {
	protected override createRenderRoot() {
		return this
	}

	private tableController = new TableController<Row>(this)

	@property({ attribute: false })
	cols: ColumnDef<Row>[] = []

	@property({
		converter: {
			fromAttribute: (value) => (value ? JSON.parse(value) : []),
		},
	})
	data: Row[] = []

	@state()
	sorting: SortingState = []

	@property({ attribute: false })
	sortingFns: Record<string, SortingFn<Row>> = {}

	private sortAscTemplate: HTMLTemplateElement | null = null
	private sortDescTemplate: HTMLTemplateElement | null = null

	protected firstUpdated(_changedProperties: PropertyValues) {
		super.firstUpdated(_changedProperties)

		this.sortAscTemplate =
			this.querySelector<HTMLTemplateElement>('template[sort-asc]')
		this.sortDescTemplate = this.querySelector<HTMLTemplateElement>(
			'template[sort-desc]',
		)

		this.cols = [...this.querySelectorAll<DataCol>('data-col')].map((col) => {
			const children = col.children
			return {
				accessorKey: col.field,
				header: col.label,
				enableSorting: col.sortable,
				sortingFn: col.sortingFn,
				...(children.length > 0 && {
					cell: (context) => this.renderTemplate(children, context),
				}),
			}
		})
	}

	private renderTemplate(
		children: HTMLCollection,
		context: { row: { original: Row }; getValue: () => unknown },
	) {
		const fragment = document.createDocumentFragment()
		for (const node of children) {
			fragment.appendChild(node.cloneNode(true))
		}
		const defaultValue = String(context.getValue() ?? '')
		const row = context.row.original
		for (const el of fragment.querySelectorAll('*')) {
			for (const attr of [...el.attributes]) {
				if (attr.name === 'bind-text') {
					el.textContent = attr.value ? String(row[attr.value]) : defaultValue
				} else if (attr.name.startsWith('bind-')) {
					const targetAttr = attr.name.slice(5)
					el.setAttribute(
						targetAttr,
						attr.value ? String(row[attr.value]) : defaultValue,
					)
				}
			}
		}
		return fragment
	}

	private renderSortIndicator(sorted: false | 'asc' | 'desc') {
		if (sorted === 'asc' && this.sortAscTemplate) {
			return this.sortAscTemplate.content.cloneNode(true)
		}
		if (sorted === 'desc' && this.sortDescTemplate) {
			return this.sortDescTemplate.content.cloneNode(true)
		}
		return null
	}

	render() {
		const table = this.tableController.table({
			columns: this.cols,
			data: this.data,
			sortingFns: this.sortingFns,
			state: {
				sorting: this.sorting,
			},
			onSortingChange: (updaterOrValue) => {
				if (typeof updaterOrValue === 'function') {
					this.sorting = updaterOrValue(this.sorting)
				} else {
					this.sorting = updaterOrValue
				}
			},
			getSortedRowModel: getSortedRowModel(),
			getCoreRowModel: getCoreRowModel(),
		})

		return html`
			<table>
				<thead>
				${repeat(
					table.getHeaderGroups(),
					(headerGroup) => headerGroup.id,
					(headerGroup) => html`
						<tr>
							${repeat(
								headerGroup.headers,
								(header) => header.id,
								(header) => html`
                  <th
                    @click=${header.column.getToggleSortingHandler()}
                    style=${header.column.getCanSort() ? 'cursor: pointer; user-select: none;' : ''}
										data-sortable="${header.column.getCanSort()}"
                  >
                    ${
                      !header.isPlaceholder
                        ? flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                        : null
                    }
                    ${this.renderSortIndicator(header.column.getIsSorted())}
                  </th>
                `,
							)}
						</tr>
					`,
				)}
				</thead>
				<tbody>
				${repeat(
					table.getRowModel().rows,
					(row) => row.id,
					(row) => html`
						<tr>
							${repeat(
								row.getVisibleCells(),
								(cell) => cell.id,
								(cell) => html`
									<td>
										${flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								`,
							)}
						</tr>
					`,
				)}
				</tbody>
			</table>
		`
	}
}
