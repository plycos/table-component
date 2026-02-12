import { defineConfig, type OutputOptions } from 'rolldown'
import minifyHTML from 'rollup-plugin-minify-html-template-literals'

function componentOutput(): OutputOptions | OutputOptions[] | undefined {
	return {
		dir: 'dist',
		format: 'esm',
		entryFileNames: '[name].js',
		codeSplitting: false,
		minify: true,
	}
}

export default defineConfig([
	{
		input: 'src/data-grid.ts',
		plugins: [minifyHTML()],
		output: componentOutput(),
	},
	{
		input: 'src/simple-table.ts',
		plugins: [minifyHTML()],
		output: componentOutput(),
	},
	// input: {
	// 	"simple-table": "src/simple-table.ts",
	// 	"data-grid": "src/data-grid.ts",
	// },
	// output: {
	// 	dir: "dist",
	// 	format: "esm",
	// 	entryFileNames: "[name].js",
	// 	codeSplitting: false,
	// 	minify: true,
	// },
])
