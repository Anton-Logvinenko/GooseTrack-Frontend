import css from './LoginForm.module.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { MdOutlineLogin } from 'react-icons/md';
import { BiErrorCircle } from 'react-icons/bi';
import { FcOk } from 'react-icons/fc';

export const LoginForm = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [loginForm, setLoginForm] = useState({});

  const handleSumbit = (values, { resetForm }) => {
    setLoginForm(values);
    resetForm();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('This is an ERROR email')
      .matches(emailRegex, 'This is an ERROR email')
      .required('Email is required'),
    password: Yup.string().min(3).required('Password is required'),
  });

  console.log(loginForm);

  return (
    <div className={css.main_container}>
      <div className={css.inside_container}>
        <h3 className={css.title}>Log In</h3>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSumbit}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form className={css.form}>
              <div className={css.email_box}>
                <label
                  htmlFor="email"
                  className={`${css.label_email} ${
                    touched.email && errors.email ? css.error_label : ''
                  } ${touched.email && !errors.email ? css.success_label : ''}`}
                >
                  Email
                </label>
                <Field
                  className={`${css.field} ${
                    touched.email && errors.email ? css.error : ''
                  } ${touched.email && !errors.email ? css.success : ''}`}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder={'nadiia@gmail.com'}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className={css.error_message}
                />
                {touched.email && errors.email ? (
                  <BiErrorCircle className={css.iconError} />
                ) : (
                  ''
                )}

                {!errors.email && values.email !== '' ? (
                  <>
                    <p className={css.success_message}>
                      This is an CORRECT email
                    </p>
                    <FcOk className={css.iconOk} />
                  </>
                ) : (
                  ''
                )}
              </div>
              <div className={css.password_box}>
                <label
                  htmlFor="password"
                  className={`${css.label_email} ${
                    touched.password && errors.password ? css.error_label : ''
                  } ${
                    touched.password && !errors.password
                      ? css.success_label
                      : ''
                  }`}
                >
                  Password
                </label>
                <Field
                  className={`${css.field} ${
                    touched.password && errors.password ? css.error : ''
                  } ${touched.password && !errors.password ? css.success : ''}`}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder={'password'}
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className={css.error_message}
                />
              </div>
              <button
                type="submit"
                // disabled={isSubmitting}
                className={css.button}
              >
                Log in{<MdOutlineLogin className={css.logIn} />}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <a href="/" className={css.sign}>
        Sign up
      </a>
    </div>
  );
};
