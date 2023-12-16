import React, {useState} from 'react';
import Section from "../components/landing/Section";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Video from "../components/Video";
import Image from "next/image";
import buildLoader from "../utils/imageLoader";
import axios from "axios";

function Gallery({data}) {
    // const {allStrapiPage: {edges: [{node: {Content: [{media}]}}]}} = data
    let images = data.images.map(el => el.image)
    console.log(images)

    return (
        <div className="about-us__page">
            <Section className={"about-us"}>
                <h1>О нас</h1>
                <p> Компания ООО Ликос предлагает услуги плазменной резки металла по привлекательным ценам. Для
                    данного
                    вида обработки металла мы используем высокоточное оборудование, оснащенное современным
                    программным
                    обеспечением. Наши специалисты имеют высокую квалификацию и большой опыт работы, поэтому
                    выполняют
                    заказы на должном уровне и в кратчайшие сроки. Мы принимаем заказы любой сложности и по праву
                    гордимся безупречным качеством выполняемых работ.</p>

                <div className={"mt-3"}>
                </div>
            </Section>
            <Section className={"gallery__wrap"}>
                <div className={"gallery"}>
                    {images.map((el, i) => <Media image={el} key={i} i={i}/>)}
                </div>
            </Section>
        </div>
    );
}

export default Gallery;

const Media = ({image: media, i}) => {
    const [open, setOpen] = useState(false)

    return (<div className={"gallery__media-container " + (i === 0 ? "tall" : i === 3 ? "wide" : "")}>
        {media.ext !== ".mp4" ?
            <Image src={media.url} fill={true} loader={buildLoader(media)} alt={""} onClick={() => setOpen(true)}/> :
            <Video videoSrcURL={`${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}`} videoTitle={"smth"}/>
        }
        <Dialog open={open} onClose={() => setOpen(false)} className={"gallery__full-image"}>
            <DialogContent >
                {media.ext !== ".mp4" ?
                    <Image src={media.url} fill={true} loader={buildLoader(media)} alt={'yea'}
                           onClick={() => setOpen(true)}
                           className={'gallery__full-image'} />
                    :
                    <Video videoSrcURL={`${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}`} videoTitle={"smth"}/>
                }
            </DialogContent>
        </Dialog>
    </div>)
}


export const getStaticProps = async () => {
    const {data: [{Content: [data]}]} = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/pages`, {
        params: {
            name: 'gallery'
        }
    });


    return {
        props: {
            data,
        },
        revalidate: 60
    }
}
