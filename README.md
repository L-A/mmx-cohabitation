# Muséomix - Table projecteur pour _Sois mon épouse_

Ce _repo_ contient tout le code nécessaire ppour propulser le prototype #4 du Muséomix 2016 à Québec, qui s'est déroulé au Monastère des Augustines.

Le projet consiste en un _front-end_ web capable de recevoir un `state` et d'afficher son vidéo correspondant. Il renvoie au serveur un `state` de `-1` lorsqu'un vidéo termine.

La source du `state` est un serveur (tout est en Node.js) qui déclenche les changements selon une mesure venant d'un hardware (dans ce cas, une distance correspondant à un poids).

## Rôles des modules:

_Hardware → triggers → state machine → server → front-end_

`sonar.js` est responsable d'interpréter un signal de hardware et de le transformer en une mesure sur l'échelle convenue (ici, distance en cm). Il est 100% remplaçable par un autre module qui relie le matériel.

`triggers,js` reçoit les mesures jugées utilisables et utilise la liste de mesures connues (`states-list.js`) pour déclencher des changements de `state`.

`states-list.js` devrait idéalement être transformé en un module plus abstrait (un state machine un peu moins MacGuyver) et utilisé avec un fichier `JSON` contenant seulement les états et mesures.

`server.js` est un mini-serveur `Express` qui connecte le front-end avec `socket.io` et lui pousse les états obtenus.

Les pages sont dans `/pages`. `remote.html` est un _bypass_ du système de mesure, et permet de déclencher manuellement les états.

## _Templating_ manquant

Il n'y a aucun _templating_, les informations nécessaires pour chaque état sont durement codés dans `index.html`, `remote.html` et `states-list.html`. Les fichiers media à servir le sont de même dans `server.js` avec une route par fichier.

## Installation et démarrage

(En prenant pour acquis que la connection _hardware_ est faite à la main de toute façon)

- Pour mesurer depuis Arduino comme dans l'expo 2016, [il faut y installer Firmata](https://www.arduino.cc/en/Reference/Firmata), incluse dans Arduino depuis la version 0012.
- `npm install`
- `npm start` to run
- Visionneuse → `http://localhost:3000`
- Télécommande → `http://localhost:3000/tout-puissant`
