

module.exports = class HomePages {
    constructor() {}

    async get(req, res, next) {
        try {
            
            return res.render('home/home')
        } catch (error) {
            return 
        }
    }
}