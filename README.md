# Back to the blog - un faux blog créé avec Next.js et Firebase

En tant que développeur (junior à l'heure actuelle en 2021), il est toujours utile et intéressant de découvrir de nouvelles technologies et méthodes de travail à acquérir dans mon bagage de connaissances 💼.

Dans ce projet, j'ai souhaité me tourner vers le Framework **[Next.js](https://nextjs.org/)** pour créer un faux blog et m'intéresser de plus près à ce que peut m'apporter l'usage d'un outil orienté vers le référencement et l'optimisation d'une Single-Page Application. J'alimenterais ce blog avec Google Firebase (authentification, données, ...) et faire de l'intégration continue avec Vercel App.

La thématique sera autour de la trilogie "Retour vers le futur" (clin d'oeil à la promo McFly O'Clock 2020 😉) et aux acteurs du film mais je ne pense pas qu'ils viendront un jour sur ce repo mais sait-on jamais 😅 !

**CE PROJET EN COURS DE CONSTRUCTION** - dernière mise à jour de ce document : 04 octobre 2021

## Sommaire

- [Back to the blog - un faux blog créé avec Next.js et Firebase](#back-to-the-blog---un-faux-blog-créé-avec-nextjs-et-firebase)
  - [Sommaire](#sommaire)
  - [Présentation](#présentation)
    - [Le projet](#le-projet)
    - [Screenshots](#screenshots)
    - [Liens](#liens)
  - [Mon procédé](#mon-procédé)
    - [Construit avec](#construit-avec)
    - [Ce que j'ai appris](#ce-que-jai-appris)
    - [Difficultés rencontrées](#difficultés-rencontrées)
    - [Ressources](#ressources)
  - [Auteur](#auteur)

## Présentation

### Le projet

Les utilisateurs sont capables de :

-   Consulter une liste d'articles sélectionnés sur la page d'accueil
-   Consulter un article (prochainement 🤙)
-   Consulter une page comprenant les articles selon la catégorie sélectionnée (prochainement 🤙)
-   Laisser un commentaire sur la page d'un article (prochainement 🤙)
-   S'identifier et créer un article à publier directement par l'interface (prochainement 🤙)

L'administrateur est capable de :
- Rédiger un nouvel article (en cours 💪)
- Modifier ou supprimer un article publié (prochainement 🤙)

### Screenshots

À venir !

### Liens

-   Repo GitHub : [github.com/OlivierZiolkowski](https://github.com/OlivierZiolkowski/back-to-the-blog)
-   Live Site URL : [Déploiement sur Vercel](https://back-to-the-blog-88dad58nk-olivierziolkowski.vercel.app/)

## Mon procédé

### Construit avec

-   [Next.js](https://nextjs.org/) - Framework destiné à gérer le routage, l'optimisation et le référencement d'une application React
-   [React](https://reactjs.org/) - Librairie JS
-   [Google Firebase](https://restcountries.eu/) - pour les données authentification
-   [Vercel App](https://vercel.com) - pour l'hébergement
-   [Formik](https://formik.org/) - création de formulaires
-   [Yup](https://github.com/jquense/yup) - validation des champs de formulaire
-   [SASS](https://sass-lang.com/) - pour le style
-   [CSS Modules](https://github.com/css-modules/css-modules) - pour le style
-   [Webpack](https://webpack.js.org/) - Bundler
-   [Babeljs](https://babeljs.io/) - Transpiler
-   [ESLint](https://eslint.org/) - Linter
-   [Prettier](https://prettier.io/) - Formatter
-   Semantic HTML5 markup
-   Mobile-first workflow
-   Flexbox
-   CSS Grid

### Ce que j'ai appris

 - **Next.js** :
   - Utilisation du framework Next.js
   - Mise en place du projet et de son architecture (dossier Pages pour implémenter le routage de l'application) ;
   - Utilisation des hooks `getServerSideProps()` et `getStaticProps()` pour faire des appels de données dynamiques et / ou statiques ;
   - Implémentation des composants Next.js pour le référencement et l'optimisation du contenu ;
   - Utilisation des outils de routage Next.js pour naviguer dans l'application.

- **Firebase** :
  - Création d'un projet sous Firebase ;
  - Ajout & création de données dans FireStore (NoSQL) ;
  - Authtentification par e-mail / password via "Authentification";

- **Vercel App** :
  - Hébergement de l'application ;
  - Intégration continue via le versionning depuis GitHub.

- **Formik & Yup** :
  - Création d'un formulaire via Formik qui offre un gain de temps avec des méthodes permettant de récupérer et vérifier le contenu d'un champ de formulaire ;
  - En complément, Yup vient valider chaque champ selon un pattern défini en amont du formulaire.

### Difficultés rencontrées

- **Next.js** :
  - Projet en cours d'initialisation, aucune difficulté rencontrée pour le moment 😅

### Ressources

-   [Documentation de Next.js 📕](https://nextjs.org/docs/getting-started)
-   [Documentation de Firebase 📗](https://firebase.google.com/docs)
-   [Documentation de Formik 📘](https://formik.org/docs/overview)
-   [Tutoriel de Ashlee M. Boyer pour créer un blog de base via Next.js et Firebase 👍](https://ashleemboyer.com/series/nextjs-firebase-blog)
-   [StackOverflow évidemment 😅](https://stackoverflow.com/)
-   [Inspiration graphique - Louis Magazine 👌](https://www.louismagazine.com/)

## Auteur

-   Compte GitHub : [Visitez ma page 😀](https://github.com/OlivierZiolkowski)
-   LinkedIn : [Ajoutez-moi 🤙](https://www.linkedin.com/in/olivier-ziolkowski/)
-   Mail : [Écrivez-moi ⌨](mailto:olivier.ziolkowski@gmail.com)
