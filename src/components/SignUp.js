import React, { useState } from 'react';
import axios from 'axios';

const SignUp = ({ onSignUpSuccess }) => {
    const [userName, setUserName] = useState(''); // Renamed to userName to avoid conflict
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/user/signup', { 
                name: userName, 
                email, 
                password 
            });
            const { token, name } = response.data;
            console.log('Sign up successful:', name);
            // Store the token in localStorage (optional)
            localStorage.setItem('token', token);

            // Call the success handler
            onSignUpSuccess(name);
        } catch (err) {
            setError('Error during registration');
            console.error('Error signing up:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                    required 
                />
            </div>
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
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;

