const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

const store = require('./playstore.js');
// default get should display
// query parameters = sort and geners
app.get('/apps', (req, res) => {
	let { rating = '', genres = '' } = req.query;
	// checks if rating is present
	if (rating) {
		// parse rating to be a number (query is a duafualt string)
		rating = parseInt(rating);
		// check if rating is present, and checks for valid rating
		if (!rating || rating < 0 || rating > 5) {
			return res.status(400).send('please enter a valid rating!');
		}
	}

	let results = store.filter((rate) => rate.Rating);
	// validates store is sorted by rating
	if (rating) {
		results.sort((a, b) => {
			return a.Rating > b.Rating ? 1 : a.Rating < b.Rating ? -1 : 0;
		});
	}

	let includesGenres = [ 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card' ].includes(genres);
	// validates if genres is present and is a valid genres
	if (genres && !includesGenres) {
		return res.status(400).send('Please enter a valid genre!');
	}

	let storeGenres = store.filter((genre) => genre.Genres.includes(genres));

	// default return if only /apps is requested
	res.json(storeGenres);
});

module.exports = app;
