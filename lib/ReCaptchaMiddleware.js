
var https = require('https')
    , querystring = require('querystring')

    , InvalidReCaptcha = require('./InvalidReCaptcha')
    , NotFoundReCaptcha = require('./NotFoundReCaptcha')

module.exports = function (appSecret) {

    return function (recaptchaField) {

        if (!recaptchaField)
            recaptchaField = 'g-recaptcha-response';

        return function (req, res, next) {
            
            if (!req.body[recaptchaField])
                return next(new NotFoundReCaptcha(recaptchaField));


            var postData = querystring.stringify({
                secret: appSecret,
                response: req.body[recaptchaField],
                remoteip: req.ip
            });

            var options = {
                hostname: 'www.google.com',
                path: '/recaptcha/api/siteverify',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': postData.length
                }
            };

            var req = https.request(options, function (res) {
                var data = '';

                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    data = JSON.parse(data);
                    
                    if (data.success)
                        return next();
                    else
                        return next(new InvalidReCaptcha(data.errorCodes));
                });
            });

            req.on('error', next);

            req.write(postData);
            req.end();
        };
    };
};