import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Briefcase, UserCircle } from 'lucide-react';

function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('worker'); // 'worker' or 'employer'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Simulate signup
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.fullName);
      localStorage.setItem('userRole', role);
      navigate('/dashboard');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-2">
              Join SkillBridge
            </h1>
            <p className="text-gray-600">Create your account and get started</p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <p className="text-gray-700 font-medium mb-4 text-center">I want to:</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('worker')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  role === 'worker'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <UserCircle className={`mx-auto mb-3 ${role === 'worker' ? 'text-red-600' : 'text-gray-400'}`} size={40} />
                <h3 className={`font-bold mb-1 ${role === 'worker' ? 'text-red-600' : 'text-gray-700'}`}>
                  Find Work
                </h3>
                <p className="text-sm text-gray-600">I'm a skilled worker looking for jobs</p>
              </button>
              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  role === 'employer'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <Briefcase className={`mx-auto mb-3 ${role === 'employer' ? 'text-red-600' : 'text-gray-400'}`} size={40} />
                <h3 className={`font-bold mb-1 ${role === 'employer' ? 'text-red-600' : 'text-gray-700'}`}>
                  Hire Workers
                </h3>
                <p className="text-sm text-gray-600">I need to hire skilled workers</p>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.fullName 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-gray-200 focus:border-red-500'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-gray-200 focus:border-red-500'
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-gray-200 focus:border-red-500'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.confirmPassword 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-gray-200 focus:border-red-500'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-1 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-gray-600 text-sm">
                  I agree to the{' '}
                  <a href="#" className="text-red-600 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-red-600 hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-4">
            <button className="py-3 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all font-medium text-gray-700">
              🔍 Google
            </button>
            <button className="py-3 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all font-medium text-gray-700">
              📘 Facebook
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;