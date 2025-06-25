import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useState } from 'react';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/signup', data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
      <p className='mt-4'>
        Already have an account? <a href="/login" className="text-blue-600">Login</a>
      </p>
    </div>
  );
};

export default Signup;
