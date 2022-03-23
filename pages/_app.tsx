import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "styles/theme";
import createEmotionCache from "lib/createEmotionCache";
import Nav from "components/Nav";
import { LicenseInfo } from "@mui/x-data-grid-pro";

LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_X_LICENSE_KEY || "");

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface KbAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

function KbApp(props: KbAppProps) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;
    const { title } = pageProps;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>{title || "Cofactr"}</title>
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
                <meta property="og:title" content="eng kb" key="title" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Nav />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
}

export default KbApp;
