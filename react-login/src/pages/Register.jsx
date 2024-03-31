import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatPassword: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if ((name === 'name' || name === 'surname') && /[^\p{L}\s]/u.test(value)) {
            setErrors({
                ...errors,
                [name]: 'Name and surname cannot contain numbers or symbols'
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (const key in formData) {
            if (!formData[key]) {
                setErrorMessage('All fields are required!');
                return;
            }
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            setErrors({
                ...errors,
                email: 'Invalid email format'
            });
            return;
        }

        if (formData.password.length < 8 || !/[a-zA-Z]/.test(formData.password) || !/\d/.test(formData.password)) {
            setErrors({
                ...errors,
                password: 'Password must contain at least one letter, one number, and be at least 8 characters long'
            });
            return;
        }        

        if (formData.password !== formData.repeatPassword) {
            setErrors({
                ...errors,
                repeatPassword: 'Passwords do not match'
            });
            return;
        }

        setErrorMessage('');

        try {
            const response = await fetch('http://0.0.0.0:8081/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Registration failed ' + response.status + '(' + response.json().error + ')');
            }

            navigate('/login');

            console.log('Registration successful');
        } catch (error) {
            console.error('Registration error:', error.message);
            setErrorMessage('Error: Registration failed');
        }
    };

    return (
        <section id="register" style={{minHeight: '910px'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5 mb-5">
                        <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">
                                <div className="mb-3 md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-4 text-uppercase">Register</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label">Name</label>
                                            <input type="text" name="name" className="form-control form-control-lg" value={formData.name} onChange={handleChange} />
                                            {errors.name && <div className="text-danger">{errors.name}</div>}
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label">Surname</label>
                                            <input type="text" name="surname" className="form-control form-control-lg" value={formData.surname} onChange={handleChange} />
                                            {errors.surname && <div className="text-danger">{errors.surname}</div>}
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label">Email</label>
                                            <input type="email" name="email" className="form-control form-control-lg" value={formData.email} onChange={handleChange} />
                                            {errors.email && <div className="text-danger">{errors.email}</div>}
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label">Password</label>
                                            <input type="password" name="password" className="form-control form-control-lg" value={formData.password} onChange={handleChange} />
                                            {errors.password && <div className="text-danger">{errors.password}</div>}
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label">Repeat Password</label>
                                            <input type="password" name="repeatPassword" className="form-control form-control-lg" value={formData.repeatPassword} onChange={handleChange} />
                                            {errors.repeatPassword && <div className="text-danger">{errors.repeatPassword}</div>}
                                        </div>
                                        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Register</button>
                                    </form>
                                </div>
                                <div>
                                    <p className="mb-0">Have an account? <Link to="/login" className="text-white-50 fw-bold">Login</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
