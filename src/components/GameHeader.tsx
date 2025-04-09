
import React from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import { Progress } from '@/components/ui/progress';
import { Award, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const GameHeader: React.FC = () => {
  const { gameStats } = useTaskContext();
  const { level, xp, xpToNextLevel, totalTasksCompleted } = gameStats;
  
  const xpPercentage = (xp / xpToNextLevel) * 100;
  
  return (
    <div className="bg-gradient-to-b from-game-primary/80 to-game-primary/30 backdrop-blur-sm p-4 border-b border-game-border/30 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <motion.div 
            className="w-12 h-12 bg-game-secondary rounded-full flex items-center justify-center border-2 border-white shadow-lg mr-3"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold">TaskQuest</h1>
            <div className="text-xs text-gray-200">Making productivity fun!</div>
          </div>
        </div>
        
        <div className="bg-game-background/50 px-3 py-1.5 rounded-full flex items-center">
          <Award className="h-5 w-5 text-yellow-300 mr-1.5" />
          <span className="font-bold">Level {level}</span>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span>XP: {xp}/{xpToNextLevel}</span>
          <span>Tasks Completed: {totalTasksCompleted}</span>
        </div>
        <Progress value={xpPercentage} className="h-2 bg-gray-700">
          <div className="h-full bg-game-xp rounded-full" />
        </Progress>
      </div>
    </div>
  );
};

export default GameHeader;
