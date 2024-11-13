'use client'

import { Form, Col, Row, Button } from "react-bootstrap";
import { useState } from "react";
import { FormItem } from "@/app/models/formModel";
import styles from './customForm.module.scss';

export default function CustomForm({ formItem, handleSubmitForm }: { formItem: FormItem, handleSubmitForm: Function }) {
    const [formData, setFormData] = useState<Object>({});

    const getFormData = (value: string, key: string): void => {
        let data = { ...formData, [key]: value };
        setFormData(data);
    }

    const submitForm = () => {
        handleSubmitForm(formData);
    }

    return (
        <Form className={styles.customForm}>
            {formItem.fields.map((field, fieldIndex) => {
                return (
                    <Form.Group as={Row} className={styles.formField} key={`form-${fieldIndex}`}>
                        {formItem.displayType && <Form.Label column sm={formItem.displayType === 'ColRow' ? 2 : 0}>{field.label}</Form.Label>}
                        <Col sm={formItem.displayType && formItem.displayType === 'ColRow' ? 10 : 12}>
                            <Form.Control
                                as={field.type === "textarea" ? "textarea" : "input"}
                                type={field.type === "password" ? "password" : "text"}
                                placeholder={field.label}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ): void => getFormData(event.target.value, field.key)} />
                        </Col>
                    </Form.Group>
                );
            })}
            <Form.Group as={Row} className={styles.formField} key={`form-submit-button`}>
                <Form.Label column sm={formItem.displayType && formItem.displayType === 'ColRow' ? 2 : 0}></Form.Label>
                <Col sm={formItem.displayType && formItem.displayType === 'ColRow' ? 10 : 12}>
                    <Button variant="dark" onClick={submitForm}>{formItem.buttonText}</Button>
                </Col>
            </Form.Group>
        </Form>
    )
}