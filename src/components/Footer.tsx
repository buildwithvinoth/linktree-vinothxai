import { Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 mt-12 text-center space-y-2">
      <p className="text-sm text-muted-foreground">
        © {currentYear} All rights reserved
      </p>
      <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
        Made with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> by{" "}
        <span className="font-medium text-accent">vinoth_x_ai</span>
      </p>
    </footer>
  );
};