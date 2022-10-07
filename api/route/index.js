
module.exports = function(app) {
    const studentController = require('../controller/oneToOne')
    app.route('/student')
        .get(studentController.getStudent)
        .post(studentController.addOneToOne)
    app.route('/student/link')
        .post(studentController.addTeacherWithLink)
    app.route('/student/delete')
        .delete(studentController.deleteTeacherOneToOne)
        .put(studentController.updateTeacher)
    }