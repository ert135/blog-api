var mongoose_1 = require('mongoose');
var CommentSchema = new mongoose_1.Schema({
    text: String,
    user: String,
    userName: String,
    postedOn: {
        type: Date,
        default: Date.now
    }
});
exports.CommentSchema = CommentSchema;
var comment = mongoose_1.model('Comment', CommentSchema);
exports.comment = comment;
