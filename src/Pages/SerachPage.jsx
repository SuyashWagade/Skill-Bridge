import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, DollarSign, Clock, X } from 'lucide-react';
import JobCard from '../components/JobCard';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    salaryMin: '',
    category: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const jobs = [
    {
      id: 1,
      title: 'Senior Electrician',
      company: 'PowerTech Solutions',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$25-35/hr',
      description: 'Looking for experienced electrician for commercial projects. Must have 5+ years experience with commercial electrical systems.',
      skills: ['Electrical', 'Commercial', 'Licensed'],
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Home Cleaning Specialist',
      company: 'CleanPro Services',
      location: 'Los Angeles, CA',
      type: 'Part-time',
      salary: '$18-22/hr',
      description: 'Join our team of professional cleaners. Flexible hours and competitive pay. Must be reliable and detail-oriented.',
      skills: ['Cleaning', 'Reliable', 'Experienced'],
      posted: '1 day ago'
    },
    {
      id: 3,
      title: 'Master Plumber',
      company: 'FlowMaster Inc',
      location: 'Chicago, IL',
      type: 'Contract',
      salary: '$30-40/hr',
      description: 'Urgent need for master plumber for residential projects. Great rates and flexible schedule.',
      skills: ['Plumbing', 'Residential', 'Master License'],
      posted: '3 hours ago'
    },
    {
      id: 4,
      title: 'Carpenter - Residential',
      company: 'BuildRight Construction',
      location: 'Houston, TX',
      type: 'Full-time',
      salary: '$22-30/hr',
      description: 'Seeking skilled carpenter for custom home builds. Must have experience with framing, trim work, and cabinetry.',
      skills: ['Carpentry', 'Framing', 'Custom Work'],
      posted: '5 days ago'
    },
    {
      id: 5,
      title: 'HVAC Technician',
      company: 'CoolAir Systems',
      location: 'Phoenix, AZ',
      type: 'Full-time',
      salary: '$28-38/hr',
      description: 'Install, maintain and repair heating, ventilation and air conditioning systems. EPA certification required.',
      skills: ['HVAC', 'EPA Certified', 'Installation'],
      posted: '1 week ago'
    },
    {
      id: 6,
      title: 'Landscaping Crew Leader',
      company: 'GreenScape Pro',
      location: 'Miami, FL',
      type: 'Full-time',
      salary: '$20-28/hr',
      description: 'Lead landscaping crews for residential and commercial properties. Experience with design and maintenance required.',
      skills: ['Landscaping', 'Leadership', 'Design'],
      posted: '4 days ago'
    },
    {
      id: 7,
      title: 'Automotive Mechanic',
      company: 'QuickFix Auto',
      location: 'Dallas, TX',
      type: 'Full-time',
      salary: '$24-32/hr',
      description: 'Diagnose and repair vehicles. ASE certification preferred. Great benefits and tool allowance.',
      skills: ['Automotive', 'Diagnostics', 'ASE Certified'],
      posted: '2 days ago'
    },
    {
      id: 8,
      title: 'Security Guard',
      company: 'SafeGuard Security',
      location: 'Seattle, WA',
      type: 'Part-time',
      salary: '$16-20/hr',
      description: 'Provide security services for commercial properties. Must be licensed and able to work nights.',
      skills: ['Security', 'Licensed', 'Reliable'],
      posted: '6 days ago'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      jobType: '',
      salaryMin: '',
      category: ''
    });
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = !filters.location || 
      job.location.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesType = !filters.jobType || job.type === filters.jobType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs, companies, or skills..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all flex items-center space-x-2"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Search
            </button>
          </form>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      placeholder="City or State"
                      className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Job Type
                  </label>
                  <select
                    value={filters.jobType}
                    onChange={(e) => handleFilterChange('jobType', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-sm"
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Min Salary
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="number"
                      value={filters.salaryMin}
                      onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
                      placeholder="0"
                      className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-sm"
                  >
                    <option value="">All Categories</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="carpentry">Carpentry</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                >
                  <X size={18} />
                  <span>Clear Filters</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredJobs.length} Jobs Found
            </h2>
            {searchQuery && (
              <p className="text-gray-600 mt-1">
                Results for "{searchQuery}"
              </p>
            )}
          </div>
          <select className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none">
            <option>Most Recent</option>
            <option>Highest Salary</option>
            <option>Nearest</option>
          </select>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;