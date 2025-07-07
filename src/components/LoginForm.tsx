import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Enter your password'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    console.log('Login attempt:', data);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to AccessNI form after successful login
      navigate('/accessni-form');
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Error summary for accessibility */}
      {(errors.email || errors.password) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
          <h3 className="text-sm font-semibold text-red-800 mb-2">
            There is a problem
          </h3>
          <ul className="text-sm text-red-700 space-y-1">
            {errors.email && (
              <li>
                <a href="#email" className="underline hover:no-underline">
                  {errors.email.message}
                </a>
              </li>
            )}
            {errors.password && (
              <li>
                <a href="#password" className="underline hover:no-underline">
                  {errors.password.message}
                </a>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Email field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          Email address
        </label>
        <input
          {...register('email')}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#005EA5] focus:border-[#005EA5] ${
            errors.email 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-600 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            {...register('password')}
            className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#005EA5] focus:border-[#005EA5] ${
              errors.password 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none focus:ring-2 focus:ring-[#005EA5] rounded-r-lg"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" className="text-sm text-red-600 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#00703C] hover:bg-[#005a30] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00703C] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>

      {/* Create account link */}
      <div className="text-center">
        <a
          href="/create-account"
          className="inline-block w-full py-3 px-4 border-2 border-[#00703C] text-[#00703C] font-semibold rounded-lg transition-all duration-200 hover:bg-[#00703C] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00703C]"
        >
          Create account
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
