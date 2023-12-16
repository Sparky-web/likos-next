import axios from "axios";
import Section from "../components/landing/Section";
import ReactMarkdown from "react-markdown";
import ContactForm from "../components/ContactForm";

export const getStaticProps = async ({params}) => {
    const pageName = params.name;


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
        revalidate: 60,
        props: {
            data: data[0].Content[0],
            contacts
        }
    };
};

export async function getStaticPaths() {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/pages`)
 
  // Get the paths we want to pre-render based on posts
  const paths = data.filter(page => !['contacts', 'index', 'gallery', 'config'].includes(page.name)).map((page) => ({
    params: { name: page.name },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

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
