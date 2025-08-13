import { Instagram, Youtube, Twitter, Github, Linkedin, Mail } from "lucide-react";

interface SocialIconsProps {
  socialLinks: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export const SocialIcons = ({ socialLinks }: SocialIconsProps) => {
  const socialItems = [
    { 
      icon: Instagram, 
      href: socialLinks.instagram, 
      label: 'Instagram',
      color: 'hover:bg-pink-500'
    },
    { 
      icon: Youtube, 
      href: socialLinks.youtube, 
      label: 'YouTube',
      color: 'hover:bg-red-500'
    },
    { 
      icon: Twitter, 
      href: socialLinks.twitter, 
      label: 'Twitter',
      color: 'hover:bg-blue-500'
    },
    { 
      icon: Github, 
      href: socialLinks.github, 
      label: 'GitHub',
      color: 'hover:bg-gray-800'
    },
    { 
      icon: Linkedin, 
      href: socialLinks.linkedin, 
      label: 'LinkedIn',
      color: 'hover:bg-blue-600'
    },
    { 
      icon: Mail, 
      href: socialLinks.email ? `mailto:${socialLinks.email}` : undefined, 
      label: 'Email',
      color: 'hover:bg-green-500'
    },
  ].filter(item => item.href);

  if (socialItems.length === 0) return null;

  return (
    <div className="bio-section animate-fade-in">
      <div className="flex justify-center gap-4 flex-wrap">
        {socialItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`bio-social-icon ${item.color}`}
              aria-label={item.label}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </div>
    </div>
  );
};