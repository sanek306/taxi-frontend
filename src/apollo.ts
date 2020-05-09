import ApolloClient, { Operation } from "apollo-boost";

const client = new ApolloClient({
    clientState: {
        defaults: {
            auth: {
                isLoggedIn: Boolean(localStorage.getItem("jwt")),
                __typename: "Auth"
            }
        },
        resolvers: {
            Mutation: {
                logUserIn: (_, { token }, { cache }) => {
                    localStorage.setItem("jwt", token);
                    cache.writeData({
                        data: {
                            auth: {
                                isLoggedIn: true,
                                __typename: "Auth"
                            }
                        }
                    });
                    return null;
                },
                logUserOut: (_, __, { cache }) => {
                    localStorage.removeItem("jwt");
                    cache.writeData({
                       data: {
                           auth: {
                               isLoggedIn: false,
                               __typename: "Auth"
                           }
                       }
                    });
                    return null;
                }
            }
        }
    },
    uri: 'http://localhost:4000/graphql',
    request: async (operation: Operation) => {
        operation.setContext({
            headers: {
                "X-JWT": localStorage.getItem("jwt") || ""
            }
        });
    }
});

export default client;