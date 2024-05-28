/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {
			colors: {
				primary: '#38B5E9',
				"primary-dark": '#2491BE',
				grey: '#D9D9D9',
				"grey-2": 'rgba(217, 217, 217, 0.3)',
			}
		},
	},
	plugins: [
		require('flowbite/plugin'),
	],
}
