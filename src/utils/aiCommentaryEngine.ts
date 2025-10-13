import { Player } from '@/types';
import { AICommentType, AIPersonality, AICommentContext, AIComment } from '@/types/ai-commentator';

interface GameMemory {
  playerProfiles: Record<string, PlayerProfile>;
  notableEvents: NotableEvent[];
  gameHistory: GameSummary[];
}

interface PlayerProfile {
  name: string;
  playStyle: 'aggressive' | 'conservative' | 'unpredictable' | 'consistent';
  bestScore: number;
  worstScore: number;
  averageScore: number;
  dutchCount: number;
  comebackCount: number;
  chokeCount: number;
  personalityTraits: string[];
  runningGags: string[];
}

interface NotableEvent {
  type: 'dramatic_comeback' | 'spectacular_fail' | 'perfect_round' | 'dutch_streak' | 'rivalry';
  players: string[];
  description: string;
  timestamp: number;
  round: number;
}

interface GameSummary {
  players: string[];
  winner: string;
  totalRounds: number;
  finalScores: Record<string, number>;
  notableEvents: string[];
}

class AICommentaryEngine {
  private memory: GameMemory;
  private currentPersonality: AIPersonality = 'humorous';
  private commentHistory: string[] = [];

  constructor() {
    this.memory = this.loadMemory();
  }

  private loadMemory(): GameMemory {
    const stored = localStorage.getItem('professor_cartouche_memory');
    return stored ? JSON.parse(stored) : {
      playerProfiles: {},
      notableEvents: [],
      gameHistory: []
    };
  }

  private saveMemory(): void {
    // Limiter la mémoire à 50 parties max pour éviter la croissance infinie
    if (this.memory.gameHistory.length > 50) {
      this.memory.gameHistory = this.memory.gameHistory.slice(-50);
    }
    
    // Limiter les événements notables
    if (this.memory.notableEvents.length > 100) {
      this.memory.notableEvents = this.memory.notableEvents.slice(-100);
    }
    
    localStorage.setItem('professor_cartouche_memory', JSON.stringify(this.memory));
  }

  public generateIntelligentComment(
    players: Player[], 
    roundCount: number, 
    scoreLimit: number,
    recentEvent?: string
  ): AIComment {
    const context = this.analyzeGameContext(players, roundCount, scoreLimit);
    const comment = this.selectCommentStrategy(context, players, recentEvent);
    
    this.updatePlayerProfiles(players);
    this.commentHistory.push(comment.comment);
    
    return comment;
  }

  private analyzeGameContext(players: Player[], roundCount: number, scoreLimit: number): AICommentContext {
    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    const leader = sortedPlayers[0];
    const lastPlace = sortedPlayers[sortedPlayers.length - 1];
    const gap = lastPlace.totalScore - leader.totalScore;
    
    // Détection de phase de jeu
    let gamePhase: 'early' | 'mid' | 'end' = 'early';
    const progressRatio = leader.totalScore / scoreLimit;
    if (progressRatio > 0.7) gamePhase = 'end';
    else if (progressRatio > 0.3) gamePhase = 'mid';

    // Détection d'intensité basée sur l'écart et la phase
    let intensity: 'low' | 'medium' | 'high' = 'low';
    if (gamePhase === 'end' && gap < 50) intensity = 'high';
    else if (gap > 100) intensity = 'medium';
    else if (roundCount > 5) intensity = 'medium';

    // Détection du type de commentaire approprié
    let type: AICommentType = 'general';
    if (roundCount === 0) type = 'game_start';
    else if (gamePhase === 'end') type = 'endgame_pressure';
    else if (gap > 150) type = 'gap_analysis';
    else if (this.detectTension(players)) type = 'tension_build';

    return {
      type,
      intensity,
      focus: this.selectFocusPlayer(players, type),
      gamePhase,
      leadingPlayer: leader.name,
      strugglingPlayer: lastPlace.name,
      gap,
      averageScore: players.reduce((sum, p) => sum + p.totalScore, 0) / players.length,
      hasRecentDutch: players.some(p => p.rounds.some(r => r.isDutch)),
      roundCount
    };
  }

  private selectCommentStrategy(
    context: AICommentContext, 
    players: Player[], 
    recentEvent?: string
  ): AIComment {
    const templates = this.getContextualTemplates(context);
    const selectedTemplate = this.selectBestTemplate(templates, context);
    
    const comment = this.personalizeComment(selectedTemplate, context, players, recentEvent);
    
    return {
      id: Date.now().toString(),
      comment,
      type: context.type,
      timestamp: Date.now(),
      personality: this.currentPersonality,
      context,
      advice: this.generateStrategicAdvice(context, players)
    };
  }

  private getContextualTemplates(context: AICommentContext): string[] {
    const templates = {
      game_start: [
        "Ah ! {playerCount} valeureux combattants s'apprêtent à danser le tango du Dutch ! Que le spectacle commence !",
        "Parfait ! J'ai apporté mon carnet de notes... et mon popcorn ! Cette partie s'annonce épicée !",
        "Mesdames et messieurs, bienvenue dans l'arène ! Objectif : {scoreLimit} points. Que les stratégies les plus retorses l'emportent !",
        "Tiens, tiens... {playerCount} joueurs pleins d'espoir ! L'un d'eux va bientôt découvrir que l'espoir, c'est comme un bon vin : ça peut vite tourner au vinaigre !"
      ],
      
      endgame_pressure: [
        "L'étau se resserre ! {leadingPlayer} sent la pression monter... C'est le moment où les champions révèlent leur vraie nature !",
        "Attention, nous approchons du dénouement ! {leadingPlayer} a {gap} points d'avance, mais dans le Dutch, tout peut basculer en un claquement de doigts !",
        "Le suspense est à son comble ! {strugglingPlayer}, c'est maintenant ou jamais pour votre remontada légendaire !",
        "Nous entrons dans la zone rouge ! {leadingPlayer}, attention aux excès de confiance... l'histoire du Dutch est pavée de chutes spectaculaires !"
      ],

      gap_analysis: [
        "Aïe aïe aïe ! {gap} points d'écart... {strugglingPlayer}, il va falloir sortir la artillerie lourde !",
        "Regardez-moi cet écart béant ! {gap} points... {leadingPlayer} creuse sa tranchée tandis que {strugglingPlayer} cherche encore sa pelle !",
        "Houston, nous avons un problème ! {strugglingPlayer} accuse {gap} points de retard... Il est temps de passer en mode kamikaze !",
        "Mes chers spectateurs, nous assistons à un véritable carnage ! {gap} points d'écart... C'est David contre Goliath, mais David a oublié sa fronde !"
      ],

      tension_build: [
        "L'atmosphère se tend ! Je sens les neurones qui grésillent... Qui va craquer en premier ?",
        "Mmh, mmh... Je détecte une montée d'adrénaline ! Les cartes vont bientôt voler !",
        "Attention, la pression monte ! On dirait que quelqu'un va exploser... et ce ne sera pas moi !",
        "Fascisant ! Le stress commence à faire des ravages... Je parie que {focusPlayer} transpire déjà !"
      ],

      dutch_celebration: [
        "DUTCH ! {focusPlayer} vient de faire le grand saut ! Magnifique plongeon dans l'abîme !",
        "Et voilà ! {focusPlayer} nous offre un Dutch de toute beauté ! C'est du grand art !",
        "Bravo {focusPlayer} ! Ce Dutch était si parfait qu'on aurait dit une chorégraphie !",
        "DUTCH ATTACK ! {focusPlayer} vient de transformer l'espoir en désespoir en une fraction de seconde !"
      ],

      poor_performance: [
        "Alors {focusPlayer}, on fait du tourisme dans les profondeurs du classement ?",
        "Dites-moi {focusPlayer}, c'est une stratégie secrète ou vous improvisez vraiment ?",
        "{focusPlayer}, j'admire votre persévérance ! Continuer à jouer malgré ces scores... c'est du courage !",
        "Ah {focusPlayer} ! Vous nous prouvez que dans le Dutch, il n'y a pas que la victoire qui compte... il y a aussi l'art de perdre avec panache !"
      ],

      strategic_advice: [
        "Petit conseil à {focusPlayer} : parfois, la prudence est la mère de toutes les vertus !",
        "{focusPlayer}, je vous observe... Vous jouez avec le feu ! Attention à ne pas vous brûler les doigts !",
        "Note tactique : {focusPlayer}, variez vos stratégies ! La prévisibilité est l'ennemi du Dutch !",
        "Observation du professeur : {focusPlayer}, vous avez le talent, maintenant il faut la patience !"
      ]
    };

    return templates[context.type] || [
      "Intéressant... très intéressant même !",
      "Ah ! Les subtilités du Dutch ne cessent de m'émerveiller !",
      "Mes chers joueurs, vous m'offrez un spectacle délicieux !",
      "Continuez comme ça, c'est passionnant à analyser !"
    ];
  }

  private selectBestTemplate(templates: string[], context: AICommentContext): string {
    // Éviter les répétitions récentes
    const availableTemplates = templates.filter(
      template => !this.commentHistory.slice(-3).some(
        recent => this.calculateSimilarity(template, recent) > 0.7
      )
    );
    
    if (availableTemplates.length === 0) return templates[0];
    
    // Sélection pondérée basée sur l'intensité
    const weightedSelection = context.intensity === 'high' ? 
      availableTemplates.slice(0, 2) : availableTemplates;
    
    return weightedSelection[Math.floor(Math.random() * weightedSelection.length)];
  }

  private personalizeComment(
    template: string, 
    context: AICommentContext, 
    players: Player[], 
    recentEvent?: string
  ): string {
    let comment = template;
    
    // Remplacement des variables contextuelles
    comment = comment.replace('{playerCount}', players.length.toString());
    comment = comment.replace('{leadingPlayer}', context.leadingPlayer || 'le leader');
    comment = comment.replace('{strugglingPlayer}', context.strugglingPlayer || 'le dernier');
    comment = comment.replace('{focusPlayer}', context.focus || 'l\'un de vous');
    comment = comment.replace('{gap}', context.gap?.toString() || '?');
    comment = comment.replace('{scoreLimit}', '500'); // Utiliser la vraie limite si disponible
    
    // Ajout de touches personnelles basées sur les profils
    if (context.focus && this.memory.playerProfiles[context.focus]) {
      const profile = this.memory.playerProfiles[context.focus];
      if (profile.runningGags.length > 0 && Math.random() < 0.3) {
        comment += ` ${profile.runningGags[Math.floor(Math.random() * profile.runningGags.length)]}`;
      }
    }

    // Ajout de réaction à un événement récent
    if (recentEvent) {
      comment = this.addEventReaction(comment, recentEvent);
    }

    return comment;
  }

  private generateStrategicAdvice(context: AICommentContext, players: Player[]): string {
    const adviceTemplates = [
      "Conseil du professeur : la régularité bat souvent la brillance !",
      "Tactique recommandée : observez les patterns de vos adversaires !",
      "Astuce : parfois, il vaut mieux perdre une bataille pour gagner la guerre !",
      "Stratégie avancée : utilisez la psychologie autant que vos cartes !",
      "Sage conseil : gardez toujours un plan B... et même un plan C !"
    ];

    if (context.focus && context.intensity === 'high') {
      return `${context.focus}, ${adviceTemplates[Math.floor(Math.random() * adviceTemplates.length)]}`;
    }

    return adviceTemplates[Math.floor(Math.random() * adviceTemplates.length)];
  }

  private updatePlayerProfiles(players: Player[]): void {
    players.forEach(player => {
      if (!this.memory.playerProfiles[player.name]) {
        this.memory.playerProfiles[player.name] = {
          name: player.name,
          playStyle: 'consistent',
          bestScore: player.totalScore,
          worstScore: player.totalScore,
          averageScore: player.totalScore,
          dutchCount: player.rounds.filter(r => r.isDutch).length,
          comebackCount: 0,
          chokeCount: 0,
          personalityTraits: [],
          runningGags: []
        };
      }

      const profile = this.memory.playerProfiles[player.name];
      profile.bestScore = Math.min(profile.bestScore, player.totalScore);
      profile.worstScore = Math.max(profile.worstScore, player.totalScore);
      profile.averageScore = (profile.averageScore + player.totalScore) / 2;
      
      const hasRecentDutch = player.rounds.some(r => r.isDutch);
      if (hasRecentDutch) {
        profile.dutchCount++;
        // Ajouter des running gags basés sur les Dutch
        if (profile.dutchCount > 3 && !profile.runningGags.includes("Le roi du Dutch !")) {
          profile.runningGags.push("Le roi du Dutch !");
        }
      }
    });

    this.saveMemory();
  }

  private detectTension(players: Player[]): boolean {
    const scores = players.map(p => p.totalScore);
    const range = Math.max(...scores) - Math.min(...scores);
    return range < 100 && players.length > 2;
  }

  private selectFocusPlayer(players: Player[], type: AICommentType): string | null {
    switch (type) {
      case 'poor_performance':
        return players.sort((a, b) => b.totalScore - a.totalScore)[0]?.name || null;
      case 'dutch_celebration':
        return players.find(p => p.rounds.some(r => r.isDutch))?.name || null;
      case 'endgame_pressure':
        return players.sort((a, b) => a.totalScore - b.totalScore)[0]?.name || null;
      default:
        return players[Math.floor(Math.random() * players.length)]?.name || null;
    }
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = str1.toLowerCase().split(' ');
    const words2 = str2.toLowerCase().split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  }

  private addEventReaction(comment: string, event: string): string {
    const reactions = {
      'new_round': " Nouvelle manche, nouvelles possibilités !",
      'player_dutch': " Ouch, ça fait mal !",
      'close_scores': " L'écart se resserre !",
      'comeback': " Incroyable remontée !",
      'lead_change': " Changement de leader !"
    };

    return comment + (reactions[event as keyof typeof reactions] || '');
  }

  public setPersonality(personality: AIPersonality): void {
    this.currentPersonality = personality;
  }

  public getPlayerStats(playerName: string): PlayerProfile | null {
    return this.memory.playerProfiles[playerName] || null;
  }

  public clearMemory(): void {
    this.memory = { playerProfiles: {}, notableEvents: [], gameHistory: [] };
    this.saveMemory();
  }
}

export const aiCommentaryEngine = new AICommentaryEngine();