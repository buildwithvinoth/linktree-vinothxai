import { Star, Play } from "lucide-react";

interface HighlightSectionProps {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  type?: 'announcement' | 'video' | 'featured';
}

export const HighlightSection = ({ 
  title, 
  description, 
  imageUrl, 
  link, 
  type = 'announcement' 
}: HighlightSectionProps) => {
  const handleClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'video':
        return <Play className="w-5 h-5" />;
      case 'featured':
        return <Star className="w-5 h-5" fill="currentColor" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div className="bio-section animate-scale-in">
      <div 
        className={`bio-highlight-card ${link ? 'cursor-pointer hover:scale-[1.02]' : ''} group`}
        onClick={handleClick}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center">
            {getIcon()}
          </div>
          
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
            
            {imageUrl && (
              <div className="mt-4 rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};