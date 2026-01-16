
import React from 'react';
import { Heart, Shield } from 'lucide-react';

interface FooterProps {
    onNavigateToPrivacy?: () => void;
    onNavigateToTerms?: () => void;
    onNavigateToSecurity?: () => void;
}

export const Footer = ({ onNavigateToPrivacy, onNavigateToTerms, onNavigateToSecurity }: FooterProps) => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-24 pb-12">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-sm">
                <div className="flex items-center gap-2 mb-6">
                     <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <Shield size={16} />
                     </div>
                     <span className="text-xl font-serif font-bold text-gray-900">Compliee</span>
                </div>
                <p className="text-gray-500 leading-relaxed mb-6">
                    The governance operating system for modern enterprises. 
                    Draft, audit, and monitor compliance in one unified workspace.
                </p>
            </div>

            <div>
                <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
                <ul className="space-y-3 text-sm text-gray-500">
                    <FooterLink text="Privacy Policy" onClick={onNavigateToPrivacy} />
                    <FooterLink text="Terms of Service" onClick={onNavigateToTerms} />
                    <FooterLink text="Security" onClick={onNavigateToSecurity} />
                </ul>
            </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© 2026 Compliee Inc. All rights reserved.</p>
            <p className="flex items-center gap-1">
                Made with <Heart size={10} className="text-red-400 fill-red-400" /> in San Francisco
            </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ text, onClick }: { text: string, onClick?: () => void }) => (
    <li>
        <button onClick={onClick} className="hover:text-blue-600 transition-colors text-left">{text}</button>
    </li>
);
