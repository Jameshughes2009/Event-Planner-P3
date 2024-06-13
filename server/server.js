const express = require("express");
const { ApolloServer } = require("apollo-server-express")
const path = require("path")

const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection')

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });
    db.once("open", () => {
        app.listen(PORT, () => {
            console.log(`We are Succesfully Running on port ${PORT}!`);
            console.log(
                `Connect to Graph testing http://localhost:${PORT}${server.graphqlPath}`
            );
        })
    })
};

startApolloServer(typeDefs, resolvers);