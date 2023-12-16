import * as React from "react"

import Link from "next/link"
import Headline from "../components/landing/Headline";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Order from "../components/ContactForm";
import Contacts from "../components/Contacts";
import axios from "axios";
import Image from "next/image";
import Section from "../components/landing/Section";
import welding from '../images/welding.svg'

const IndexPage = ({data: {index, contacts}}) => {
    // const {
    //     allStrapiPage: {edges: [{node: {Content: [{orderImage, headerImage}]}}]},
    //     contactsPage: {edges: [{node: {Content: [content]}}]}
    // } = data
    // const image = getimage(headerimage)
    // console.log(data)

    console.log(index)

    return (
        <>
            <div className="header">
                <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${index.headerImage.url}`} fill={true} className={'headline__background'} objectFit={'cover'}/>
                <Headline/>
            </div>
            <Section>
                <div className="top-cards">
                    <div className="top-card">
                        <AccessibilityNewIcon className={"top-card__icon"}/>
                        <h3 className="top-card__header">
                            Расчет стоимости прямо на сайте
                        </h3>
                        <p>
                            Вы можете воспользоваться <Link href={"/calculate"}>калькулятором стоимости
                            резки</Link> прямо
                            на сайте, скачать расчет в формате PDF, а так же сразу же заказать нужные вам изделия.
                        </p>
                    </div>
                    <div className="top-card">
                        <Image
                            className={"top-card__icon"}
                            alt={"Сварка"}
                            src={welding}
                            objectFit={"contain"}
                            // placeholder={"blur"}
                            width={72}
                            height={72}
                        />
                        <h3 className="top-card__header">
                            Полный цикл металообработки
                        </h3>
                        <p>
                            Заказывая у нас изготовление изделий в комплексе, вы не только экономите на транспортных
                            расходах, но и существенно сокращаете сроки производства, потому что мы начинаем варить с
                            первого дня заказа (с первой готовой детали).
                        </p>
                    </div>
                    <div className="top-card">
                        <LocalShippingIcon className={"top-card__icon"}/>
                        <h3 className="top-card__header">
                            Доставка
                        </h3>
                        <p>
                            По вашему желанию мы можем доставить товар в любое удобное вам место, либо вы можете забрать
                            изделия самостоятельно, наш цех распологается <Link href="#contacts">близко к ЕКАДУ.</Link>
                        </p>
                    </div>
                </div>
            </Section>
            <Order header={"Оставьте заявку"}
                   content={"Если у вас возникли вопросы, или же вы хотите сделать индивидуальный заказ - заполните эту форму, и мы свяжемся с вами в ближайшее время."}
                   formImage={contacts.formImage.url}/>
            <Contacts header={contacts.header} content={contacts.content} maps={contacts.maps} data={contacts}/>
        </>
    )
}


export const getStaticProps = async () => {
    const {data: [{Content: [index]}]} = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/pages`, {
        params: {
            name: 'index'
        }
    });
    const {data: [{Content: [contacts]}]} = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/pages`, {
        params: {
            name: 'contacts'
        }
    });


    return {
        revalidate: 60,
        props: {
            data: {index, contacts},
        }
    }
}

export default IndexPage
