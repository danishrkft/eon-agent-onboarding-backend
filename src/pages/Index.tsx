
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation for demo
      if (username === 'admin' && password === 'password') {
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please check your username and password.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Brand area */}
      <div className="hidden md:flex md:w-1/2 bg-eon-blue items-center justify-center">
        <div className="text-center p-8">
          <div className="inline-block bg-white rounded-xl p-4 mb-6">
            <div className="bg-eon-blue rounded-md w-16 h-16 flex items-center justify-center">
              <span className="text-white font-bold text-3xl">EON</span>
            </div>
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Agent Management Portal</h1>
          <p className="text-blue-100 max-w-md mx-auto">
            Streamline agent onboarding, management, and commission tracking in one secure platform.
          </p>
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="flex flex-col flex-1 items-center justify-center p-6 bg-white">
        {/* Mobile logo */}
        <div className="md:hidden mb-8 text-center">
          <div className="inline-block">
            <div className="bg-eon-blue rounded-md w-12 h-12 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">EON</span>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username or Email
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-eon-blue"
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-eon-blue hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-eon-blue"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-eon-blue text-white py-2.5 rounded-md hover:bg-eon-dark-blue transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eon-blue disabled:opacity-70"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>For demo purposes, use:</p>
            <p className="mt-1 font-medium">Username: admin / Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
