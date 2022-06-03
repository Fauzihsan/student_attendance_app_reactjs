import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://apk-absensi-ftunsur.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "RXVzYet1zFLDWmRtb7F6idytDFom7P2ISDj2DgxOh4OmkInfq3kiQY7BSOWnVXnv",
  },
});

const wsLink = new WebSocketLink({
  uri: "wss://apk-absensi-ftunsur.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": "RXVzYet1zFLDWmRtb7F6idytDFom7P2ISDj2DgxOh4OmkInfq3kiQY7BSOWnVXnv",
      },
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
