
exports.parameterMissingResponse = function (res, data,message,status) {
    var response = {
        "message": message,
        "status": status,
        "data": data || {}
    };
    res.send(JSON.stringify(response));
};

exports.authenticationErrorResponse = function (res, data,message,status) {
    var response = {
        "message": message,
        "status": status,
        "data": data || {}
    };
    res.send(JSON.stringify(response));
};

exports.sendError = function (res, data,message,status) {
    var response = {
        "message": message,
        "status": status,
        "data": data || {}
    };
    res.send(JSON.stringify(response));
};

exports.sendSuccess = function (res, data,message,status) {
    var response = {
        "message": message,
        "status": status,
        "data": data || {}
    };
    res.send(JSON.stringify(response));
};


exports.sendErrorWithStatusCode = function (res, data,message,status) {
    var response = {
        "message": message,
        "status": status,
        "data": data || {}
    };
    res.status(status).send(JSON.stringify(response));
};

exports.actionCompleteResponse = function (res, data,message,status) {
    var response = {
        "message": message,
        "status": status,
        "data": data || {}
    };
    res.send(JSON.stringify(response));
};

exports.invalidEmailResponse = function (res, data,message,status) {
    var response = {
        "message": message,
        "status": status,
        "data": data || {}
    };
    res.send(JSON.stringify(response));
};

exports.invalidNameResponse = function (res, data,message,status) {
    var response = {
        "message": message,
        "status": status,
        "data": data || {}
    };
    res.send(JSON.stringify(response));
};

exports.emailAlreadyRegistered = function (res, data,message,status) {
    var response = {
        "message": message,
        "status": status,
        "data": data || {}
    };
    res.send(JSON.stringify(response));
};

exports.badRequest = function (res, data,message,status) {
    var response = {
        "errors": [
            {
                "code": "bad_request"
            }
        ]
    };
    res.send(JSON.stringify(response));
};





