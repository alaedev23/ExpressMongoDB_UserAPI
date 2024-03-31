import React, { useState, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import UserContext from '../context/UserContext.jsx'; 

const Login = () => {

    const { user, setUser, userNotes, setUserNotes } = useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!formData.email || !formData.password) {
            setErrorMessage('All fields are required!');
            return;
        }
    
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            setErrors({
                ...errors,
                email: 'Invalid email format'
            });
            return;
        }
    
        setErrorMessage('');
    
        try {
            const loginResponse = await loginUser(formData);
            setUser(loginResponse.user);
    
            const notesResponse = await fetchUserNotes(loginResponse.user.token);
            setUserNotes(notesResponse ?? []);
    
            navigate('/profile');
        } catch (error) {
            console.error('Login error:', error.message);
            setErrorMessage('Error: Login failed');
        }
    };
    
    const loginUser = async (formData) => {
        const response = await fetch('http://0.0.0.0:8081/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
    
        if (!response.ok) {
            throw new Error('Login failed');
        }
    
        return response.json();
    };
    
    const fetchUserNotes = async (token) => {
        const response = await fetch('http://0.0.0.0:8081/nota/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
    
        if (!response.ok) {
            throw new Error('Fetch of notes failed');
        }
    
        return response.json();
    };
    

    return (
        <section id="login" style={{height: '910px'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-5 text-uppercase">Login</h2>
                                    <form onSubmit={handleSubmit}>
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
                                        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                    </form>
                                </div>
                                <div>
                                    <p className="mb-0">Don't have an account? <Link to="/register" className="text-white-50 fw-bold">Register</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
