import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginuser } from '../../utils/Api/userapi';
import { loginSuccess } from '../Slices/authSlice';
import { loginValidation } from '../../utils/formvalidation/validation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { connectSocket } from '../config/socket';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginValidation) });

  const onSubmit = async (formData) => {
    try {
      const res = await loginuser(formData);
  
     if(res.isSuccess){
      console.log(res);
       dispatch(loginSuccess({ user: res?.user, token: res?.token,id:res?.id }));
       connectSocket(res?.token);
       toast.success(res?.message);
       navigate('/dashboard');
     }
     
    } catch (err) {
     
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Welcome Back 👋</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            {/* // Email input field with validationk */}
            <label>Email Address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email')}
              placeholder="Enter your email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password')}
              placeholder="Enter password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <button type="submit" className="btn btn-success w-100 mt-2">Login</button>
        </form>
        <div className="text-center mt-3">
          <small>Don't have an account? <span onClick={()=>navigate('/register')} className='custom_pointer text-primary'>Register</span></small>
        </div>
      </div>
    </div>
  );
};

export default Login;
