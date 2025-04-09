
import React from 'react';
import { Task, useTaskContext } from '@/contexts/TaskContext';
import { cn } from '@/lib/utils';
import { Check, Trash2, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();

  const priorityColors = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
  };

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'task-card mb-3 relative',
        task.completed && 'opacity-70'
      )}
    >
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'rounded-full border mr-3',
            task.completed ? 'bg-game-success text-white' : 'bg-transparent'
          )}
          onClick={() => toggleTaskCompletion(task.id)}
        >
          {task.completed && <Check className="h-4 w-4" />}
        </Button>
        
        <div className="flex-1">
          <h3 className={cn(
            'font-semibold text-lg',
            task.completed && 'line-through text-gray-400'
          )}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-sm text-gray-300 mt-1">{task.description}</p>
          )}
          
          <div className="flex items-center mt-2 space-x-3 text-xs">
            <span className={cn(
              "inline-flex items-center px-2 py-1 rounded-full",
              priorityColors[task.priority]
            )}>
              {task.priority}
            </span>
            
            {task.dueDate && (
              <span className="inline-flex items-center text-gray-300">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(task.dueDate)}
              </span>
            )}
            
            <span className="inline-flex items-center text-game-xp font-semibold">
              <Award className="h-3 w-3 mr-1" />
              {task.xpReward} XP
            </span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-600 hover:bg-red-200/10"
          onClick={() => deleteTask(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
