import React from "react";
import Paper from "@mui/material/Paper";
import Image from "next/image"
import calculateSquare from "../../images/calculate-square.png"
import circle from "../../images/calculate-circle.png"
import calculateTriangle from "../../images/calculate-triangle.png"
import calculateOther from "/images/calculate-other.jpg"

const SelectType = ({formik}) => {
    const shapes = React.useRef([
        {
            name: "Квадрат (фланец)",
            value: "square",
            image: <Image
                fill={true}
                className={"image"}
                alt={"Квадрат"}
                src={calculateSquare}
                objectFit={"cover"}
            />,
            paramsToChange: {thickness: 10}

        },
        {
            name: "Круг (фланец)",
            value: "circle",
            image: <Image
                fill={true}
                className={"image"}
                alt={"Круг"}
                src={circle}
                objectFit={"cover"}
            />,
            paramsToChange: {thickness: 10}

        },
        {
            name: "Косынка",
            value: "triangle",
            image: <Image
                fill={true}
                className={"image"}
                alt={"Косынка"}
                src={calculateTriangle}
                objectFit={"cover"}
            />,
            paramsToChange: {thickness: 6}
        },
        {
            name: "Другое",
            value: "other",
            image: <Image
                fill={true}
                className={"image"}
                alt={"Другое"}
                src={calculateOther}
                objectFit={"contain"}
            />,
            paramsToChange: {}
        }
    ])

    return (
        <div className="calculate__select">
            {shapes.current.map(el => (
                <Paper onClick={() => {
                    Object.keys(el.paramsToChange).forEach(param => {
                        formik.setFieldValue(param, el.paramsToChange[param])
                    })
                    formik.setFieldValue("shape", el.value)
                }}
                       key={el.value}
                       elevation={el.value === formik.values.shape ? 3 : 0}>
                    <div style={{height: '200px'}}>

                    {el.image}
                    </div>

                    <h4>{el.name}</h4>
                </Paper>))}
        </div>
    )
}

export default SelectType