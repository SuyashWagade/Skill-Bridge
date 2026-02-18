import React from 'react';
import { useNavigate } from 'react-router-dom';

function ServiceCard({ icon, title, description, color, delay = 0 }) {
  const navigate = useNavigate();

  return (
    <div 
      className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
      style={{
        animation: `slideUp 0.6s ease-out ${delay}s both`,
        borderTop: `4px solid ${color}`
      }}
      onClick={() => navigate('/search')}
    >
      {/* Background Gradient Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${color} 0%, transparent 100%)` }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div 
          className="w-16 h-16 rounded-xl mb-4 flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">
          {description}
        </p>
        <div className="mt-4 flex items-center text-red-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-sm">Explore →</span>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-500" />
    </div>
  );
}

export default ServiceCard;