/* eslint-disable no-unused-vars */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Signup.css'; 

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid Email').required('Required'),
    password: Yup.string()
        .min(8, 'Password is too Short - shoud be 8 characters minimum')
        .required("Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    mobile: Yup.number()
        .required('Required')
        .test('isValidPhone', 'Phone Number is not valid', (value) =>{
            const phoneRegExp = /^\d{10}$/;
            return phoneRegExp.test(value);
        }),

})

const SignUp = ()=>{
    return(
        <div className="signup-container">
            <h1>Registration</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    mobile: '',
                }}
                validationSchema={SignUpSchema}
                onSubmit={values => {
                    console.log(values)
                }}
            >
                {
                    ({isSubmitting}) => {
                        return (<Form aria-labelledby="signup-heading">
                            <fieldset>
                                <legend id="signup-heading" hidden>Signup Form</legend>
                                <div>
                                    <label htmlFor="firstName">First Name</label>
                                    <Field type="text" name="firstName" id="firstName" aria-required="true"></Field>
                                    <ErrorMessage name="firstName" component="div" role="alert" />
                                </div>
                                <div>
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field type="text" name="lastName" id="lastName" aria-required="true"></Field>
                                    <ErrorMessage name="lastName" component="div" role="alert" />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" name="email" id="email" aria-required="true"></Field>
                                    <ErrorMessage name="email" component="div" role="alert" />
                                </div>
                                <div>
                                    <label htmlFor="mobile">Phone</label>
                                    <Field type="text" name="mobile" id="mobile" aria-required="true"></Field>
                                    <ErrorMessage name="mobile" component="div" role="alert"/>
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <Field type="password" name="password" id="password" aria-required="true"></Field>
                                    <ErrorMessage name="password" component="div" role="alert" />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field type="password" name="confirmPassword" id="confirmPassword" aria-required="true" />
                                    <ErrorMessage name="confirmPassword" component="div" role="alert" />
                                </div>
                                <button type="submit" disabled={isSubmitting}>Take Me In</button>
                            </fieldset>
                        </Form>)
                    }
                }

            </Formik>
        </div>
    )
}

export default SignUp;