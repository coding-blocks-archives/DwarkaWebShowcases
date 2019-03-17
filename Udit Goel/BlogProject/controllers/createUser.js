module.exports = (req, res) => {
    res.render('register', {
        errors: req.flash('registrationErrors')
    })
}
