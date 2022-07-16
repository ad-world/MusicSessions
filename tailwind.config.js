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
			white : '#edf2f4',
			red   : {
				main : '#E61565'
			},
			black: '#000000',
			purple: colors.purple,
			pink: colors.pink,
			indigo: colors.indigo,
			gray: colors.gray
		},
		fontFamily: {
			'body': ['"Inter"']
		}
	},
	variants : {
		extend : {}
	},
	plugins  : []
};
