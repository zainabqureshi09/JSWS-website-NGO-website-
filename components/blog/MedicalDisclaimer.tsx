import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface MedicalDisclaimerProps {
  customDisclaimer?: string;
}

export function MedicalDisclaimer({ customDisclaimer }: MedicalDisclaimerProps) {
  const disclaimerText =
    customDisclaimer ||
    "Disclaimer: The medical and healthcare information provided on the Jamila Sultan Welfare Society (JSWS) website is strictly for educational, informational, and community health awareness purposes. It does not constitute formal medical advice, diagnosis, or individual treatment plans. Always consult a qualified physician or healthcare provider at JSWS JSMDC Clinics or your local medical facility for any medical concerns or diagnostic evaluations.";

  return (
    <aside
      aria-label="Medical disclaimer"
      className="my-8 p-5 sm:p-6 rounded-2xl bg-red-50/80 border border-red-200/80 text-gray-800"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-[var(--color-primary)] text-white shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1">
            Medical Disclaimer
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed text-gray-700">
            {disclaimerText}
          </p>
        </div>
      </div>
    </aside>
  );
}
