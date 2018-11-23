/*
Imports
*/
const express = require('express');
const chatRouter = express.Router({ mergeParams: true });

const { checkFields } = require('../../services/request.checker.js');
const { sendFieldsError } = require('../../services/server.response.js');

const { read, post, remove } = require('./chat.controller');
//

/*
Routes definition
*/
class ChatRouterClass {
    routes(){
        // HATEOAS
        chatRouter.get('/', (req, res) => {
            res.json('HATEOAS for chat');
        });

        // READ MESSAGE
        chatRouter.get('/read', (req, res) => {
            read()
            .then( apiResponse => res.json(apiResponse) )
            .catch( apiResponse => res.json(apiResponse) )
        });

        // ADD MESSAGE
        chatRouter.post('/post', (req, res) => {
            const { miss, extra, ok } = checkFields (
                ['token', 'message'],
                req.body,
            )
            if (!ok) {
                sendFieldsError(res, 'Bad fields provided', miss, extra)
            } else {
                post(req.body)
                .then( apiResponse => res.json(apiResponse) )
                .catch( apiResponse => res.json(apiResponse) )
            }
        });

         // DELETE MESSAGE
         chatRouter.delete('/delete', (req, res) => {
            const { miss, extra, ok } = checkFields (
                ['token', 'id'],
                req.body,
            )
            if (!ok) {
                sendFieldsError(res, 'Bad fields provided', miss, extra)
            } else {
                remove(req.body)
                .then( apiResponse => res.json(apiResponse) )
                .catch( apiResponse => res.json(apiResponse) )
            }
        });
        
    };

    init(){
        this.routes();
        return chatRouter;
    }
}
//

/*
Export
*/
module.exports = ChatRouterClass;
//