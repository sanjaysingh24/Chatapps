import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { register } from '../utils/api';
import { loginSuccess } from '../Slices/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerValidation } from '../../utils/formvalidation/validation'; // yup schema
import { registeruser } from '../../utils/Api/userapi';
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerValidation) });

  const onSubmit = async (formData) => {
    try {
      const res = await registeruser(formData);
     
  if(res.isSuccess){
   
    navigate('/');
    toast.success(res?.message);

  }else{
    toast.warn(res?.message);
  }
    } catch (err) {
      toast.error(res?.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Join Us 👤</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              {...register('username')}
              placeholder="Enter username"
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email')}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password')}
              placeholder="Enter password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100 mt-2">
            Register
          </button>
        </form>
        <div className="text-center mt-3 ">
          <small>
            Already have an account? <span onClick={()=>navigate('/')} className='custom_pointer text-primary'>Login</span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
