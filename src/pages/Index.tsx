import { ProfileHeader } from "@/components/ProfileHeader";
import { LinkCard } from "@/components/LinkCard";
import { HighlightSection } from "@/components/HighlightSection";
import { SocialIcons } from "@/components/SocialIcons";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { 
  Instagram, 
  Youtube, 
  Github, 
  Briefcase, 
  FileText,
  Coffee, Brain,
  Paperclip,
  BadgeCheck 
} from "lucide-react";

const Index = () => {
  // Profile data - easily customizable
  const profileData = {
    name: "Vinoth",
    bio: "AI video creator & full-stack developer crafting cinematic visuals, smart web apps, and unforgettable digital experiences.",
    profileImage: "/lovable-uploads/74131b12-7769-4683-8764-afb0ac9ff019.png",
    isVerified: true
  };

  // Social links
  const socialLinks = {
    instagram: "https://instagram.com/vinoth_x_ai",
    youtube: "https://youtube.com/@vinoth_x_ai",
    github: "https://github.com/vinoth",
    email: "buildwithvinoth@gmail.com"
  };

  // Main links
  const links = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      label: "Website",
      href: "https://vinothai.vercel.app/",
      description: "My work & case studies"
    },
    {
      icon: <Paperclip className="w-6 h-6" />,
      label: "VFC Ad Prompt",
      href: "https://docs.google.com/document/d/1WB5V8BThe89jz0XnSLwLcAAmgV970qGPdUKln8UkPAc/edit?usp=sharing",
      description: "VFC Ad Prompt for AI tools",
    },
    {
      icon: <Paperclip className="w-6 h-6" />,
      label: "🍌 NanBan Prompt",
      href: "https://docs.google.com/document/d/1jVPAKgYov-B5jRTGrKHC2EauHG-Tvdrg5s6Z65I8frU/edit?usp=sharing",
      description: "NanBan Prompt for AI tools",
    },
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      label: "Fiverr",
      href: "http://www.fiverr.com/s/DBa6zNa",
      description: "Fiverr profile for freelance services",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      label: "Buy me a coffee",
      href: "https://buymeacoffee.com/vinoth_x_ai",
      description: "Support my work"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-lg mx-auto space-y-8">
        {/* Profile Header */}
        <ProfileHeader 
          profileImage={profileData.profileImage}
          name={profileData.name}
          bio={profileData.bio}
          isVerified={profileData.isVerified}
        />


        {/* Main Links */}
        <div className="bio-section space-y-3">
          {links.map((link, index) => (
            <div 
              key={index} 
              className="animate-fade-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <LinkCard
                icon={link.icon}
                label={link.label}
                href={link.href}
                description={link.description}
                isHighlighted={false}
              />
            </div>
          ))}

          {/* Contact Form */}
          <div 
            className="animate-fade-in"
            style={{ animationDelay: `${0.2 + links.length * 0.1}s` }}
          >
            <ContactForm />
          </div>
        </div>

        {/* Social Icons */}
        <SocialIcons socialLinks={socialLinks} />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
