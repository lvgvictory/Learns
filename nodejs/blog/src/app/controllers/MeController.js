const { parseObject, parseArray } = require("../../utils/mongoose");
const Course = require("../models/Course");

class CourseController {
    // [GET] /me/stored/courses
    async sotredCourses(req, res, next) {
        try {
            const courses = await Course.find({})

            return res.render('me/stored-courses', {
                courses: parseArray(courses)
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CourseController();
