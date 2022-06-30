const colors = require('tailwindcss/colors')

module.exports = {
	purge    : [],
	darkMode : false, // or 'media' or 'class'
	theme    : {
		extend : {
			outline : {
				white : '2px solid #FFFFFF'
			}
		},
		colors : {
			green : {
				spotify : '#1DB954'
			},
			blue  : {
				light : '#0D1A8E',
				dark  : '#13043F'
			},
			white : '#FFFFFF',
			red   : {
				main : '#E61565'
			},
			black: '#000000',
			purple: colors.purple,
			pink: colors.pink,
			indigo: colors.indigo
		}
	},
	variants : {
		extend : {}
	},
	plugins  : []
};
