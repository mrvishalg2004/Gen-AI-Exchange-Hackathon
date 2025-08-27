import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ChatWidget from '../../components/ui/ChatWidget';
import CareerOverview from './components/CareerOverview';
import SkillsMatrix from './components/SkillsMatrix';
import LearningRoadmap from './components/LearningRoadmap';
import MarketDemandChart from './components/MarketDemandChart';
import RelatedCareers from './components/RelatedCareers';
import ActionButtons from './components/ActionButtons';

const CareerDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [careerData, setCareerData] = useState(null);

  const careerName = searchParams?.get('career') || 'Full Stack Developer';

  // Mock career data
  const mockCareerData = {
    id: 'fullstack-developer',
    title: 'Full Stack Developer',
    category: 'Software Development',
    description: `A Full Stack Developer is a versatile professional who works on both the front-end and back-end portions of web applications. They have expertise in multiple programming languages, frameworks, and databases, enabling them to build complete web solutions from user interface to server-side logic and database management.`,
    salaryRange: '$65,000 - $120,000',
    averageSalary: '$85,000',
    growthRate: '+22%',
    jobOpenings: '2,847',
    demandLevel: 'High',
    isSaved: false,
    responsibilities: [
      'Design and develop user-facing web applications',
      'Build and maintain server-side applications and APIs',
      'Manage database design and optimization',
      'Collaborate with cross-functional teams',
      'Implement security and data protection measures',
      'Optimize applications for maximum speed and scalability',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and testing processes'
    ],
    skills: [
      {
        name: 'JavaScript',
        currentLevel: 75,
        requiredLevel: 85,
        learningResources: [
          { title: 'Advanced JavaScript Course', url: 'https://example.com/js-course' },
          { title: 'ES6+ Masterclass', url: 'https://example.com/es6-course' }
        ]
      },
      {
        name: 'React.js',
        currentLevel: 80,
        requiredLevel: 90,
        learningResources: [
          { title: 'React Advanced Patterns', url: 'https://example.com/react-course' },
          { title: 'React Performance Optimization', url: 'https://example.com/react-perf' }
        ]
      },
      {
        name: 'Node.js',
        currentLevel: 60,
        requiredLevel: 80,
        learningResources: [
          { title: 'Node.js Complete Guide', url: 'https://example.com/node-course' },
          { title: 'Express.js Fundamentals', url: 'https://example.com/express-course' }
        ]
      },
      {
        name: 'Database Management',
        currentLevel: 45,
        requiredLevel: 75,
        learningResources: [
          { title: 'SQL Mastery Course', url: 'https://example.com/sql-course' },
          { title: 'MongoDB for Developers', url: 'https://example.com/mongodb-course' }
        ]
      },
      {
        name: 'DevOps & Deployment',
        currentLevel: 30,
        requiredLevel: 70,
        learningResources: [
          { title: 'Docker & Kubernetes', url: 'https://example.com/devops-course' },
          { title: 'AWS for Developers', url: 'https://example.com/aws-course' }
        ]
      }
    ],
    roadmap: {
      totalDuration: '6-8 months',
      phases: [
        {
          title: 'Foundation Phase',
          description: 'Master core web development fundamentals',
          duration: '6-8 weeks',
          difficulty: 'Beginner',
          completed: true,
          completedDate: '2024-06-15',
          objectives: [
            'Understand HTML5 semantic structure and accessibility',
            'Master CSS3 including Flexbox and Grid layouts',
            'Learn JavaScript ES6+ fundamentals and DOM manipulation',
            'Set up development environment and version control'
          ],
          courses: [
            {
              title: 'Complete Web Development Bootcamp',
              provider: 'Udemy',
              duration: '65 hours',
              rating: 4.7,
              url: 'https://example.com/web-bootcamp'
            },
            {
              title: 'JavaScript: The Complete Guide',
              provider: 'Coursera',
              duration: '40 hours',
              rating: 4.8,
              url: 'https://example.com/js-guide'
            }
          ],
          projects: [
            {
              title: 'Personal Portfolio Website',
              description: 'Build a responsive portfolio showcasing your projects'
            },
            {
              title: 'Interactive To-Do Application',
              description: 'Create a dynamic task management app with local storage'
            }
          ]
        },
        {
          title: 'Frontend Specialization',
          description: 'Deep dive into modern frontend frameworks and tools',
          duration: '8-10 weeks',
          difficulty: 'Intermediate',
          completed: false,
          objectives: [
            'Master React.js including hooks, context, and state management',
            'Learn component-based architecture and reusable design patterns',
            'Understand modern build tools and development workflows',
            'Implement responsive design and cross-browser compatibility'
          ],
          courses: [
            {
              title: 'React - The Complete Guide',
              provider: 'Udemy',
              duration: '48 hours',
              rating: 4.9,
              url: 'https://example.com/react-complete'
            },
            {
              title: 'Advanced CSS and Sass',
              provider: 'Pluralsight',
              duration: '25 hours',
              rating: 4.6,
              url: 'https://example.com/advanced-css'
            }
          ],
          projects: [
            {
              title: 'E-commerce Product Catalog',
              description: 'Build a dynamic product listing with search and filtering'
            },
            {
              title: 'Social Media Dashboard',
              description: 'Create a responsive dashboard with data visualization'
            }
          ]
        },
        {
          title: 'Backend Development',
          description: 'Learn server-side programming and database management',
          duration: '10-12 weeks',
          difficulty: 'Intermediate',
          completed: false,
          objectives: [
            'Build RESTful APIs using Node.js and Express.js',
            'Design and implement database schemas with SQL and NoSQL',
            'Implement authentication and authorization systems',
            'Learn about server deployment and cloud services'
          ],
          courses: [
            {
              title: 'Node.js, Express, MongoDB & More',
              provider: 'Udemy',
              duration: '42 hours',
              rating: 4.8,
              url: 'https://example.com/node-course'
            },
            {
              title: 'Database Design and Management',
              provider: 'edX',
              duration: '30 hours',
              rating: 4.5,
              url: 'https://example.com/database-course'
            }
          ],
          projects: [
            {
              title: 'Blog API with Authentication',
              description: 'Create a full-featured blog API with user management'
            },
            {
              title: 'Real-time Chat Application',
              description: 'Build a WebSocket-based messaging platform'
            }
          ]
        },
        {
          title: 'Full Stack Integration',
          description: 'Combine frontend and backend skills for complete applications',
          duration: '8-10 weeks',
          difficulty: 'Advanced',
          completed: false,
          objectives: [
            'Integrate frontend and backend components seamlessly',
            'Implement advanced features like real-time updates and file uploads',
            'Learn testing strategies for full stack applications',
            'Deploy applications to production environments'
          ],
          courses: [
            {
              title: 'Full Stack Web Development with MERN',
              provider: 'Coursera',
              duration: '55 hours',
              rating: 4.7,
              url: 'https://example.com/mern-course'
            },
            {
              title: 'DevOps for Developers',
              provider: 'Pluralsight',
              duration: '35 hours',
              rating: 4.4,
              url: 'https://example.com/devops-course'
            }
          ],
          projects: [
            {
              title: 'Full Stack E-commerce Platform',
              description: 'Build a complete online store with payment integration'
            },
            {
              title: 'Project Management Tool',
              description: 'Create a collaborative workspace with real-time features'
            }
          ]
        }
      ]
    },
    demandData: [
      { year: '2020', demand: 85 },
      { year: '2021', demand: 92 },
      { year: '2022', demand: 98 },
      { year: '2023', demand: 105 },
      { year: '2024', demand: 112 },
      { year: '2025', demand: 118 }
    ],
    salaryTrends: [
      { year: '2020', salary: 72000 },
      { year: '2021', salary: 76000 },
      { year: '2022', salary: 81000 },
      { year: '2023', salary: 85000 },
      { year: '2024', salary: 89000 },
      { year: '2025', salary: 94000 }
    ],
    relatedCareers: [
      {
        title: 'Frontend Developer',
        category: 'Web Development',
        salaryRange: '$55K - $95K',
        growthRate: '+18%',
        matchPercentage: 85,
        transitionTime: '2-3 months',
        overlappingSkills: ['JavaScript', 'React', 'CSS', 'HTML', 'UI/UX']
      },
      {
        title: 'Backend Developer',
        category: 'Server Development',
        salaryRange: '$60K - $110K',
        growthRate: '+20%',
        matchPercentage: 80,
        transitionTime: '3-4 months',
        overlappingSkills: ['Node.js', 'Database', 'API Design', 'Security']
      },
      {
        title: 'DevOps Engineer',
        category: 'Infrastructure',
        salaryRange: '$70K - $130K',
        growthRate: '+25%',
        matchPercentage: 65,
        transitionTime: '4-6 months',
        overlappingSkills: ['Cloud Services', 'Docker', 'CI/CD', 'Monitoring']
      },
      {
        title: 'Mobile App Developer',
        category: 'Mobile Development',
        salaryRange: '$58K - $105K',
        growthRate: '+19%',
        matchPercentage: 70,
        transitionTime: '3-5 months',
        overlappingSkills: ['JavaScript', 'React Native', 'API Integration']
      },
      {
        title: 'Software Architect',
        category: 'Architecture',
        salaryRange: '$90K - $160K',
        growthRate: '+15%',
        matchPercentage: 60,
        transitionTime: '2-3 years',
        overlappingSkills: ['System Design', 'Architecture Patterns', 'Leadership']
      },
      {
        title: 'Product Manager',
        category: 'Product Management',
        salaryRange: '$75K - $140K',
        growthRate: '+17%',
        matchPercentage: 45,
        transitionTime: '6-12 months',
        overlappingSkills: ['Technical Understanding', 'Project Management', 'Analytics']
      }
    ]
  };

  useEffect(() => {
    // Simulate loading career data
    const loadCareerData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCareerData(mockCareerData);
      setIsLoading(false);
    };

    loadCareerData();
  }, [careerName]);

  const handleSaveCareer = async (careerId) => {
    // Mock save functionality
    console.log('Saving career:', careerId);
    return new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleCompareCareer = () => {
    navigate('/career-dashboard?tab=compare');
  };

  const handleStartLearning = () => {
    navigate('/learning-roadmap');
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/career-dashboard', icon: 'Home' },
    { label: 'Dashboard', path: '/career-dashboard', icon: 'LayoutDashboard' },
    { label: careerData?.title || 'Career Details', path: '/career-details', icon: 'Briefcase' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading career details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!careerData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Career not found</p>
            <button
              onClick={() => navigate('/career-dashboard')}
              className="text-primary hover:text-primary/80 transition-soft"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      <Header />
      <TabNavigation />
      <main className="w-full px-4 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <BreadcrumbTrail customBreadcrumbs={customBreadcrumbs} className="mb-6" />

          {/* Main Content */}
          <div className="space-y-6">
            {/* Career Overview */}
            <CareerOverview career={careerData} />

            {/* Action Buttons */}
            <ActionButtons
              career={careerData}
              onSave={handleSaveCareer}
              onCompare={handleCompareCareer}
              onStartLearning={handleStartLearning}
            />

            {/* Two Column Layout for Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Skills Matrix */}
                <SkillsMatrix skills={careerData?.skills} />
                
                {/* Market Demand Chart */}
                <MarketDemandChart
                  demandData={careerData?.demandData}
                  salaryTrends={careerData?.salaryTrends}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Learning Roadmap */}
                <LearningRoadmap roadmap={careerData?.roadmap} />
              </div>
            </div>

            {/* Related Careers - Full Width */}
            <RelatedCareers careers={careerData?.relatedCareers} />
          </div>
        </div>
      </main>
      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default CareerDetailsPage;