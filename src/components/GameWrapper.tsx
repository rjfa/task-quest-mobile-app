
import React from 'react';
import GameHeader from './GameHeader';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { TaskProvider } from '@/contexts/TaskContext';
import { AnimatePresence, motion } from 'framer-motion';

const GameWrapper: React.FC = () => {
  return (
    <TaskProvider>
      <div className="bg-gradient-to-b from-game-background to-black min-h-screen text-white overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] rounded-full bg-game-primary/20 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] rounded-full bg-game-secondary/20 blur-[100px]" />
          
          <AnimatePresence>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ 
                  opacity: 0.3, 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 3, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {/* Main content */}
        <div className="relative z-10 max-w-md mx-auto pb-24 min-h-screen flex flex-col">
          <GameHeader />
          <TaskList />
          <TaskForm />
        </div>
      </div>
    </TaskProvider>
  );
};

export default GameWrapper;
