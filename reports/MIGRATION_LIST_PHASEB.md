
# Phase B Migration List - Dutch Project

## Fichiers identifiés avec styles hardcodés à migrer

### Pages principales
- [ ] `src/pages/Home.tsx` - styles inline, couleurs hex
- [ ] `src/pages/GamePage.tsx` - classes Tailwind hardcodées
- [ ] `src/pages/GameSetup.tsx` - couleurs custom, espacements
- [ ] `src/pages/History.tsx` - boutons custom, cartes
- [ ] `src/pages/SettingsPage.tsx` - formulaires, toggles
- [ ] `src/pages/Rules.tsx` - typographie, espacements
- [ ] `src/pages/NotFound.tsx` - gradients, animations

### Composants de jeu
- [ ] `src/components/game-setup/LocalGameSetup.tsx` - boutons unified-*
- [ ] `src/components/game-setup/PlayerControls.tsx` - boutons unified-*
- [ ] `src/components/game-setup/PlayerCountSelector.tsx` - variants glass
- [ ] `src/components/scoreboard/StickyActionButtons.tsx` - variants y2k-blue, vision-glass

### Composants UI à vérifier
- [ ] `src/components/AuthStatus.tsx` - variants game-control, pill-*
- [ ] `src/components/GameSetupGlassmorphic.tsx` - import unified-card

### Tokens à compléter
- [ ] **Couleurs** : vérifier couverture complète dans `design/tokens/colors.ts`
- [ ] **Typographie** : créer `design/tokens/typography.ts`
- [ ] **Élévation** : étendre `design/tokens/elevation.ts`
- [ ] **Rayons** : mapping dans `tailwind.config.ts`

## Priorités
1. **Critique** : Composants avec erreurs de build (imports manquants)
2. **Haute** : Pages principales avec styles hardcodés
3. **Moyenne** : Composants de jeu avec variants obsolètes
4. **Basse** : Optimisations finales et polish

## Objectifs Phase B
- Migrer 100% des styles vers tokens
- Remplacer tous les composants unified-* par les atomiques
- Maintenir l'apparence visuelle exacte
- 0 erreur build/test
