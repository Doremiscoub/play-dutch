
Placez un fichier .glb du Professeur Cartouche nommé `cartouche.glb` dans ce dossier
ou changez le chemin d'importation dans le code si nécessaire.

Ce fichier doit représenter un buste stylisé en 3D du Professeur, avec l'apparence Pixar / jouet stylisé, 
et être prêt à être importé via `useGLTF` de Drei (React Three Fiber).

Spécifications recommandées pour optimiser les performances :
- Taille du fichier: idéalement < 2 Mo
- Nombre de polygones: 5000-15000 max
- Textures: résolution 1024x1024 max, format compressé (KTX2 ou WEBP)
- Format optimisé: .glb avec compression Draco si possible
- Animation: une seule animation d'idle (respiration) ou aucune
- Orientation: tête et buste centrés, regard vers l'utilisateur
