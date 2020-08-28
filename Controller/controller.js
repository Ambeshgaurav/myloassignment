
const servicemysql = require('../Services/service');
const jwt1 = require('../Middleware/Auth')
const bcrypt = require("bcryptjs")
const User_role = require('../Middleware/role')
const response = require('../ErrorFile/response')

async function Login(req, res) {
  try {
    let data = {
      email: req.body.email,
      password: req.body.password
    }
    const result = await servicemysql.loginDataMysql(data)
    if (!result.length) {
      response.invalidEmailResponse(res, {}, "email doesn't exits ", 409)

    }
    var data1 = await bcrypt.compare(data.password, result[0].password);
    if (data1 == true) {
      let token = {
        id: data.email,
        key: process.env.JWT_SECRET
      }
      console.log(token);
      const Token_result = await jwt1.generateToken(token)
      res.json({
        message: "login successfull",
        status: 200,
        data: result,
        token: Token_result
      })
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

    var hashname = await bcrypt.hash(req.body.password, 10)
    let data = {
      name: req.body.name,
      email: req.body.email,
      password: hashname,
      phone: req.body.phone,
      role: req.body.role
    }
    const result = await servicemysql.signupDataMysql(data)
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

async function Update(req, res) {
  try {
    let data = req.body; 
    let access_token = req.headers.access_token;
    let user_email = await jwt1.decodeToken(access_token)
    var update_Data = {}
    if (data.name) {
      update_Data.name = data.name;

    }
    if (data.phone_number) {
      update_Data.phone_number = data.phone_number;
    }
    if (data.password) {
      var hash_password = await bcrypt.hash(data.password, 10)
      update_Data.password = hash_password;
    }
    update_Data.email = user_email
    let user_role = await servicemysql.ReadDataMysql(user_email)
    let role = user_role[0].role; 
    let value = Object.prototype.hasOwnProperty.call(User_role, role)
    if (value == true) {
      let role1 = User_role[role];
      let confirmation_role = role1.find((data) => data == 'update')
      if (confirmation_role != undefined) {
        let result = await servicemysql.updateDataMysql(update_Data)
        response.actionCompleteResponse(res, result, "updated successful", 200)
      }
      else {
        response.sendError(res, {}, "Not authorized to peroform operations", 403)

      }
    }
    else {

      response.authenticationErrorResponse(res, {}, "user not found", 404)
    }
  } catch (err) {
    response.authenticationErrorResponse(res, {}, err, 404)
  };
}
async function ReadData(req, res) {
  try {
    let access_token = req.headers.access_token;
    let user_email = await jwt1.decodeToken(access_token)
    let user_role = await servicemysql.ReadDataMysql(user_email)
    let role = user_role[0].role;
    let value = Object.prototype.hasOwnProperty.call(User_role, role)
    if (value == true) {
      let role1 = User_role[role];
      let confirmation_role = role1.find((data) => data == 'read')
      if (confirmation_role != undefined) {
        let result = await servicemysql.ReadDataMysql(user_email)
        response.actionCompleteResponse(res, result, "getting data", 200)
      }
      else {

        response.parameterMissingResponse(res, {}, "Not authorized to peroform operations", 403)
      }
    }
    else {

      response.badRequest(res, {}, "user not found", 404)
    }
  }
  catch (err) {
    response.authenticationErrorResponse(res, {}, err, 404)

  }

}
async function DeleteData(req, res) {
  try {

    let access_token = req.headers.access_token;
    let user_email = await jwt1.decodeToken(access_token)
    let user_role = await servicemysql.ReadDataMysql(user_email)
    let role = user_role[0].role;
  
    
    let value = Object.prototype.hasOwnProperty.call(User_role, role)
   
    
    if (value == true) {
      let role1 = User_role[role];
      let confirmation_role = role1.find((data) => data == 'delete')
     
      
      if (confirmation_role != undefined) {
        let result = await servicemysql.deleteUserMysql(user_email)
        response.sendSuccess(res, {}, "user succeesfully deleted", 200)

      }
      else {

        response.authenticationErrorResponse(res, {}, "Not authorized to peroform operations", 403)
      }
    }
    else {
      response.badRequest(res, {}, "user not found", 404)

    }



  } catch (err) {
    response.authenticationErrorResponse(res, {}, err, 404)
  };

}


module.exports = {
  Login, Login,
  Register: Register,
  Update: Update,
  ReadData: ReadData,
  DeleteData: DeleteData
}
