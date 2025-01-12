
import {appWithTranslation} from "next-i18next"
import type { AppProps } from "next/app"

const App = ({Component, pageProps}: AppProps) => {
    return <Component {...pageProps}></Component>
}
export default appWithTranslation(App);
