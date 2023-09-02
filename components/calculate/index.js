import React, {useContext} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import {getResultTable, properties} from "./formHelpers";
import {useFormik} from "formik";
import SelectType from "./SelectShape";
import Sizes from "./Sizes";
import Additional from "./AdditionalParams";
import Results from "./Results";
import calculate from "./calculate";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import {CartContext} from "../CartContext";
import Link from "next/link";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";

export default function Calculator(props) {
    const {metalPrice} = props

    const steps = [
        "Выберете тип изделия",
        "Укажите размеры",
        "Дополнительные параметры"
    ]


    const [activeStep, setActiveStep] = React.useState(0);
    const [history, setHistory] = React.useState([0])
    const [item, setItem] = React.useState({})
    const [isOpen, setIsOpen] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const {addItemToCart} = useContext(CartContext)

    const formik = useFormik({
        ...properties,
        initialValues: {
            ...properties.initialValues,
            metalPrice: metalPrice || 120000
        },
        onSubmit: values => {
            setItem(getResultTable(calculate(values)))
        }
    })

    const forward = (amount = 1) => {
        let newStep = activeStep + amount

        if (activeStep === 2) formik.handleSubmit()

        setHistory(history => [...history, newStep])
        setActiveStep(newStep)
    }
    const back = () => {
        setActiveStep(history[history.length - 2])
        setHistory(history => history.filter((e, i) => i !== history.length - 1))
    }
    const reset = () => {
        formik.resetForm()
        setActiveStep(0)
        setHistory([0])
    }

    const addToCart = async (item) => {
        setError(null)
        setLoading(true)
        try {
            await addItemToCart(item)
            setIsOpen(true)
        } catch (e) {
            setError("Произошла ошибка, попробуйте позже.")
        }
        setLoading(false)
    }
    const handleClose = () => {
        reset()
        setIsOpen(false)
    }

    let shouldContinue;

    if (activeStep === 0 && !formik.values.shape) shouldContinue = false
    else if (activeStep === 0 && formik.values.shape) shouldContinue = true
    else if (activeStep === 1 && Object.keys(formik.errors).length) shouldContinue = false
    else if (Object.keys(formik.errors).length) shouldContinue = false
    else shouldContinue = true

    return (
        <div className={"calculate__steps"}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((el, i) => {
                    let content;

                    if (i === 0) content = <SelectType formik={formik}/>
                    else if (i === 1) content = <Sizes formik={formik}/>
                    else if (i === 2) content = <Additional formik={formik}/>

                    return (
                        <Step key={i}>
                            <StepLabel>{el}</StepLabel>
                            <StepContent>
                                {content}

                                <div className={"btn-group"}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={back}
                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        disabled={!shouldContinue}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => forward()}
                                    >
                                        {activeStep === steps.length - 1 ? "Расчитать" : "Продолжить"}
                                    </Button>
                                </div>
                            </StepContent>
                        </Step>
                    )
                })}
            </Stepper>
            <SimpleDialog handleClose={handleClose} isOpen={isOpen}/>
            {activeStep === steps.length && (<div className={"calculate__paddings"}>
                <Results results={item} reset={reset} addToCart={addToCart}/>
                {loading && <LinearProgress className={"mt-3"}/>}
                {error && <Alert severity="error" className={"mt-3"}>{error}</Alert>}
            </div>)}
        </div>
    );
}

function SimpleDialog(props) {
    const {handleClose, isOpen} = props;
    const {cart} = useContext(CartContext)


    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={isOpen} className={"dialog"}>
            <DialogTitle id="simple-dialog-title">Товар успешно добавлен в корзину</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Количество товаров в корзине: {cart?.data?.length}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Добавить еще
                </Button>
                <Link href={"/cart"}>
                    <Button color={"primary"} variant={"contained"}>
                        Перейти в корзину
                    </Button>
                </Link>
            </DialogActions>
        </Dialog>
    );
}