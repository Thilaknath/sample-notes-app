import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { signUp } from '../../services/auth';

export const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/notes');
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Failed to create account.');
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input pl-10"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1 relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pl-10"
              placeholder="Choose a password"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          <UserPlus className="inline-block mr-2" size={20} />
          Sign Up
        </button>
      </form>
    </div>
  );
};