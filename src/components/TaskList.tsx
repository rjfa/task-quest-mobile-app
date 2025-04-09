
import React from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import TaskItem from './TaskItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();
  
  // Sort tasks by completion status and then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    // Completed tasks go last
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Sort by priority if both have the same completion status
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // If both have due dates, sort by due date
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    // If only one has a due date, the one with a due date comes first
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    
    // Finally, sort by creation date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="px-4 py-2">
      <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
        Quest Log
        <span className="text-sm bg-game-primary/30 text-white px-3 py-1 rounded-full">
          {tasks.filter(t => !t.completed).length} active
        </span>
      </h2>
      
      <ScrollArea className="h-[calc(100vh-250px)] pr-4">
        <AnimatePresence>
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-gray-400"
            >
              No tasks yet. Add your first quest!
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
};

export default TaskList;
