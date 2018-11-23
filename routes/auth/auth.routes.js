/*
Imports
*/
    const express = require('express');
    const authRouter = express.Router({ mergeParams: true });
    const { register, login } = require('./auth.controller');
    const { checkFields } = require('../../services/request.checker.js');
    const { sendFieldsError } = require('../../services/server.response.js');
//

/*
Routes definition
*/
    class AuthRouterClass {
        routes(){
            // HATEOAS
            authRouter.get('/', (req, res) => {
                res.json('HATEOAS for auth');
            });
            
            // Register
            authRouter.post('/register', (req, res) => {
                const { miss, extra, ok } = checkFields (
                    ['first_name', 'last_name', 'email', 'password'],
                    req.body,
                )
                // Check oppropriated values
                if (!ok) {
                    sendFieldsError(res, 'Bad fields provided', miss, extra)
                } else {
                     // Use controller function
                    register(req.body)
                    .then( apiResponse => res.json(apiResponse) )
                    .catch( apiResponse => res.json(apiResponse) )
                }
            });

            // Login
            authRouter.post('/login', (req, res) => {
                const { miss, extra, ok } = checkFields(['email', 'password'], req.body)
                // Check oppropriated values
                if (!ok) {
                    sendFieldsError(res, 'Bad fields provided', miss, extra)
                } else {
                    // Use controller function
                    login(req.body)
                    .then( apiResponse => res.json(apiResponse) )
                    .catch( apiResponse => res.json(apiResponse) )
                }

            });
        };

        init(){
            this.routes();
            return authRouter;
        }
    }
//

/*
Export
*/
    module.exports = AuthRouterClass;
//