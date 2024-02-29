const { apiPrefix } = require('../config/default.json')

module.exports = (app) => {
    app.use(`${apiPrefix}/user`, require('./user.routes'));
    app.use(`${apiPrefix}/chat`, require('./chat.routes'));
    app.use(`${apiPrefix}/message`, require('./message.routes'));
}