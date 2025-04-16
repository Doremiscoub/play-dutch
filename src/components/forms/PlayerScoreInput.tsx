
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { Player } from '@/types';

interface PlayerScoreInputProps {
  player: Player;
  index: number;
  score: number;
  isDutch: boolean;
  onScoreChange: (playerId: string, value: string) => void;
  onAdjustScore: (playerId: string, increment: number) => void;
  onDutchToggle: (playerId: string, checked: boolean) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  onEnterKey: () => void;
  isSubmitting: boolean;
  submitHandled: boolean;
}

const PlayerScoreInput: React.FC<PlayerScoreInputProps> = ({
  player,
  index,
  score,
  isDutch,
  onScoreChange,
  onAdjustScore,
  onDutchToggle,
  inputRef,
  onEnterKey,
  isSubmitting,
  submitHandled
}) => {
  return (
    <motion.div
      key={player.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 rounded-lg bg-gray-50/50"
    >
      <div className="font-medium text-gray-700 w-full sm:w-1/3">{player.name}</div>
      
      <div className="flex flex-1 items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full"
            onClick={() => onAdjustScore(player.id, -1)}
            disabled={isSubmitting || submitHandled}
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          
          <Input
            ref={index === 0 ? inputRef : undefined}
            type="text"
            value={score === 0 ? '' : score}
            onChange={(e) => onScoreChange(player.id, e.target.value)}
            className="w-20 text-center"
            placeholder="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isSubmitting && !submitHandled) {
                e.preventDefault();
                onEnterKey();
              }
            }}
            disabled={isSubmitting || submitHandled}
          />
          
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full"
            onClick={() => onAdjustScore(player.id, 1)}
            disabled={isSubmitting || submitHandled}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 ml-2">
          <Switch
            id={`dutch-${player.id}`}
            checked={isDutch}
            onCheckedChange={(checked) => onDutchToggle(player.id, checked)}
            disabled={isSubmitting || submitHandled}
          />
          <Label htmlFor={`dutch-${player.id}`} className="text-xs sm:text-sm text-dutch-orange">
            Dutch
          </Label>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerScoreInput;
