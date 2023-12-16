import React from 'react';
import NewCalculator from "../components/calculate"
import axios from "axios";

function Calculate({ data }) {
    return (
        <section className={"calculate"}>
            <h1 className={"calculate__paddings"}>Рассчитайте стоимость резки</h1>
            <div className='container'>
                <NewCalculator metalPrice={data.metalPrice} />
            </div>
        </section>
    );
}

export const getStaticProps = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/config`);

    return {
        revalidate: 60,
        props: {
            data,
        }
    }
}

export default Calculate;