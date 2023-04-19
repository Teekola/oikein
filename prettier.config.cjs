/** @type {import("prettier").Config} */
module.exports = {
	plugins: [require.resolve("prettier-plugin-tailwindcss")],
	endOfLine: "lf",
	trailingComma: "es5",
	tabWidth: 3,
	printWidth: 90
};
