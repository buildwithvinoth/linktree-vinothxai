"use client";

import React, { useEffect, useState } from "react";
import { Send, Mail, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// EmailJS configuration - Replace with your actual values
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

export const ContactForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();

  // Initialize EmailJS client from the npm package when component mounts
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const emailjs = await import("@emailjs/browser");
        // call init; safe to call repeatedly
        if (mounted && emailjs && typeof emailjs.init === "function") {
          emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        }
      } catch (err) {
        console.warn("Failed to import @emailjs/browser at runtime:", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      // dynamic import ensures this runs client-side and reduces SSR problems
      const emailjs = await import("@emailjs/browser");

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        // include any template variables your template expects (e.g. to_name)
      };

      // Option A: if you called init(...) above, 3-arg send will work
      // await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams);

      // Option B: pass public key as 4th arg (works even if init not called)
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
      setOpen(false);
    } catch (error: unknown) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Failed to send message",
        description:
          typeof error === "object" && error !== null && "text" in error
            ? (error as { text?: string }).text
            : "Please try again later or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className="bio-link-button group">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Mail className="w-6 h-6" />
          </div>

          <div className="flex-1 text-left">
            <div className="font-semibold text-lg text-card-foreground">Contact Me</div>
            <div className="text-sm text-muted-foreground">Send me a message</div>
          </div>

          <Send className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send me a message</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="Your name" disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="your@email.com" disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)} placeholder="Your message..." rows={4} disabled={isLoading} />
          </div>

          <Button type="submit" className="w-full gap-2" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
