/*
 * Par défaut, webpack ne va pas "watch" votre index.html pour les update en direct.
 * Pire encore, il ne prendre pas en compte vos modifs et vous forcera à éteindre/relancer webpack-dev-server...oups.
 * Ce petit 'hack' vous permettra de résoudre ce problème
*/

const watchHTMLFiles = () => {
    if (__ENV__ !== 'production') {
        require('./../index.html');
    }
};

export default watchHTMLFiles;
