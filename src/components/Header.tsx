import { AuthButtons } from './AuthButtons';
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Logo } from './Logo';

export function Header() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo size="md" />
          </Link>
          <SignedIn>
            <Link 
              to="/dashboard" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
          </SignedIn>
        </div>
        <div className="flex items-center gap-4">
          <AuthButtons />
        </div>
      </div>
    </header>
  );
} 