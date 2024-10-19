"use client";

import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "@/lib/apollo";

export function Providers(props: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
}
