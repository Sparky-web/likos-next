import axios from "axios";
import Section from "../components/landing/Section";
import ReactMarkdown from "react-markdown";
import ContactForm from "../components/ContactForm";

export const getServerSideProps = async ({query}) => {
    const pageName = query.name;

    if (!pageName?.trim()) return {
        notFound: true,
    };

    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/pages`, {
        params: {
            name: pageName
        }
    });

    if (!data.length) return {
        notFound: true
    };

    const {data: [{Content: [contacts]}]} = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/pages`, {
        params: {
            name: 'contacts'
        }
    });

    return {
        props: {
            data: data[0].Content[0],
            contacts
        }
    };
};

export default function Page({data, contacts}) {
    return <><Section>
        <h1>{data.title}</h1>

        <ReactMarkdown
	    transformImageUri={uri =>
    		uri.startsWith("http") ? uri : `https://admin.likostrade.ru${uri}`
	    } 
	>{data.content}</ReactMarkdown>

    </Section>
        <ContactForm header={"Оставьте заявку"}
                     content={"Если у вас возникли вопросы, или же вы хотите сделать индивидуальный заказ - заполните эту форму, и мы свяжемся с вами в ближайшее время."}
                     formImage={data.formImage?.url || contacts.formImage.url}/>
    </>
}
