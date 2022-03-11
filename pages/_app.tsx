import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import MainLayout from "components/layout/MainLayout";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

import "../styles/globals.css";

const AuthorizedApolloProvider: FC = ({ children }) => {
    const httpLink = createHttpLink({
        uri: process.env.NEXT_PUBLIC_REACT_APP_SLASH_GRAPHQL_ENDPOINT,
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                "Content-Type": "application/json",
                "X-Auth-Token":
                    process.env.NEXT_PUBLIC_REACT_APP_SLASH_GRAPHQL_TOKEN,
            },
        };
    });

    const apolloClient = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        queryConcept: {
                            // Prefer incoming over existing data.
                            merge: false,
                        },
                        queryApplication: {
                            merge: false,
                        },
                    },
                },
            },
        }),
    });

    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

function App({ Component, pageProps }: AppProps) {
    const { title } = pageProps;
    const { route } = useRouter();

    return (
        <>
            <Head>
                <title>{title || "Cofactr"}</title>
                <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta property="og:title" content="eng kb" key="title" />
            </Head>
            <AuthorizedApolloProvider>
                <MainLayout route={route}>
                    <Component {...pageProps} />
                </MainLayout>
            </AuthorizedApolloProvider>
        </>
    );
}

export default App;
