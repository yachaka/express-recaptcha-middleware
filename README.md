# express-recaptcha-middleware
Validates Google ReCaptcha, and rejects the request on error.  

[Dependency](#dependency)  
[Usage](#usage)  
[Errors](#errors)  
[Full example](#full-example-with-express)

```sh
npm install --save express-recaptcha-middleware
```

### Dependency

Requires `body-parser.urlencoded()` middleware. 

### Usage
```js
var ReCaptchaMiddleware = require('express-recaptcha-middleware')('YOUR_GOOGLE_RECAPTCHA_SECRET');

express.post('/contact', ReCaptchaMiddleware('recaptcha-field-name'), routeHandler);
```

### Errors
* `NotFoundReCaptcha` ReCaptcha is missing from `req.body`
* `InvalidReCaptcha` ReCaptcha has been rejected by Google's servers  
  * prop `errorCodes`: contains any errorCode returned

### Full Example with Express

```js
var express = require('express')()
    , bodyParser = require('body-parser')
    , ReCaptchaMiddleware = require('express-recaptcha-middleware')('YOUR_GOOGLE_RECAPTCHA_SECRET');

express.use(bodyParser.urlencoded({extended: false}));

express.post('/new-post',
    ReCaptchaMiddleware('recaptcha-field-name'), // ReCaptcha field name defaults to `g-recaptcha-response`
    function (req, res, next) {
        /*
        * ReCaptcha has been validated
        */
    }
);

express.use(function (err, req, res, next) {
    if (err.name === 'NotFoundReCaptcha')
        // ReCaptcha is missing from req.body
    else if (err.name === 'InvalidReCaptcha')
        /* ReCaptcha has been rejected by Google's servers.
        *  Check err.errorCodes and https://developers.google.com/recaptcha/docs/verify#error-code-reference for more information */
});

express.listen(1337);
```
