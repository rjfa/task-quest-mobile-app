
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority: TaskPriority;
  dueDate?: Date;
  description?: string;
  xpReward: number;
};

type GameStats = {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalTasksCompleted: number;
};

interface TaskContextType {
  tasks: Task[];
  gameStats: GameStats;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'xpReward'>) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const calculateXpReward = (priority: TaskPriority): number => {
  switch (priority) {
    case 'low':
      return 10;
    case 'medium':
      return 20;
    case 'high':
      return 30;
    default:
      return 10;
  }
};

const calculateXpToNextLevel = (level: number): number => {
  return 100 + (level * 20);
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      }));
    }
    return [];
  });

  const [gameStats, setGameStats] = useState<GameStats>(() => {
    const savedStats = localStorage.getItem('gameStats');
    if (savedStats) {
      return JSON.parse(savedStats);
    }
    return {
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      totalTasksCompleted: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('gameStats', JSON.stringify(gameStats));
  }, [gameStats]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'xpReward'>) => {
    const xpReward = calculateXpReward(task.priority);
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      xpReward,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast({
      title: "Task Added!",
      description: `"${task.title}" has been added to your quest log.`
    });
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const newCompletedState = !task.completed;
          
          // If task is being completed, award XP
          if (newCompletedState) {
            const newXp = gameStats.xp + task.xpReward;
            const xpToNextLevel = calculateXpToNextLevel(gameStats.level);
            let newLevel = gameStats.level;
            
            // Level up if enough XP
            if (newXp >= xpToNextLevel) {
              newLevel += 1;
              toast({
                title: "Level Up!",
                description: `You've reached level ${newLevel}! Keep up the great work!`,
                variant: "default",
              });
            }
            
            setGameStats({
              level: newLevel,
              xp: newXp >= xpToNextLevel ? newXp - xpToNextLevel : newXp,
              xpToNextLevel: newLevel > gameStats.level ? calculateXpToNextLevel(newLevel) : xpToNextLevel,
              totalTasksCompleted: gameStats.totalTasksCompleted + 1,
            });
            
            toast({
              title: "Task Completed!",
              description: `You earned ${task.xpReward} XP!`,
              variant: "default",
            });
          }
          
          return { ...task, completed: newCompletedState };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast({
      title: "Task Removed",
      description: "The task has been removed from your quest log."
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        gameStats,
        addTask,
        toggleTaskCompletion,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  
  return context;
};
