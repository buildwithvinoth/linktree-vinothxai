import { ExternalLink } from "lucide-react";
import { ReactNode } from "react";

interface LinkCardProps {
  icon: ReactNode;
  label: string;
  href: string;
  description?: string;
  isHighlighted?: boolean;
}

export const LinkCard = ({ icon, label, href, description, isHighlighted = false }: LinkCardProps) => {
  const handleClick = () => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full px-6 py-4 rounded-full transition-all duration-300 
        hover:scale-105 active:scale-95
        border-2 border-foreground/20 bg-card text-card-foreground 
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:bg-primary hover:text-white hover:border-primary
        ${isHighlighted ? 'ring-2 ring-foreground/20 ring-offset-2 bg-primary text-primary-foreground border-primary' : ''}
        focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2
        group
      `}
      aria-label={`Visit ${label}`}
    >
      <div className="flex items-center justify-center gap-3">
        <div className="flex-shrink-0 transition-colors duration-300 group-hover:text-white">
          {icon}
        </div>
        <div className="text-center">
          <span className="font-semibold text-lg transition-colors duration-300 group-hover:text-white">{label}</span>
        </div>
      </div>
    </button>
  );
};