import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface UserFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserFeedback: React.FC<UserFeedbackProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 && !feedback.trim()) {
      toast.warning('Veuillez donner une note ou laisser un commentaire');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler l'envoi du feedback
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dans une vraie app, on enverrait à un service de feedback
      console.log('Feedback envoyé:', { rating, feedback });
      
      toast.success('Merci pour votre retour !', {
        description: 'Vos commentaires nous aident à améliorer Dutch'
      });
      
      // Réinitialiser le formulaire
      setRating(0);
      setFeedback('');
      onClose();
      
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-md glass-morphism border-white/20 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Votre avis compte</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Note par étoiles */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Comment évalueriez-vous Dutch ?
                  </p>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                        className="p-1 transition-colors"
                      >
                        <Star
                          className={cn(
                            'w-8 h-8 transition-colors',
                            (hoveredRating >= star || rating >= star)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-muted-foreground'
                          )}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {rating === 1 && 'Pas terrible 😞'}
                      {rating === 2 && 'Peut mieux faire 😐'}
                      {rating === 3 && 'Correct 🙂'}
                      {rating === 4 && 'Très bien ! 😊'}
                      {rating === 5 && 'Excellent ! 🤩'}
                    </p>
                  )}
                </div>

                {/* Commentaire */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Des suggestions d'amélioration ?
                  </p>
                  <Textarea
                    placeholder="Dites-nous ce que vous pensez de Dutch et comment nous pourrions l'améliorer..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[100px] resize-none"
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {feedback.length}/500 caractères
                  </p>
                </div>

                {/* Boutons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || (rating === 0 && !feedback.trim())}
                    className="flex-1"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Envoi...' : 'Envoyer'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserFeedback;