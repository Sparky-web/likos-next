import React from 'react';
import Footer from "../components/Footer";
import "../css/Cart.css"

import {createTheme, ThemeProvider} from "@mui/material";
import "../css/App.css"
import "../css/Calculate.css"

import "../css/General.css"
import "../css/Gallery.css"
import axios from "axios";

import App from 'next/app'
import Navbar from "../components/Navbar";
import CartContextProvider from "../components/CartContext";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff6b35",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#2C365E",
        },
        type: "light"
    },
    typography: {}
});


function MyApp({Component, pages, pageProps}) {
    return (
        <>
            {/*<SEO/>*/}
            <ThemeProvider theme={theme}>
                <CartContextProvider>
                    <header><Navbar pages={pages}/></header>
                    <main>
                        <Component {...pageProps} />
                    </main>
                    <footer><Footer/></footer>
                </CartContextProvider>
            </ThemeProvider>

            <div
                dangerouslySetInnerHTML={{
                    __html: `
    <script type="text/javascript">
    (function(m,e,t,r,i,k,a){m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(93225143, "init", {
        clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true
});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/29761725" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    `
                }}
            />
        </>
    )
}

MyApp.getInitialProps = async (context) => {
    const ctx = await App.getInitialProps(context)
    const pages = await axios.get(process.env.NEXT_PUBLIC_STRAPI_URL + '/pages').then(r => r.data)

    return {
        ...ctx,
        pages: pages.filter(e => e.title).map(e => ({url: e.name, title: e.title}))
    }
}

export default MyApp
