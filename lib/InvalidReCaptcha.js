
function InvalidReCaptcha(errorCodes) {
	this.name = 'InvalidReCaptcha';
	this.errorCodes = errorCodes;
	Error.call(this, 'ReCaptcha is invalid');
	Error.captureStackTrace(this, arguments.callee);
}

module.exports = InvalidReCaptcha;