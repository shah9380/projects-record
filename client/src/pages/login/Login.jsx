import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import "../signup/Signup.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSchema =Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email')
        .required('Required'),
    password: Yup.string()
        .min(8,'Password is too Short - shoud be 8 characters minimum')
        .required('required')
})  

const Login = ()=>{

    const navigate = useNavigate();
    const handleSubmit = async (values, {setSubmitting})=>{
        try {
            await axios.post('https://familyman.onrender.com/api/login', values)
            console.log('Login Successfull')
            navigate("/home")
        } catch (error) {
            console.log(error)
        }finally{
            setSubmitting(false)
        }
    }
    const checkCookie = async ()=>{
        try {
          navigate('/register')
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="signup-container signup-container-x">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {
                    ({isSubmitting})=>{
                        return(
                            <Form aria-labelledby="login-heading">
                                <fieldset>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <Field type="email" name="email" id="email" aria-required="true" />
                                        <ErrorMessage name="email" component="div" role="alert"/>
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <Field type="text" name="password" id="password" aria-required="true" />
                                        <ErrorMessage name="password" component="div" role="alert" />
                                    </div>
                                    <button type="submit" disabled={isSubmitting} aria-live="polite">Log me In</button>
                                </fieldset>
                            </Form>
                        )
                    }
                }
            </Formik>
            <button  style={{marginTop: "24px"}} type="button" onClick={checkCookie}>Register</button>
        </div>
    )
}

export default Login;