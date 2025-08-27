import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CourseCard = ({ course, onBookmark, onEnroll, isBookmarked = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPriceDisplay = (price, originalPrice) => {
    if (price === 0) return 'Free';
    if (originalPrice && originalPrice > price) {
      return (
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-foreground">${price}</span>
          <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
        </div>
      );
    }
    return <span className="font-semibold text-foreground">${price}</span>;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={12} className="text-warning fill-current" />);
    }

    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="StarHalf" size={12} className="text-warning fill-current" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={12} className="text-muted" />);
    }

    return stars;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-soft-hover transition-soft">
      {/* Course Image */}
      <div className="relative h-40 bg-muted overflow-hidden">
        <Image
          src={course?.thumbnail}
          alt={course?.title}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Bookmark Button */}
        <Button
          variant="ghost"
          size="sm"
          iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
          iconSize={16}
          onClick={() => onBookmark(course?.id)}
          className={`absolute top-2 right-2 ${isBookmarked ? 'text-primary bg-primary/10' : 'text-muted-foreground bg-background/80'} hover:bg-background/90`}
        />

        {/* Platform Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-background/90 text-xs font-medium text-foreground rounded-md">
            {course?.platform}
          </span>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute bottom-2 left-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-md ${getDifficultyColor(course?.difficulty)}`}>
            {course?.difficulty}
          </span>
        </div>
      </div>
      {/* Course Content */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
            {course?.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course?.description}
          </p>
        </div>

        {/* Instructor */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={12} color="white" />
          </div>
          <span className="text-sm text-muted-foreground">{course?.instructor}</span>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{course?.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{course?.enrollments?.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="flex items-center space-x-1">
              {renderStars(course?.rating)}
            </div>
            <span className="font-medium">({course?.reviews})</span>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {course?.skills?.slice(0, 3)?.map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
            {course?.skills?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{course?.skills?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {getPriceDisplay(course?.price, course?.originalPrice)}
            {course?.originalPrice && course?.originalPrice > course?.price && (
              <span className="text-xs text-success">
                {Math.round(((course?.originalPrice - course?.price) / course?.originalPrice) * 100)}% off
              </span>
            )}
          </div>
          
          <Button
            variant={course?.price === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => onEnroll(course)}
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={14}
          >
            {course?.price === 0 ? 'Enroll Free' : 'View Course'}
          </Button>
        </div>

        {/* Certificate Badge */}
        {course?.certificate && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-2 text-xs text-success">
              <Icon name="Award" size={12} />
              <span>Certificate included</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;