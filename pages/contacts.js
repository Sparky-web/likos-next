import React from 'react';
import ContactForm from "../components/ContactForm";
import Contacts from "../components/Contacts";
import axios from "axios";

function Contacts_({data: content}) {
    return (
        <>
            <Contacts header={content.header} content={content.contacts} maps={content.mapsLink} data={content} />
            <ContactForm header={content.formHeader} content={content.formText} formImage={content.formImage.url}/>
        </>
    );
}


export const getStaticProps = async () => {
    const {data: [{Content: [contacts]}]} = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/pages`, {
        params: {
            name: 'contacts'
        }
    });


    return {
        props: {
            data: contacts,
        },
        revalidate: 60
    }
}

export default Contacts_;