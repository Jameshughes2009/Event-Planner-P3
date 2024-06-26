const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
    {
        comment_text: {
            type: String,
            required: true,
            minlength: 1,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        event_id: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment