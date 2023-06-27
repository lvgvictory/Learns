const { parseObject } = require("../../utils/mongoose");
const Course = require("../models/Course");

class CourseController {
    // [GET] /courses/:slug
    async show(req, res, next) {
        const { slug } = req.params
        try {
            const course = await Course.findOne({ slug })

            return res.render('courses/show', {
                course: parseObject(course)
            })
        } catch (error) {
            next(error)
        }
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /courses/store
    async store(req, res, next) {
        const formData = Object.assign({}, req.body, {
            image: 'https://hinhanhdephd.com/wp-content/uploads/2019/05/hinh-anh-dep-lam-hinh-nen-dep-2.jpg'
        })

        try {
            const course = await Course.create(formData)

            return res.redirect(`/courses/${req.body.name}`)
        } catch (error) {
            next(error)
        }
    }

    // [GET] /courses/:id/create
    async edit(req, res, next) {
        try {
            const course = await Course.findById(req.params.id)

            return res.render('courses/edit', {
                course: parseObject(course)
            })
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const course = await Course.updateOne({_id: req.params.id}, req.body)
            
            return res.redirect('/me/stored/courses')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CourseController();
