import React, {useContext, useState} from 'react';
import {CartContext} from "./CartContext";
import Link from "next/link";
import Badge from "@mui/material/Badge";

function Navbar({pages}) {
    const [isOpened, setIsOpened] = useState(false)
    const open = () => setIsOpened(!isOpened)

    const {cart} = useContext(CartContext)

    // const items = data?.allStrapiPage?.edges?.map(({node}) => {
    //     const content = node?.Content[0]
    //     return (
    //         <Link href={`/${content.pageName}`}>
    //             <button className="btn">
    //                 {content.title}
    //             </button>
    //         </Link>
    //     )
    // })

    return (
        <nav className={["navbar", isOpened && "navbar__container__opened"].join(" ")}>
            <div className="navbar__container">
                <Link href="/" className="navbar__logo">
                    ЛИКОС
                </Link>
                <div className={["navbar__menu-container", "navbar__menu", isOpened && "navbar__opened"].join(" ")}>
                    <Link href="/price">
                        <button className="btn">
                            Прайс
                        </button>
                    </Link>
                    <Link href="/calculate">
                        <button className="btn">
                            РАСЧИТАТЬ СТОИМОСТЬ
                        </button>
                    </Link>

                    {pages.filter(e => e.url !== 'contacts').map(e => (
                        <Link href={`/${e.url}`} key={e.url}>
                            <button className="btn">
                                {e.title}
                            </button>
                        </Link>
                    ))}

                    <Link href="/contacts">
                        <button className="btn">
                            Контакты
                        </button>
                    </Link>

                    {/*{items}*/}
                    <Link href={"/cart"}>
                        <button className={"btn"}>
                            <Badge color={"primary"} badgeContent={cart?.data?.length}>
                                <img src="https://img.icons8.com/material/24/ffffff/shopping-cart--v1.png"
                                     alt={"Корзина"}/>
                            </Badge>
                        </button>
                    </Link>
                </div>
                <button onKeyDown={open} onClick={open} className={"btn navbar__open"}>
                    <img src="https://img.icons8.com/material-sharp/24/FFFFFF/menu--v3.png" alt={""}/>
                </button>
            </div>
        </nav>
    );
}



export default Navbar;
