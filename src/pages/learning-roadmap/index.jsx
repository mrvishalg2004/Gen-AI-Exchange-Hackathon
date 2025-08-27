import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ChatWidget from '../../components/ui/ChatWidget';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import RoadmapTimeline from './components/RoadmapTimeline';
import CourseCard from './components/CourseCard';
import SkillProgressCard from './components/SkillProgressCard';
import RoadmapFilters from './components/RoadmapFilters';
import AchievementBadge from './components/AchievementBadge';
import LearningStats from './components/LearningStats';

const LearningRoadmap = () => {
  const [selectedCareer, setSelectedCareer] = useState('frontend-developer');
  const [activeView, setActiveView] = useState('roadmap');
  const [bookmarkedCourses, setBookmarkedCourses] = useState(new Set(['course-1', 'course-3']));
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    timeCommitment: 'all',
    platform: 'all',
    priceRange: 'all'
  });
  const [expandedMilestone, setExpandedMilestone] = useState(null);

  // Mock data for career options
  const careerOptions = [
    { value: 'frontend-developer', label: 'Frontend Developer', progress: 65 },
    { value: 'fullstack-developer', label: 'Full Stack Developer', progress: 45 },
    { value: 'data-scientist', label: 'Data Scientist', progress: 30 }
  ];

  // Mock roadmap data
  const roadmapData = {
    milestones: [
      {
        id: 'milestone-1',
        title: 'HTML & CSS Fundamentals',
        description: 'Master the building blocks of web development with semantic HTML and modern CSS techniques.',
        difficulty: 'Beginner',
        estimatedTime: '4-6 weeks',
        skillImpact: 8,
        progress: 100,
        skills: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox', 'Grid'],
        prerequisites: ['Basic Computer Skills'],
        courses: [
          {
            id: 'course-1',
            title: 'Complete HTML & CSS Bootcamp',
            description: 'Learn HTML and CSS from scratch with hands-on projects and real-world examples.',
            instructor: 'Sarah Johnson',
            platform: 'Udemy',
            difficulty: 'Beginner',
            duration: '12 hours',
            rating: 4.8,
            reviews: 15420,
            enrollments: 89500,
            price: 49.99,
            originalPrice: 199.99,
            thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
            skills: ['HTML5', 'CSS3', 'Responsive Design'],
            certificate: true
          }
        ]
      },
      {
        id: 'milestone-2',
        title: 'JavaScript Programming',
        description: 'Learn JavaScript fundamentals, DOM manipulation, and modern ES6+ features.',
        difficulty: 'Intermediate',
        estimatedTime: '6-8 weeks',
        skillImpact: 9,
        progress: 75,
        skills: ['JavaScript ES6+', 'DOM Manipulation', 'Async Programming', 'APIs'],
        prerequisites: ['HTML & CSS Fundamentals'],
        courses: [
          {
            id: 'course-2',
            title: 'Modern JavaScript Complete Course',
            description: 'Master JavaScript with projects, exercises, and real-world applications.',
            instructor: 'John Smith',
            platform: 'Coursera',
            difficulty: 'Intermediate',
            duration: '25 hours',
            rating: 4.7,
            reviews: 8930,
            enrollments: 45200,
            price: 79.99,
            originalPrice: 149.99,
            thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop',
            skills: ['JavaScript', 'ES6+', 'DOM', 'Async/Await'],
            certificate: true
          }
        ]
      },
      {
        id: 'milestone-3',
        title: 'React Development',
        description: 'Build modern web applications with React, hooks, and state management.',
        difficulty: 'Intermediate',
        estimatedTime: '8-10 weeks',
        skillImpact: 10,
        progress: 40,
        skills: ['React', 'JSX', 'Hooks', 'State Management', 'Component Design'],
        prerequisites: ['JavaScript Programming'],
        courses: [
          {
            id: 'course-3',
            title: 'React - The Complete Guide',
            description: 'Learn React from basics to advanced concepts with hooks, context, and more.',
            instructor: 'Mike Chen',
            platform: 'edX',
            difficulty: 'Intermediate',
            duration: '40 hours',
            rating: 4.9,
            reviews: 12450,
            enrollments: 67800,
            price: 0,
            originalPrice: null,
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
            skills: ['React', 'Hooks', 'Context API', 'Redux'],
            certificate: true
          }
        ]
      },
      {
        id: 'milestone-4',
        title: 'Advanced Frontend Tools',
        description: 'Master build tools, testing, and deployment for professional development.',
        difficulty: 'Advanced',
        estimatedTime: '6-8 weeks',
        skillImpact: 8,
        progress: 0,
        skills: ['Webpack', 'Testing', 'CI/CD', 'Performance Optimization'],
        prerequisites: ['React Development'],
        courses: [
          {
            id: 'course-4',
            title: 'Advanced Frontend Development',
            description: 'Learn professional frontend development practices and tools.',
            instructor: 'Emily Davis',
            platform: 'Pluralsight',
            difficulty: 'Advanced',
            duration: '30 hours',
            rating: 4.6,
            reviews: 3420,
            enrollments: 18900,
            price: 129.99,
            originalPrice: 199.99,
            thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
            skills: ['Webpack', 'Jest', 'Cypress', 'Docker'],
            certificate: true
          }
        ]
      }
    ]
  };

  // Mock skill progress data
  const skillsProgress = [
    {
      name: 'HTML & CSS',
      category: 'Frontend',
      currentLevel: 'Advanced',
      targetLevel: 'Expert',
      progress: 85,
      timeToTarget: '2 weeks',
      activeCourses: 1,
      nextMilestone: 'CSS Grid Mastery',
      careerImpact: 4
    },
    {
      name: 'JavaScript',
      category: 'Programming',
      currentLevel: 'Intermediate',
      targetLevel: 'Advanced',
      progress: 65,
      timeToTarget: '6 weeks',
      activeCourses: 2,
      nextMilestone: 'Async Programming',
      careerImpact: 5
    },
    {
      name: 'React',
      category: 'Framework',
      currentLevel: 'Beginner',
      targetLevel: 'Intermediate',
      progress: 35,
      timeToTarget: '8 weeks',
      activeCourses: 1,
      nextMilestone: 'Component Lifecycle',
      careerImpact: 5
    },
    {
      name: 'Version Control',
      category: 'Tools',
      currentLevel: 'Intermediate',
      targetLevel: 'Advanced',
      progress: 70,
      timeToTarget: '3 weeks',
      activeCourses: 0,
      nextMilestone: 'Advanced Git Workflows',
      careerImpact: 3
    }
  ];

  // Mock achievements data
  const achievements = [
    {
      id: 'first-course',
      title: 'First Course',
      description: 'Complete your first course',
      type: 'milestone',
      progress: 100,
      current: 1,
      target: 1,
      isNew: false,
      unlockedDate: '2025-01-15',
      reward: '50 XP'
    },
    {
      id: 'week-streak',
      title: '7-Day Streak',
      description: 'Learn for 7 consecutive days',
      type: 'streak',
      progress: 100,
      current: 7,
      target: 7,
      isNew: true,
      unlockedDate: '2025-01-20',
      reward: '100 XP'
    },
    {
      id: 'skill-master',
      title: 'Skill Master',
      description: 'Master 5 different skills',
      type: 'skill',
      progress: 60,
      current: 3,
      target: 5,
      isNew: false
    },
    {
      id: 'speed-learner',
      title: 'Speed Learner',
      description: 'Complete 10 hours in a week',
      type: 'time',
      progress: 80,
      current: 8,
      target: 10,
      isNew: false
    }
  ];

  // Mock learning statistics
  const learningStats = {
    totalHours: 127,
    completedCourses: 8,
    skillsLearned: 12,
    currentStreak: 5,
    certificatesEarned: 6,
    averageRating: 4.7,
    weeklyProgress: {
      hoursThisWeek: 8,
      weeklyGoal: 10
    },
    recentAchievement: '7-Day Learning Streak'
  };

  // Mock recommended courses
  const recommendedCourses = [
    {
      id: 'course-5',
      title: 'TypeScript for React Developers',
      description: 'Learn TypeScript to build more robust React applications with type safety.',
      instructor: 'Alex Thompson',
      platform: 'LinkedIn Learning',
      difficulty: 'Intermediate',
      duration: '8 hours',
      rating: 4.8,
      reviews: 2340,
      enrollments: 15600,
      price: 29.99,
      originalPrice: 59.99,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      skills: ['TypeScript', 'React', 'Type Safety'],
      certificate: true
    },
    {
      id: 'course-6',
      title: 'Web Performance Optimization',
      description: 'Master techniques to make your web applications lightning fast.',
      instructor: 'Maria Garcia',
      platform: 'YouTube',
      difficulty: 'Advanced',
      duration: '6 hours',
      rating: 4.6,
      reviews: 890,
      enrollments: 8900,
      price: 0,
      originalPrice: null,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      skills: ['Performance', 'Optimization', 'Web Vitals'],
      certificate: false
    }
  ];

  const handleBookmarkToggle = (courseId) => {
    const newBookmarks = new Set(bookmarkedCourses);
    if (newBookmarks?.has(courseId)) {
      newBookmarks?.delete(courseId);
    } else {
      newBookmarks?.add(courseId);
    }
    setBookmarkedCourses(newBookmarks);
  };

  const handleCourseEnroll = (course) => {
    window.open(`https://example.com/course/${course?.id}`, '_blank');
  };

  const handleMilestoneClick = (milestoneId) => {
    setExpandedMilestone(expandedMilestone === milestoneId ? null : milestoneId);
  };

  const handleExportRoadmap = () => {
    // Mock export functionality
    alert('Roadmap exported successfully! Check your downloads folder.');
  };

  const filteredCourses = recommendedCourses?.filter(course => {
    if (filters?.difficulty !== 'all' && course?.difficulty?.toLowerCase() !== filters?.difficulty) {
      return false;
    }
    if (filters?.platform !== 'all' && course?.platform?.toLowerCase() !== filters?.platform?.toLowerCase()) {
      return false;
    }
    if (filters?.priceRange !== 'all') {
      if (filters?.priceRange === 'free' && course?.price > 0) return false;
      if (filters?.priceRange === '0-50' && (course?.price < 0 || course?.price > 50)) return false;
      if (filters?.priceRange === '51-100' && (course?.price < 51 || course?.price > 100)) return false;
      if (filters?.priceRange === '101-200' && (course?.price < 101 || course?.price > 200)) return false;
      if (filters?.priceRange === '200+' && course?.price < 200) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Breadcrumb */}
        <BreadcrumbTrail className="mb-6" />

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">Learning Roadmap</h1>
            <p className="text-muted-foreground">
              Personalized learning paths to achieve your career goals
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              onClick={handleExportRoadmap}
            >
              Export Roadmap
            </Button>
            <Link to="/career-dashboard">
              <Button variant="default" iconName="BarChart3" iconPosition="left" iconSize={16}>
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Career Selection */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Target" size={20} className="text-primary" />
            <h2 className="font-semibold text-foreground">Career Path</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {careerOptions?.map((career) => (
              <div
                key={career?.value}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedCareer === career?.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedCareer(career?.value)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground">{career?.label}</h3>
                  <span className="text-sm font-medium text-primary">{career?.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${career?.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={activeView === 'roadmap' ? 'default' : 'ghost'}
            size="sm"
            iconName="Route"
            iconPosition="left"
            iconSize={16}
            onClick={() => setActiveView('roadmap')}
          >
            Roadmap
          </Button>
          <Button
            variant={activeView === 'skills' ? 'default' : 'ghost'}
            size="sm"
            iconName="Star"
            iconPosition="left"
            iconSize={16}
            onClick={() => setActiveView('skills')}
          >
            Skills
          </Button>
          <Button
            variant={activeView === 'courses' ? 'default' : 'ghost'}
            size="sm"
            iconName="BookOpen"
            iconPosition="left"
            iconSize={16}
            onClick={() => setActiveView('courses')}
          >
            Courses
          </Button>
          <Button
            variant={activeView === 'achievements' ? 'default' : 'ghost'}
            size="sm"
            iconName="Award"
            iconPosition="left"
            iconSize={16}
            onClick={() => setActiveView('achievements')}
          >
            Achievements
          </Button>
        </div>

        {/* Learning Statistics */}
        <LearningStats stats={learningStats} className="mb-6" />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters (Desktop) / Top (Mobile) */}
          <div className="lg:col-span-1">
            <RoadmapFilters 
              onFiltersChange={setFilters}
              activeFilters={filters}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeView === 'roadmap' && (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Icon name="Route" size={20} className="text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Frontend Developer Roadmap
                  </h2>
                </div>
                
                <RoadmapTimeline
                  roadmapData={roadmapData}
                  selectedCareer={selectedCareer}
                  onMilestoneClick={handleMilestoneClick}
                />
              </div>
            )}

            {activeView === 'skills' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Star" size={20} className="text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Skill Progress</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillsProgress?.map((skill, index) => (
                    <SkillProgressCard key={index} skill={skill} />
                  ))}
                </div>
              </div>
            )}

            {activeView === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="BookOpen" size={20} className="text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">
                      Recommended Courses
                    </h2>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {filteredCourses?.length} courses found
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses?.map((course) => (
                    <CourseCard
                      key={course?.id}
                      course={course}
                      onBookmark={handleBookmarkToggle}
                      onEnroll={handleCourseEnroll}
                      isBookmarked={bookmarkedCourses?.has(course?.id)}
                    />
                  ))}
                </div>
                
                {filteredCourses?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No courses found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to see more results
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeView === 'achievements' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Award" size={20} className="text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Achievements</h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {achievements?.map((achievement) => (
                    <AchievementBadge
                      key={achievement?.id}
                      achievement={achievement}
                      isUnlocked={achievement?.progress === 100}
                    />
                  ))}
                </div>
                
                <div className="bg-muted/30 border border-border rounded-lg p-6 text-center">
                  <Icon name="Trophy" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Keep Learning!</h3>
                  <p className="text-muted-foreground">
                    Complete more courses and milestones to unlock additional achievements
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  );
};

export default LearningRoadmap;