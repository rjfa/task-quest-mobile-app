
import React from 'react';
import GameWrapper from '@/components/GameWrapper';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen">
      {isMobile ? (
        <GameWrapper />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-game-background to-black text-white p-4">
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold mb-2">TaskQuest Mobile App</h1>
              <p className="text-gray-400">Please view on a mobile device for the best experience.</p>
            </div>
            
            <div className="border-4 border-game-border rounded-3xl overflow-hidden shadow-xl max-w-[320px] mx-auto">
              <div className="bg-black pt-4 px-2">
                <div className="h-6 w-24 mx-auto bg-game-border rounded-full mb-1"></div>
                <GameWrapper />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
