import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ChatWidget from '../../components/ui/ChatWidget';
import ProfileProgress from '../../components/ui/ProfileProgress';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Component imports
import CareerCard from './components/CareerCard';
import FilterControls from './components/FilterControls';
import QuickActions from './components/QuickActions';
import DashboardStats from './components/DashboardStats';
import SkeletonCard from './components/SkeletonCard';
import EmptyState from './components/EmptyState';

const CareerDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedCareers, setBookmarkedCareers] = useState(new Set());
  const [selectedCareers, setSelectedCareers] = useState(new Set());
  const [filters, setFilters] = useState({
    salary: 'all',
    industry: 'all',
    match: 'all',
    sort: 'match'
  });
  const [profileCompletion, setProfileCompletion] = useState(75);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock career data
  const mockCareers = [
    {
      id: 1,
      title: "Senior Software Engineer",
      industry: "Technology",
      averageSalary: 125000,
      matchPercentage: 92,
      requiredSkills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
      missingSkills: ["Kubernetes", "GraphQL"],
      marketDemand: 85,
      growthProjection: "+15% over next 5 years",
      learningResources: [
        { title: "Advanced React Patterns", url: "#", platform: "Udemy" },
        { title: "Kubernetes Fundamentals", url: "#", platform: "Coursera" },
        { title: "GraphQL Complete Guide", url: "#", platform: "Pluralsight" }
      ]
    },
    {
      id: 2,
      title: "Data Scientist",
      industry: "Technology",
      averageSalary: 115000,
      matchPercentage: 78,
      requiredSkills: ["Python", "Machine Learning", "SQL", "Statistics", "TensorFlow", "Pandas"],
      missingSkills: ["Deep Learning", "R", "Tableau"],
      marketDemand: 90,
      growthProjection: "+22% over next 5 years",
      learningResources: [
        { title: "Deep Learning Specialization", url: "#", platform: "Coursera" },
        { title: "R for Data Science", url: "#", platform: "edX" },
        { title: "Tableau Desktop Specialist", url: "#", platform: "Tableau" }
      ]
    },
    {
      id: 3,
      title: "UX/UI Designer",
      industry: "Design",
      averageSalary: 85000,
      matchPercentage: 85,
      requiredSkills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "HTML/CSS"],
      missingSkills: ["Motion Design", "Design Systems"],
      marketDemand: 75,
      growthProjection: "+8% over next 5 years",
      learningResources: [
        { title: "Advanced Figma Techniques", url: "#", platform: "Skillshare" },
        { title: "Motion Design Fundamentals", url: "#", platform: "School of Motion" },
        { title: "Design Systems Masterclass", url: "#", platform: "Design+Code" }
      ]
    }
  ];

  // Dashboard statistics
  const dashboardStats = {
    totalMatches: filteredCareers?.length,
    averageMatch: Math.round(filteredCareers?.reduce((acc, career) => acc + career?.matchPercentage, 0) / (filteredCareers?.length || 1)),
    skillsToLearn: [...new Set(filteredCareers.flatMap(career => career.missingSkills))]?.length,
    bookmarked: bookmarkedCareers?.size
  };

  // Load initial data
  useEffect(() => {
    const loadCareers = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCareers(mockCareers);
        setFilteredCareers(mockCareers);
        
        // Load bookmarked careers from localStorage
        const savedBookmarks = localStorage.getItem('bookmarkedCareers');
        if (savedBookmarks) {
          setBookmarkedCareers(new Set(JSON.parse(savedBookmarks)));
        }
      } catch (error) {
        console.error('Error loading careers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCareers();
  }, []);

  // Filter and sort careers
  useEffect(() => {
    let filtered = [...careers];

    // Apply filters
    if (filters?.salary !== 'all') {
      const [min, max] = filters?.salary?.includes('+') 
        ? [parseInt(filters?.salary?.replace('+', '')), Infinity]
        : filters?.salary?.split('-')?.map(Number);
      filtered = filtered?.filter(career => 
        career?.averageSalary >= min && career?.averageSalary <= (max || Infinity)
      );
    }

    if (filters?.industry !== 'all') {
      filtered = filtered?.filter(career => 
        career?.industry?.toLowerCase() === filters?.industry
      );
    }

    if (filters?.match !== 'all') {
      if (filters?.match === '80+') {
        filtered = filtered?.filter(career => career?.matchPercentage >= 80);
      } else if (filters?.match?.includes('-')) {
        const [min, max] = filters?.match?.split('-')?.map(Number);
        filtered = filtered?.filter(career => 
          career?.matchPercentage >= min && career?.matchPercentage <= max
        );
      }
    }

    // Apply sorting
    switch (filters?.sort) {
      case 'salary-high':
        filtered?.sort((a, b) => b?.averageSalary - a?.averageSalary);
        break;
      case 'salary-low':
        filtered?.sort((a, b) => a?.averageSalary - b?.averageSalary);
        break;
      case 'demand-high':
        filtered?.sort((a, b) => b?.marketDemand - a?.marketDemand);
        break;
      case 'growth':
        filtered?.sort((a, b) => {
          const aGrowth = parseInt(a?.growthProjection?.match(/\d+/)?.[0] || '0');
          const bGrowth = parseInt(b?.growthProjection?.match(/\d+/)?.[0] || '0');
          return bGrowth - aGrowth;
        });
        break;
      default: // 'match'
        filtered?.sort((a, b) => b?.matchPercentage - a?.matchPercentage);
    }

    setFilteredCareers(filtered);
  }, [careers, filters]);

  // Handle bookmark toggle
  const handleBookmark = (careerId) => {
    const newBookmarks = new Set(bookmarkedCareers);
    if (newBookmarks?.has(careerId)) {
      newBookmarks?.delete(careerId);
    } else {
      newBookmarks?.add(careerId);
    }
    setBookmarkedCareers(newBookmarks);
    localStorage.setItem('bookmarkedCareers', JSON.stringify([...newBookmarks]));
  };

  // Handle career comparison
  const handleCompare = (careerId) => {
    const newSelected = new Set(selectedCareers);
    if (newSelected?.has(careerId)) {
      newSelected?.delete(careerId);
    } else if (newSelected?.size < 3) { // Limit to 3 comparisons
      newSelected?.add(careerId);
    }
    setSelectedCareers(newSelected);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters)?.forEach(([key, value]) => {
      if (value !== 'all' && value !== 'match') {
        params?.set(key, value);
      }
    });
    setSearchParams(params);
  };

  // Handle sort changes
  const handleSortChange = (sortValue) => {
    setFilters(prev => ({ ...prev, sort: sortValue }));
  };

  // Handle refresh recommendations
  const handleRefreshRecommendations = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call to refresh recommendations
      await new Promise(resolve => setTimeout(resolve, 2000));
      // In real app, this would fetch new recommendations based on updated profile
      setCareers([...mockCareers]);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle export roadmap
  const handleExportRoadmap = async () => {
    const selectedCareerData = careers?.filter(career => selectedCareers?.has(career?.id));
    // In real app, this would generate and download a PDF
    console.log('Exporting roadmap for:', selectedCareerData);
    alert('Roadmap export feature coming soon!');
  };

  // Handle compare selected careers
  const handleCompareSelected = () => {
    if (selectedCareers?.size >= 2) {
      const careerIds = Array.from(selectedCareers)?.join(',');
      navigate(`/career-details?compare=${careerIds}`);
    }
  };

  // Check if profile is complete enough for recommendations
  const hasMinimumProfile = profileCompletion >= 50;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Breadcrumb */}
        <BreadcrumbTrail className="mb-4" />

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Career Dashboard
            </h1>
            <p className="text-muted-foreground">
              Discover AI-powered career recommendations tailored to your profile
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <ProfileProgress 
              completionPercentage={profileCompletion} 
              showInHeader={true}
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconSize={16}
              onClick={() => navigate('/profile-management')}
              className="text-muted-foreground hover:text-foreground"
            >
              Settings
            </Button>
          </div>
        </div>

        {/* Profile Completion Warning */}
        {profileCompletion < 80 && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">
                  Complete Your Profile for Better Recommendations
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Your profile is {profileCompletion}% complete. Add more details about your skills, education, and interests to get more accurate career suggestions.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/profile-setup')}
                >
                  Complete Profile
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {!hasMinimumProfile ? (
          <EmptyState type="profile-incomplete" />
        ) : (
          <>
            {/* Dashboard Stats */}
            <DashboardStats stats={dashboardStats} />

            {/* Quick Actions */}
            <QuickActions
              selectedCareers={selectedCareers}
              onExportRoadmap={handleExportRoadmap}
              onCompareSelected={handleCompareSelected}
              onRefreshRecommendations={handleRefreshRecommendations}
            />

            {/* Filter Controls */}
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              isLoading={isLoading || isRefreshing}
            />

            {/* Career Recommendations */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Recommended Career Paths
                </h2>
                {filteredCareers?.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {filteredCareers?.length} {filteredCareers?.length === 1 ? 'match' : 'matches'} found
                  </span>
                )}
              </div>

              {/* Career Cards Grid */}
              {isLoading || isRefreshing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3]?.map((index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : filteredCareers?.length === 0 ? (
                <EmptyState type="no-matches" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCareers?.map((career) => (
                    <CareerCard
                      key={career?.id}
                      career={career}
                      onBookmark={handleBookmark}
                      onCompare={handleCompare}
                      isBookmarked={bookmarkedCareers?.has(career?.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Load More Button */}
            {filteredCareers?.length > 0 && filteredCareers?.length >= 6 && (
              <div className="text-center">
                <Button
                  variant="outline"
                  size="default"
                  iconName="ChevronDown"
                  iconPosition="right"
                  iconSize={16}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Load More Recommendations
                </Button>
              </div>
            )}
          </>
        )}
      </main>
      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default CareerDashboard;