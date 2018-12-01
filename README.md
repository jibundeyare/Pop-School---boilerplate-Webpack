# BOILRPLATE-WEBPACK

Environnement de développement simplifié pour les étudiants de Pop School Lens dans le cadre de l'apprentissage we webpack.

## Installation

`npm install`

## Commandes

`npm run start` : lance le serveur de développement et ouvre votre site dans le navigateur

`npm run build` : construit votre site dans le dossier dist

## NOTES

-   J'ai du un peu bidouiller pour que webpack-dev-server watche l'index.html...rien de bien méchant mais bon, quand même. Ca a l'avantage de leur montrer comment utiliser la variable **ENV** injectée par webpack.definePlugin().
-   J'ai remis le writeFilePlugin, sinon j'avais des soucis avec webpack dev server qui me trouvait pas des fichiers...webpack dev server c'est nul, on est jamais mieux servi que par soi même avec sa solution perso !

## TODO

[] ESLint config
