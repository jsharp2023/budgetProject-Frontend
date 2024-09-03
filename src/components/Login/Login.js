import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/user/login', { 
                email: email, 
                password: password });
            const { token, name } = response.data;
            console.log('Login successful:', name);
            // Store the token in localStorage (optional)
            localStorage.setItem('token', token);

            // Call the success handler to display the user's name
            onLoginSuccess(name);
        } catch (err) {
            console.error('Error logging in:', err.response ? err.response.data : err.message);
            setError('Invalid email or password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
