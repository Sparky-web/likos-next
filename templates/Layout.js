import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {createTheme, ThemeProvider} from "@mui/material";

import "../css/General.css"

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

function Layout(props) {
    return (
        <React.StrictMode>
            {/*<SEO />*/}
            <ThemeProvider theme={theme}>

                <header><Navbar/></header>
                <main>
                    {props.children}
                </main>
                <footer><Footer/></footer>

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
        </React.StrictMode>
    );
}

export default Layout;
