import React from 'react';
import NewCalculator from "../components/calculate"
import axios from "axios";

function Calculate({data}) {
    return (
        <section className={"calculate"}>
            <h1 className={"calculate__paddings"}>Рассчитайте стоимость резки</h1>
            <NewCalculator metalPrice={data.metalPrice}/>
        </section>
    );
}

export const getServerSideProps = async () => {
    const {data}  = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/config`);

    return {
        props: {
            data,
        }
    }
}

export default Calculate;