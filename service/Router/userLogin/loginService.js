const { User } = require('../../model/userModel.js');
const _ = require('lodash')

var userService = {
    createUser: (req) => {
        var reqParams = _.pick(req.body, ['emailID', 'userName', 'password', 'gender'])
        var newUser = new User(reqParams)
        newUser.userID = newUser.generateUserID()
        return newUser.save().then((result) => {
            var resultData = _.pick(result, ['emailID', 'userID', 'userName']);
            resultData.x_auth = newUser.generateToken()
            return resultData
        }).catch((err) => {
            return err
        })
    },
    updateUser: (req) => {
        return User.findOneAndUpdate(req.params.userID, req.body)
    },
    getUser: (req) => {
        var reqParam = _.pick(req.params,['userID'])
        return User.find(reqParam).then((resullt)=>{
            if (!result.length) {
                var err = {
                    errmsg: "Invalid User ID"
                }
                throw err
            } else {
                var resultData = _.pick(result[0],['emailID','userID', 'userName','gender'])
                return resultData
            }
        }).catch((err) => {
            return err
        })
    },
    login: (req) => {
        var reqParam = _.pick(req.body, ['emailID', 'password']);
        var newUser = new User(reqParam)
        return User.find(reqParam).then((result) => {
            if (!result.length) {
                var err = {
                    errmsg: "Invalid EmailID / Password Pair"
                }
                throw err
            } else {
                var resultData = _.pick(result[0],['emailID','userID', 'userName'])
                resultData.x_auth = newUser.generateToken();    
                resultData.msg = "Successfully Logged In";
                return resultData
            }

        }).catch((err) => {
            return err
        })
    }
}

module.exports = { userService }