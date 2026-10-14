# Gifbox

Une boîte à GIFs pour écran : 20 boutons, un par GIF culte, plus un gros
bouton « au hasard ». On appuie, le GIF s'affiche en plein écran pendant
quelques secondes, puis la grille revient.

## Lancer

Ouvre `index.html` dans un navigateur, ou mieux, sers le dossier :

```sh
python3 -m http.server 8000   # puis http://localhost:8000
```

Touche `F` pour le plein écran. Paramètre `?duree=8` pour la durée d'affichage
en secondes (`?duree=0` = le GIF reste jusqu'au prochain appui).

## Déclencheurs

| Entrée | Effet |
| --- | --- |
| Clic / écran tactile sur une case | joue ce GIF |
| Touches `1`…`0` (ou pavé numérique) | GIFs #1 à #10 |
| Rangée du dessous (`A Z E R T Y U I O P` en AZERTY, `Q W E R T Y U I O P` en QWERTY) | GIFs #11 à #20 |
| `Espace` / `Entrée` | GIF au hasard |
| `Échap` ou clic sur le GIF | retour à la grille |
| Manette / encodeur USB de boutons d'arcade | bouton 1 → GIF #1, bouton 2 → GIF #2… ; boutons au-delà du 20e → hasard |

### Boutons physiques

Le plus simple : des boutons d'arcade branchés sur un **encodeur USB « zero
delay »** (quelques euros). Il est vu comme une manette, la Gifbox le détecte
toute seule, sans aucun code. Un clavier USB émulé (Makey Makey, Arduino
Leonardo/Pro Micro en HID) marche aussi via les touches ci-dessus.

Pour une borne autonome, un Raspberry Pi + écran en mode kiosque :

```sh
chromium-browser --kiosk --noerrdialogs "http://localhost:8000/?duree=8"
```

## Le top 20

| # | GIF | Année |
| --- | --- | --- |
| 1 | Nyan Cat | 2011 |
| 2 | Rickroll | 2007 |
| 3 | Dancing Baby | 1996 |
| 4 | This Is Fine | 2013 |
| 5 | Mind Blown (Tim & Eric) | 2010 |
| 6 | Michael Jackson Popcorn | 2011 |
| 7 | Kermit qui tape | 2015 |
| 8 | Homer dans la haie | 2013 |
| 9 | Obama Mic Drop | 2016 |
| 10 | Deal With It | 2010 |
| 11 | DiCaprio Cheers (Gatsby) | 2013 |
| 12 | Travolta perdu (Pulp Fiction) | 2015 |
| 13 | Oprah : You get a car! | 2004 |
| 14 | Party Parrot | 2015 |
| 15 | Peanut Butter Jelly Time | 1999 |
| 16 | Michael Scott : NOOO | 2009 |
| 17 | Elmo en feu | 2016 |
| 18 | Salt Bae | 2017 |
| 19 | Blinking Guy | 2017 |
| 20 | Dramatic Chipmunk | 2007 |

L'année est celle où le meme est devenu viral.

## Changer ou ajouter des GIFs

Tout est dans `gifs.js`. Pour chaque entrée, la Gifbox essaie dans l'ordre :

1. le fichier local `gifs/<slug>.gif` ;
2. les identifiants Giphy listés (la fin de l'URL `giphy.com/gifs/…-<ID>`) ;
3. sinon, une carte avec l'emoji et le titre.

Pour une borne **hors-ligne**, télécharge tout dans `gifs/` :

```sh
node scripts/download-gifs.mjs
```

Le script signale les GIFs introuvables : il suffit alors de déposer le fichier
à la main dans `gifs/` sous le bon nom.
