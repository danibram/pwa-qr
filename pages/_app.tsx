import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import theme from "../src/theme";

export default function MyApp(props: AppProps) {
    let { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>QR</title>
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
