
function NotFoundReCaptcha(field) {
	this.name = 'NotFoundReCaptcha';
	this.reCaptchaField = field;
	Error.call(this, 'ReCaptcha not found in the request ; POST field', field, 'was searched');
	Error.captureStackTrace(this, arguments.callee);
}

module.exports = NotFoundReCaptcha;