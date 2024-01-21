// components/HeroSection.js
import React from 'react';
import DocumentModal from './DocumentModal';

const WelcomeSection = () => {
  return (
    <div className="bg-gray-200 text-gray-800 p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Willkommen in den Studios des Hörbuch Hamburg Verlags
      </h1>
      <p className="mb-6">Um den Teleprompter zu starten, tue folgendes:</p>
      <ol className="list-decimal list-inside mb-6 text-left mx-auto w-3/4 md:w-1/2">
        <li>
          Klicke auf <span className="font-bold">Docs</span> und wähle entweder
          ein bestehendes Dokument aus oder lade ein PDF-Dokument hoch.
        </li>
      </ol>
    </div>
  );
};

export default WelcomeSection;
