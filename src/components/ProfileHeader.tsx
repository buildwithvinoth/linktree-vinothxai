import { useState } from "react";
import { CheckCircle, QrCode } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  profileImage: string;
  name: string;
  bio: string;
  isVerified?: boolean;
}

export const ProfileHeader = ({ profileImage, name, bio, isVerified = false }: ProfileHeaderProps) => {
  const [qrOpen, setQrOpen] = useState(false);

  const generateQRCode = () => {
    const currentUrl = window.location.href;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}`;
    return qrCodeUrl;
  };

  return (
    <div className="bio-section animate-fade-in">
      <div className="text-center space-y-6">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={profileImage}
            alt={`${name}'s profile picture`}
            className="bio-profile-image object-top"
          />
        </div>

        {/* Name and Verification */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {name}
            </h1>
            {isVerified && (
              <CheckCircle 
                className="w-6 h-6 text-accent" 
                fill="currentColor"
              />
            )}
          </div>
          
          {/* Bio */}
          <p className="text-lg text-muted-foreground max-w-sm mx-auto leading-relaxed">
            {bio}
          </p>
        </div>

        {/* QR Code Button */}
        <Dialog open={qrOpen} onOpenChange={setQrOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 bg-card hover:bg-card-hover"
            >
              <QrCode className="w-4 h-4" />
              QR Code
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share QR Code</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <img
                src={generateQRCode()}
                alt="QR Code for profile"
                className="w-64 h-64 rounded-lg border"
              />
              <p className="text-sm text-muted-foreground text-center">
                Scan this QR code to visit this profile
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};