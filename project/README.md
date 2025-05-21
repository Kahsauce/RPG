# SportCoachAI

Une application web pour gérer vos entraînements sportifs, votre diète et le suivi des blessures avec l'aide de trois coachs IA spécialisés.

## Fonctionnalités

- Calendrier central avec planning drag-and-drop
- Trois coachs IA intégrés (Sport, Diète, Blessure)
- Suivi des entraînements, repas, blessures et compétitions
- Planification intelligente en fonction des objectifs et compétitions
- Interface responsive pour utilisation sur mobile et desktop

## Prérequis

- Node.js (v16+)
- npm ou yarn
- Un navigateur moderne
- Une clé API OpenAI (pour les fonctionnalités IA)

## Installation

1. Cloner le dépôt
```
git clone <repository-url>
cd sports-coach-ai
```

2. Installer les dépendances
```
npm install
```

3. Configurer les variables d'environnement
```
cp .env.example .env
```
Éditez le fichier `.env` et ajoutez votre clé API OpenAI.

4. Lancer l'application
```
npm run dev:full
```

L'application frontend sera disponible sur `http://localhost:5173` et le serveur backend sur `http://localhost:3000`.

## Structure du projet

- `/src` - Code source frontend (React)
  - `/components` - Composants React réutilisables
  - `/contexts` - Contextes React pour la gestion d'état
  - `/pages` - Pages de l'application
  - `/services` - Services API
  - `/types` - Types TypeScript
- `/server` - Code source backend (Node.js/Express)
  - `index.js` - Point d'entrée du serveur
  - `database.sqlite` - Base de données SQLite

## Déploiement sur Unraid

1. Créez un nouveau container Docker
2. Utilisez l'image `node:16` comme base
3. Montez le répertoire du projet sur `/app` dans le container
4. Définissez le répertoire de travail sur `/app`
5. Commande de démarrage: `npm run dev:full`
6. Exposez les ports 5173 et 3000

## Roadmap de développement

### Phase 1: Base de l'application
- ✅ Structure du projet
- ✅ UI de base et navigation
- ✅ Calendrier drag-and-drop
- ✅ Gestion des événements

### Phase 2: Gestion des données
- ⬜ Base de données SQLite complète
- ⬜ API backend complète
- ⬜ Formulaires de saisie pour les différents types de données
- ⬜ Persistance et synchronisation

### Phase 3: Intégration IA
- ⬜ Intégration de l'API OpenAI
- ⬜ Implémentation des coachs IA
- ⬜ Historique des conversations
- ⬜ Mémoire persistante

### Phase 4: Fonctionnalités avancées
- ⬜ Analyse de la charge d'entraînement
- ⬜ Rapports et statistiques
- ⬜ Notifications et rappels
- ⬜ Exportation des données

### Phase 5: Optimisation et déploiement
- ⬜ Tests et débogage
- ⬜ Optimisation des performances
- ⬜ Dockerisation
- ⬜ Documentation complète

## Licence

Ce projet est sous licence MIT.
