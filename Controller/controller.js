
const serviceMongodb = require('../Services/service');
const jwt1 = require('../Middleware/Auth')
const bcrypt = require("bcryptjs")
const User_role = require('../Middleware/role')
const response = require('../ErrorFile/response')
const emailService = require("./emailService")

async function Login(req, res) {
  try {
    let data = {
      email: req.body.email,
      password: req.body.password
    }
    const result = await serviceMongodb.findData(data)
    if (!result.length) {
      response.invalidEmailResponse(res, {}, "email doesn't exits ", 409)

    }
    let data1 = await bcrypt.compare(data.password, result[0].password);
    if (data1 == true) {
      let token = {
        id: data.email,
        key: process.env.JWT_SECRET
      }
      console.log(token);
      const Token_result = await jwt1.generateToken(token)
      result.access_token=Token_result
      response.actionCompleteResponse(res, result, "login successfull", 200)
    }
    else if (data1 == false) {

      response.authenticationErrorResponse(res, {}, "incorrect password", 401)
    }
  }
  catch (err) {

    response.authenticationErrorResponse(res, {}, err, 404)
  }

}
async function Register(req, res) {
  try {

    let hashname = await bcrypt.hash(req.body.password, 10)
    let data = {
      name: req.body.name,
      email: req.body.email,
      password: hashname,
      phone: req.body.phone
    }
    const result = await serviceMongodb.SaveUserDetails(data)
    if (result == 0) {

      response.invalidEmailResponse(res, {}, "email already exits", 409)
    }
    else {

      response.actionCompleteResponse(res, result, "Successful signup", 200)
    }
  }
  catch (err) {
    response.authenticationErrorResponse(res, {}, err, 404)
  }

}

async function forgotPassword(req, res) {
  try {

    let data = req.body;
    console.log("++++++++++++++++++++++++++++++++++++",data);
    const result = await serviceMongodb.findData(data)
    console.log("==222222222222222222222222",result);
    if (!result.length) {
      response.invalidEmailResponse(res, {}, "email doesn't exits ", 409)
    }
    if (result) {
      let OTP = Math.floor(100000 + Math.random() * 900000);
      let updateUserDetails = {
        forgot_password: 1,
        forgot_otp: OTP
      };
  console.log("=====777777777777777777777777",updateUserDetails);
      const toEmail = data.email;
      const emailBody = `<div>OTP for forgot your password ${OTP}. Do not share the OTP with anyone for security reasons.</div>`;
      const title = `Forgot Your Password`;

      await emailService.sendEmail(toEmail, title, emailBody);
      updateUserDetails.email = data.email;
      let update_data = await serviceMongodb.updateDetails(updateUserDetails)
      response.actionCompleteResponse(res, update_data, "Successful OTP sended", 200)
    }


  } catch (err) {
    response.authenticationErrorResponse(res, {}, err, 404)
  };
}

async function checkCode(req, res) {
  try {


    let data = req.body;
    const checkUser = await serviceMongodb.findData(data)
    console.log(checkUser);
    if (checkUser && checkUser.dataValues.forgot_password) {
      if (checkUser.dataValues.forgot_otp === req.body.code) {
        response.actionCompleteResponse(res, {}, "OTP matched", 200)

      } else {
        response.parameterMissingResponse(res, {}, "ENTER OTP doesn't MATCHED")
      }
    }
  } catch (err) {
    response.authenticationErrorResponse(res, {}, err, 404)
  }
}
async function resetPassword(req, res) {
  try {

    let data = req.body;
    const checkUser = await serviceMongodb.findData(data)
    if (checkUser && checkUser.dataValues.forgot_password) {
      let updateUserDetails = {
        password: await bcrypt.hash(req.body.password, 10),
        forgot_password: 0,
        forgot_otp: null
      };
      let updateUser = await serviceMongodb.updateDetails(updateUserDetails)
    }
    response.actionCompleteResponse(res, {}, "Password change Successfull", 200)
  } catch (err) {
    response.authenticationErrorResponse(res, {}, err, 404)
  }

}


module.exports = {
  Login, Login,
  Register: Register,
  forgotPassword: forgotPassword,
  checkCode: checkCode,
  resetPassword: resetPassword

}
