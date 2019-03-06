const mongoose = require("mongoose");
const User = mongoose.model("User");
const promisify = require('es6-promisify')
exports.loginForm = (req, res) => {
	res.render('login', {title: 'login'})
}

exports.registerForm= (req, res) => {
	res.render('register', {title: 'Register'})
}

exports.validateRegister = (req, res, next) =>{
	req.sanitizeBody('name');
	req.checkBody('email', 'Email field cannot be Empty').notEmpty();
	req.checkBody('email').isEmail();
	req.sanitizeBody('email').normalizeEmail({
		remove_dots: false,
		remove_extensions: false,
		gmail_remove_subaddresses: false
	});
	req.checkBody('password', 'password cannot be empty').notEmpty();
	req.checkBody('password-confirm', 'confirm-password cannot be blank').notEmpty();
	req.checkBody('password-confirm', 'password do not match').equals(req.body.password);
	const errors = req.validationErrors();
	if(errors){
		req.flash('error', errors.map(err => err.msg));
		res.render('register', {title: 'Register', body: req.body, flashes: req.flash()});
		return;
	}
	else{
		next();
	}
}

exports.register = async (req, res, next) => {
	const user = new User({email: req.body.email, name: req.body.name})
	 const register = promisify(User.register, User);
	 await register(user, req.body.password);
	 next();
}

exports.account = (req, res) => {
	res.render('account', {title: 'Edit Your Profile'});
}

exports.updateAccount = async(req, res) => {
	const updates = {
		name: req.body.name,
		email: req.body.email
	};

	const user = await User.findByIdAndUpdate(
		{_id: req.user._id},
		{$set: updates},
		{new: true, runValidator: true, context: 'query'}
	);
	req.flash('success', 'successfully updated profile!')
	res.redirect('back');
}

