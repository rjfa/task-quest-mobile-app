
import React, { useState } from 'react';
import { useTaskContext, TaskPriority } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Plus, X, CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const TaskForm: React.FC = () => {
  const { addTask } = useTaskContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      priority,
      dueDate,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate(undefined);
    setIsFormOpen(false);
  };

  const priorities: { value: TaskPriority; label: string; color: string }[] = [
    { value: 'low', label: 'Low', color: 'bg-blue-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-red-500' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <AnimatePresence>
        {isFormOpen ? (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="bg-gradient-to-t from-game-background to-game-background/90 backdrop-blur-md p-4 border-t border-game-border/30 rounded-t-xl"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">New Quest</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFormOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Quest title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-game-primary/10 border-game-border/30 focus:border-game-primary focus:ring-game-primary"
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-game-primary/10 border-game-border/30 focus:border-game-primary focus:ring-game-primary h-20"
                  />
                </div>
                
                <div className="flex justify-between items-center gap-2">
                  <div>
                    <div className="text-sm mb-1">Priority:</div>
                    <div className="flex space-x-2">
                      {priorities.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            p.color,
                            priority === p.value ? "ring-2 ring-white" : "opacity-60"
                          )}
                          onClick={() => setPriority(p.value)}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm mb-1">Due Date:</div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dueDate && "text-muted-foreground",
                            "bg-game-primary/10 border-game-border/30"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dueDate}
                          onSelect={setDueDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full game-btn"
                    disabled={!title.trim()}
                  >
                    Add Quest
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="flex justify-center p-4"
          >
            <Button
              onClick={() => setIsFormOpen(true)}
              className="game-btn px-8 rounded-full shadow-lg"
            >
              <Plus className="mr-2 h-5 w-5" /> Add New Quest
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskForm;
