const Course = require('../models/Course');
const { parseArray } = require('../../utils/mongoose')

class SiteController {
    // [GET] /home
    async home(req, res, next) {
        try {
            const courses = await Course.find({});
            
            return res.render('home', {
                courses: parseArray(courses)
            })
        } catch (err) {
            next(err)
            // res.status(400).json({ error: err });
        }
    }

    // [GET] /search
    search(req, res) {
        res.send('search');
    }
}

module.exports = new SiteController();
