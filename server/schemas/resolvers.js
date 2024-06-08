const { User, Event } = require("../models")
const {AuthenticationError} = require("apollo-server-express");
const {signToken} = require("../utils/auth");
// const { Query } = require("mongoose");

const resolvers = {
    Query: {
        users: async () => User.find().populate("events"),
        user: async (_, {id}) => User.findById(id).populate("events"),
        events: async () => Event.find().populate("user"),
        event: async (_, {id }) => Event.findById(id).populate("user"),
    },

    // now Mutations:{}
    Mutation: {
        createUser: async (_, args) => {
            const user = await User.create(args)
            if(!user) {
                throw new Error("Error while trying to Create user");
            }
            const token = signToken(user);
            return { token, user};
        },

        createEvent: async (_, args) => {
            const event = await Event.create(args)
            if (!event) {
                throw new Error("Creation Failed");
            }
            await User.findByIdAndUpdate(event.user, {$push: {events: event._id} });
            return event
        },

        login: async(_, {email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("No user found");
            }
            const correctPassword = await user.checkPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError("Invalid Password");
            }
            const token = signToken(user);
            return {token, user}
        },

        updateEvent: async (_, {id, ...rest }) => {
            return Event.findByIdAndUpdate(id, rest, {new: true}).populate("user");
        },

        // delete function i beleive
        deleteEvent: async (_, { id }) => {
            await Event.findByIdAndDelete(id);
            return true;
        },
    },
};


module.exports = resolvers;