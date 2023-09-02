import React, {useState} from 'react';
import order from "./img/order.webp"
import {useFormik} from "formik";
import Section from "./landing/Section";
import {Alert, LinearProgress} from "@mui/material";
import axios from "axios";
import Image from "next/image"
import TextField from "@mui/material/TextField";

// const CssTextField = withStyles({
//     root: {
//         '& label': {
//             color: "var(--text-light)"
//         },
//         "& .MuiInputBase-root:before": {
//             borderBottomColor: "var(--text-light)"
//         },
//         "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
//             borderBottomColor: "var(--text-light)"
//         },
//         "& .MuiInputBase-input": {
//             color: "var(--text-light)"
//         }
//     },
// })(Field);

const CssTextField = (props) => {
    return <TextField variant={'standard'} {...props} sx={{
        '& label': {
            color: "var(--text-light)"
        },
        "& .MuiInputBase-root:before": {
            borderBottomColor: "var(--text-light)"
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "var(--text-light)"
        },
        "& .MuiInputBase-input": {
            color: "var(--text-light)"
        },
        mt: 2,
        ...props.sx
    }}  />
}


function ContactForm({formImage, header, content}) {
    const [successMessage, setSuccessMessage] = useState("")

    const formik = useFormik({
        onSubmit: async values => {
            try {
                setSuccessMessage(null)
                await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/orders`, {
                    name: values.name,
                    email: values.contacts,
                    comment: values.comment
                })
                formik.resetForm()
                setSuccessMessage("Ваша заявка успешно отправленна")
            } catch (e) {
                setSuccessMessage("Во время отправки произошла ошибка, попробуйте позже")
            }
        },
        initialValues: {
            name: "",
            contacts: "",
            comment: ""
        }
    });


    return (
        <Section className={"order"} id={"order"}>
            <div className="order__text">
                <h2>{header ? header : "Есть вопросы?"}</h2>
                <div className={"order__subtitle"}>
                    {content ? content : `Заполните эту форму и наши специалисты свяжутся с вами в ближайшее время.`}
                </div>
                <form className="order__form" onSubmit={formik.handleSubmit}>
                    <div>
                        <div className="two-grid-cols rollup-on-mobile gap8px">
                            <CssTextField type={"text"} label={"Ваше имя"} formik={formik} name={"name"}/>
                            <CssTextField type={"text"} label={"Ваш телефон"} formik={formik}
                                          name={"contacts"}/>
                        </div>
                        <CssTextField multiline={true}
                                      rows={4}
                                      sx={{width: '100%'}}
                                      type={"text"} label={"Сообщение (необязательно)"} formik={formik}
                                      name={"message"}/>
                    </div>

                    {formik.isSubmitting && <LinearProgress/>}
                    {successMessage && <Alert severity={"info"}>
                        {successMessage}
                    </Alert>}
                    <button type={"submit"} className="btn btn-secondary mt-3">
                        Отправить
                    </button>
                </form>
            </div>
            <div className="order__image">
                <Image fill={true} src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${formImage}`} alt={""} objectFit={"cover"} objectPosition={"center"}/>
            </div>
        </Section>
    );
}

function Wrap(props) {
    return (
        <ContactForm {...props}/>
    )
}

export default Wrap;
