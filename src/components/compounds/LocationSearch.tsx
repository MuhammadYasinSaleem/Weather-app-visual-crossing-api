import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';

interface LocationSearchProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

export default function LocationSearch({
  onSearch,
  isLoading,
}: LocationSearchProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='flex gap-3'
    >
      <div className='flex-1 relative'>
        <motion.div whileFocus={{ scale: 1.02 }} className='relative'>
          <MapPin
            className='absolute left-4 top-1/2 transform
            -translate-y-1/2 w-5 h-5 text-slate-400'
          />
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search for a location...'
            className='w-full bg-slate-800/80 border
            border-slate-600/30 rounded-xl pl-12 pr-4 py-3
            text-white placeholder-slate-500 focus:outline-none
            focus:border-blue-400/50 focus:ring-2
            focus:ring-blue-400/20 transition-all'
          />
        </motion.div>
      </div>
      <motion.button
        type='submit'
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='bg-blue-600 hover:bg-blue-700
        disabled:bg-slate-700 px-6 py-3 rounded-xl font-semibold
        flex items-center gap-2 transition-colors'
      >
        <Search className='w-5 h-5' />
        <span className='hidden sm:inline'>Search</span>
      </motion.button>
    </motion.form>
  );
}
