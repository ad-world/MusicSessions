const router = require('express').Router();
const passport = require('passport');
const url = require('url');
const SpotifyStrategy = require('passport-spotify').Strategy;
const user_actions = require('../../../controllers/users/actions');

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

var persistable = {};

passport.use(
	new SpotifyStrategy(
		{
			clientID     : process.env.CLIENT_ID,
			clientSecret : process.env.CLIENT_SECRET,
			callbackURL  : 'http://localhost:3000/api/auth/callback'
		},
		async function (accessToken, refreshToken, expires_in, profile, done) {
			const data = {
				name          : profile.displayName,
				email         : profile.emails[0].value,
				spotify_id    : profile.id,
				token         : accessToken,
				refresh_token : refreshToken,
				expires_in    : expires_in
			};

			let res = await user_actions.create_user(data);

			persistable.id = res.id;
			persistable.name = data.name;
			persistable.token = accessToken;
			persistable.refresh_token = refreshToken;
			persistable.product = profile.product;
			persistable.expires_in = expires_in;

			return done(null, profile);
		}
	)
);

router.get(
	'/auth/spotify',
	passport.authenticate('spotify', {
		scope      : [
			'user-read-email',
			'user-read-private',
			'user-modify-playback-state',
			'user-read-currently-playing',
			'user-read-playback-state'
		],
		showDialog : true
	})
);

router.get('/auth/callback', passport.authenticate('spotify', { failureRedirect: '/' }), function (req, res) {
	// Successful authentication, redirect home.
	res.redirect(
		url.format({
			pathname : '/api/login',
			query    : {
				id            : persistable.id,
				name          : persistable.name,
				token         : persistable.token,
				refresh_token : persistable.refresh_token,
				product       : persistable.product,
				expires_in    : persistable.expires_in
			}
		})
	);
});

module.exports = router;
