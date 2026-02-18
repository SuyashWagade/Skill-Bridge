import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Bookmark } from 'lucide-react';

function JobCard({ job, featured = false }) {
  const navigate = useNavigate();

  return (
    <div 
      className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-l-4 ${
        featured ? 'border-red-600 bg-gradient-to-r from-red-50 to-white' : 'border-gray-200'
      }`}
      onClick={() => navigate(`/job/${job.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-lg">
            {job.company[0]}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 hover:text-red-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm">{job.company}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-red-600 transition-colors">
          <Bookmark size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 3).map((skill, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <MapPin size={16} className="text-red-500" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <Clock size={16} className="text-red-500" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <DollarSign size={16} className="text-red-500" />
          <span>{job.salary}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">{job.posted}</span>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
}

export default JobCard;