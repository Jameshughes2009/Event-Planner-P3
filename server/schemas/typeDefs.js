const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        id: ID
        username: String
        email: String
        password: String
        events: [Event]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Event {
        id: ID!
        title: String!
        description: String!
        cost: Float!
        location: String!
        user: User
        date: String!
    }
`;
module.exports = typeDefs