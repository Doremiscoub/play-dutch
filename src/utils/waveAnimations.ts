
interface Wave {
  height: number;
  color: string;
  speed: number;
  amplitude: number;
  frequency: number;
  opacity: number;
  direction: 'left' | 'right';
  yOffset: number; // Attribut pour décaler verticalement
}

export const waves: Wave[] = [
  { 
    height: 0.5, // Première vague (dessus) - violette
    color: '#E9D5FF', // Violet très pâle
    speed: 0.004, // Ralenti pour éviter des animations trop rapides
    amplitude: 30,
    frequency: 0.005,
    opacity: 0.95,
    direction: 'right',
    yOffset: 0 // Pas de décalage
  },
  { 
    height: 0.6, // Deuxième vague (dessous), plus haute pour être bien visible
    color: '#FDE68A', // Orange très pâle
    speed: 0.003, // Encore plus lente
    amplitude: 25,
    frequency: 0.006,
    opacity: 0.85,
    direction: 'left', // Direction opposée
    yOffset: 20 // Décalée vers le bas pour mieux la voir
  }
];

// Protection contre les erreurs de gestion du DOM lors des animations
export const drawWaves = (
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement | null,
  time: number
) => {
  // Protection renforcée contre les éléments null ou undefined
  if (!ctx || !canvas) return;
  
  try {
    // Vérification de sécurité supplémentaire pour le canvas
    if (!canvas.isConnected || canvas.width === 0 || canvas.height === 0) {
      console.info('Canvas non connecté au DOM ou dimensions invalides, animation ignorée');
      return;
    }
    
    // Protection contre les opérations sur un contexte rendu invalide
    if (typeof ctx.clearRect !== 'function') {
      console.warn('Contexte de canvas invalide détecté, animation ignorée');
      return;
    }
    
    // Nettoyer le canvas avant de dessiner avec sécurité
    try {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } catch (clearError) {
      console.error('Erreur lors du nettoyage du canvas:', clearError);
      return; // Abandonner le dessin si le nettoyage échoue
    }
    
    // D'abord dessiner la vague d'arrière-plan (orange), puis celle du premier plan (violette)
    // Ceci assure un ordre de superposition correct
    for (let i = waves.length - 1; i >= 0; i--) {
      const wave = waves[i];
      const yBase = canvas.height - (canvas.height * wave.height) + wave.yOffset;
      
      try {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        // Ajuster l'amplitude en fonction de la hauteur du canvas pour garantir un aspect cohérent
        const adjustedAmplitude = Math.min(wave.amplitude, canvas.height * 0.1);
        
        // Dessin de la vague avec une courbe naturelle - plus de précision
        const step = 1; // Pas de 1px pour un dessin précis
        for (let x = 0; x <= canvas.width; x += step) {
          const dx = x * wave.frequency;
          // La direction influence la direction de l'animation
          const timeOffset = wave.direction === 'right' ? time * wave.speed : -time * wave.speed;
          const y = yBase + Math.sin(dx + timeOffset) * adjustedAmplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        
        // Dégradé pour un effet plus naturel
        const gradient = ctx.createLinearGradient(0, yBase - adjustedAmplitude, 0, canvas.height);
        gradient.addColorStop(0, wave.color);
        const colorWithAlpha = wave.color + Math.floor(wave.opacity * 255).toString(16).padStart(2, '0');
        gradient.addColorStop(1, colorWithAlpha);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      } catch (drawError) {
        console.error("Erreur lors du dessin d'une vague:", drawError);
        // Continue à la prochaine vague sans interrompre l'animation
      }
    }
  } catch (error) {
    console.error("Erreur lors du dessin des vagues:", error);
    // Ne pas relancer l'erreur pour éviter de bloquer l'animation
  }
};
