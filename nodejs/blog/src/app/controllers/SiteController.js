const Course = require('../models/Course')

class SiteController {
    // [GET] /home
    async home(req, res) {
        try {
            const data = await Course.find({});
            res.json(data);
        }  catch (err) {
            res.status(400).json({error: err});
        }
    }

    // [GET] /search
    search(req, res) {
        res.send('search')
    }
}

module.exports = new SiteController