/** @type {import("prettier").Config} */
module.exports = {
	plugins: [
		"@trivago/prettier-plugin-sort-imports",
		"prettier-plugin-tailwindcss" // MUST come last
	],
	endOfLine: "lf",
	trailingComma: "es5",
	tabWidth: 3,
	printWidth: 90,
	importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	tailwindFunctions: ['clsx']
};
