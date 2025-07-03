# Dutch Design System - Nomenclature Unifiée

## 🎨 Identité Visuelle

### Vision Créative
**"L'élégance ludique du futur"** - Un système de design qui fusionne l'esthétique iOS moderne avec l'énergie gaming dans un écosystème glassmorphisme VisionOS.

---

## 🔥 Dutch Trinity - Couleurs Primaires

### Couleurs Fondamentales
```css
--dutch-blue: 221 83% 53%;      /* #0A84FF - Bleu iOS moderne, confiance */
--dutch-purple: 258 90% 66%;    /* #8B5CF6 - Violet gaming, innovation */
--dutch-orange: 25 95% 53%;     /* #FF9F0A - Orange énergique, action */
--dutch-green: 142 71% 45%;     /* #30D158 - Vert success, validation */
```

### Philosophie des Couleurs
- **Bleu Dutch** : Confiance, fiabilité, iOS heritage
- **Violet Dutch** : Innovation, gaming, futur
- **Orange Dutch** : Énergie, action, enthousiasme
- **Vert Dutch** : Succès, validation, croissance

---

## 🔮 Système Glassmorphisme VisionOS

### Niveaux de Transparence
```css
--glass-ultra-light: rgba(255, 255, 255, 0.9);  /* Surfaces critiques */
--glass-light: rgba(255, 255, 255, 0.8);        /* Cartes principales */
--glass-medium: rgba(255, 255, 255, 0.7);       /* Éléments secondaires */
--glass-heavy: rgba(255, 255, 255, 0.6);        /* Backgrounds */
--glass-dark: rgba(255, 255, 255, 0.5);         /* Overlays */
```

### Bordures et Ombres
```css
--glass-border-light: rgba(255, 255, 255, 0.6);
--glass-border-medium: rgba(255, 255, 255, 0.4);
--shadow-glass: 0 8px 32px rgba(31, 38, 135, 0.15);
--shadow-trinity: 0 10px 30px hsla(var(--dutch-blue), 0.1), 0 20px 50px hsla(var(--dutch-purple), 0.1);
```

---

## ✨ Système Typographique

### Hiérarchie des Polices
```css
--font-display: 'Space Grotesk', 'Inter', -apple-system, system-ui, sans-serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
--font-gaming: 'Orbitron', 'Space Grotesk', system-ui, sans-serif;
```

### Utilisation
- **Display** : Titres principaux, logos, éléments hero
- **Body** : Texte courant, paragraphes, UI
- **Gaming** : Scores, badges, éléments compétitifs

---

## 🎮 Composants Gaming

### Boutons
```css
.btn-glass-trinity {
  background: var(--gradient-trinity);
  box-shadow: var(--shadow-trinity);
}
```

### Cartes
```css
.card-game {
  background: var(--gradient-glass);
  backdrop-filter: blur(25px);
  border: 2px solid var(--glass-border-light);
  box-shadow: var(--shadow-trinity);
}
```

---

## 📐 Espacements Harmonieux

### Système de Spacing
```css
--space-section: 6rem;     /* Entre sections */
--space-component: 3rem;   /* Entre composants */
--space-element: 1.5rem;   /* Entre éléments */
--space-micro: 0.75rem;    /* Détails */
```

---

## 🌟 Gradients et Effets

### Gradients Principaux
```css
--gradient-trinity: linear-gradient(135deg, hsl(var(--dutch-blue)), hsl(var(--dutch-purple)), hsl(var(--dutch-orange)));
--gradient-glass: linear-gradient(135deg, var(--glass-light), var(--glass-medium));
--gradient-gaming: linear-gradient(135deg, hsl(var(--dutch-purple)), hsl(var(--dutch-blue)));
```

### Classes Utilitaires
```css
.text-trinity          /* Texte avec gradient Trinity */
.btn-glass            /* Bouton glassmorphisme standard */
.btn-glass-trinity    /* Bouton avec gradient Trinity */
.card-glass          /* Carte glassmorphisme */
.card-game           /* Carte gaming avancée */
```

---

## 📱 Responsive & Accessibilité

### Breakpoints
- **xs**: 480px
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Support Accessibilité
- Contraste élevé automatique
- Réduction de mouvement
- Navigation clavier
- Lecteurs d'écran

---

## 🚀 Animations et Interactions

### Timing Functions
```css
cubic-bezier(0.4, 0, 0.2, 1)  /* Standard */
cubic-bezier(0.34, 1.56, 0.64, 1)  /* Bounce */
```

### Effets Standards
- **Hover** : translateY(-4px) + scale(1.02)
- **Focus** : ring-2 ring-dutch-blue/50
- **Active** : scale(0.98)

---

## 🎯 Implémentation

### Usage Recommandé
1. **Toujours** utiliser les tokens CSS variables
2. **Jamais** de couleurs en dur (ex: #FF0000)
3. **Préférer** les classes utilitaires aux styles inline
4. **Tester** sur tous les modes (clair/sombre)
5. **Valider** l'accessibilité

### Exemple d'Implémentation
```tsx
// ✅ Correct
<Button className="btn-glass-trinity text-display">
  Jouer maintenant
</Button>

// ❌ Incorrect
<Button style={{background: '#0A84FF'}} className="font-bold">
  Jouer maintenant
</Button>
```

---

*Ce système de design assure une cohérence visuelle parfaite à travers toute l'application Dutch, en respectant les principes d'accessibilité et de performance.*