const express = require('express');
const filter = require('./search-filter');
const router = express.Router();

const popularSearches = ['Pizza', 'Chinese', 'Sushi', 'Thai', 'Indian', 'Mexican'];
const recentSearches = [];

router.get('/', function(req, res, next) {
    res.send('listening to api');
});

router.get('/search', function(req, res, next) {
    const {query} = req.query;
    const matchedSearched = {
        recent: recentSearches.filter(filter(query)),
        popular: popularSearches.filter(filter(query))
    };
    res.send(JSON.stringify(matchedSearched));
});

router.post('/search', function(req, res, next) {
    const {query} = req.body;
    if (recentSearches.indexOf(query) === -1) {
        recentSearches.unshift(query);
    }
    res.send(JSON.stringify({success: true}));
});
router.delete('/search', function(req, res, next) {
    const data = JSON.parse(req.query.data);
    data.forEach(s => {
        const i = recentSearches.indexOf(s);
        if (i !== -1) {
            recentSearches.splice(i, 1);
        }
    });
    res.send(JSON.stringify({success: true}));
});

module.exports =  router;

