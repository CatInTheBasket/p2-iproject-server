
const { Post, Type, User, History } = require("../models/index.js")
const { tokenToPayload } = require("../helper/jwt");

class Controller {

    static async getHistory(req, res, next) {
        try {
            console.log("History access"+req.user)
            const history = await History.findAll(
                
                {where:{UserId:req.user.id},
                    include: [{
                model: Post,
                attributes: ["name"],
            }, {
                model: User,
                attributes: ["email"]
            }]});

            if (!history) {
                throw { statusCode: 400, name: "NO HISTORY" };
            }

            res.send(history);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller