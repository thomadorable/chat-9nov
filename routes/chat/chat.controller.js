/*
Import
*/
    const ChatModel = require('../../models/chat.model');
    const jwt = require('jsonwebtoken');
//

/*
Functions
*/

const post = body => {
    const decoded = jwt.decode(body.token);

    return new Promise( (resolve, reject) => {
        if(decoded && decoded._id && decoded._id.length > 0){

            ChatModel.create({
                date: Date.now(),
                message: body.message,
                user: decoded._id
            }, (error, newChat) => {
                if(error){ 
                    return reject(error)
                }
                else{ 
                    return resolve(newChat);
                };
            });
        }
        else{
            return reject('Please use a valide token')
        };
    });
}

const read = () => {
    return new Promise( (resolve, reject) => {
        ChatModel.find({}, (error, messages) => {
            if(error){ // Mongo Error
                return reject(error)
            }
            else {
                return resolve(messages)
            }
        });
    });
}

const remove = body => {
    const decoded = jwt.decode(body.token);

    return new Promise( (resolve, reject) => {
        if(decoded && decoded._id && decoded._id.length > 0){

            ChatModel.findOne({"_id" : body.id, user: decoded._id}, (error, message) => {
                if(error){ // Mongo Error
                    return reject(error)
                }
                else if (message) {
                    ChatModel.deleteOne({ "_id" : body.id }, (error, message) => {
                        if(error){ // Mongo Error
                            return reject(error)
                        } else {
                            return resolve(message);
                        }
                    });
                    
                } else {
                    return reject('This message doesn\'t exist or this is not yours....')
                }
            });
        }
        else{ 
            return reject('Please use a valide token')
        };
    });
}


/*
Export
*/
module.exports = {
    post,
    read,
    remove
}
//