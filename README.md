# Projet MEME-ORY

###### Réalisé par Thomas Ploix et Fabien Devillechabrolle (MIN 1) 

## Questions / Réponses
1. >`npm install` command also generated a package-lock.json file
along with package.json. What is the purpose of this file?

Ce fichier a comme utilité d'**enregistrer** de manière plus **ferme** les packages utilisés dans le projet ainsi que leur version,
permettant ainsi d'ensurer que tous les utilisateurs du projet téléchargent la même.

2. > By convention, all NPM dependencies use a 3-digit format for
      version numbers. How do you call this?

**Exemple :** version **1.2.3**

| Version       | 1                                                                                                   | 2                                                                             | 3                                                     |
|---------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------|
| Signification | **Version Majeure** <br/>incrémenté lorsqu'il y a des changements qui ne sont pas rétro-compatibles | **Version Mineure** <br/> incrémenté lorsqu'il y a un ajout de fonctionnalité | **Patch**<br/>corrections d'anomalies rétrocompatible |


3. >What is a devDependency exactly? What are the differences with a
     dependency?
   
Une **devDependency** est une **dépendance** utilisée uniquement lors du **développement** et non nécessaire pour l'exécution du code 
en production.
<br>Les dépendances normales (dependencies) sont, elles, requises pour le fonctionnement de l'application.

4. >What is a closure/iife ? What was it used for ? What replaced it?

Une **closure** (fermeture) est une fonction qui a accès à ses propres variables ainsi qu'aux variables de son contexte parent
, même après l'exécution de ce contexte.
<br/>Une **IIFE** (Immediately Invoked Function Expression) est une fonction qui s'exécute immédiatement après sa définition.
<br/>Les closures et IIFE étaient utilisées pour encapsuler des variables et éviter la pollution de l'espace global. 
Aujourd'hui, les modules ES6 remplacent cette pratique.

5. >What is the difference between import * as toto from './utils' and import
  { parseUrl } from './utils'? What can be the consequences of
  using one instead of the other?

Lorsqu'on __import * as toto from './utils'__ on récupère toutes les fonctions qui sont dans './utils' et on peut y
accéder dans le code en appelant toto.fonction() alors que __import { parseUrl } from './utils'__ permet d'importer que 
la fonction parseUrl
  
L'utilisation de la première méthode peut entraîner l'importation de fonctions ou variables inutilisées, cela peut nuire
aux performances et à la clarté du code.


6. >Can you think of at least 2 things that are possible with Java
  classes, but cannot be done with ES6 classes?

Deux différences entre les classes Java et les classes ES6 :

* Les classes Java peuvent implémenter plusieurs interfaces, tandis que les classes ES6 ne supportent pas directement 
les interfaces.


* Les classes Java peuvent avoir des modificateurs d'accès (public, private, protected), alors que les classes 
ES6 n'ont pas de modificateurs d'accès explicites (mais peuvent utiliser des conventions comme le préfixe _).

7. >What are the differences between var and let;

**Var** est déclaré dans le **scope global** tandis que **let** est **limité au scope du bloc** dans lequel il a été déclaré, c'est-à-dire 
que la variable n'est pas accessible en dehors du bloc.
8. >What is the .bind(this) stuff? What happens if you delete it? Is
  it needed when using an arrow function ? why ?

Le **.bind(this)** permet de préciser **à quoi correspond** le this dans la fonction où il est appelé, il permet de remettre clairement en 
contexte l'objet auquel on fait référence. 
<br/>Dans une arrow function, on a pas besoin de mettre .bind(this) car elles heritent déja du contexte des parents

9. >What does the @ symbol mean in @babel/***?

Le symbole @ est utilisé pour les "scoped packages" dans npm. 
Cela permet d'éviter les conflits de noms entre les paquets en regroupant des paquets liés sous un même préfixe.

**Exemple** :Le preset @babel/preset-env est utilisé pour indiquer quelle version doit être ciblée lors de la transpilation.

10. >What are the advantages of Promises?

Promises permet de continuer d'exécuter le code d'après en attendant la réponse. Puis lorsqu'on a enfin la réponse on peut 
exécuter la partie du code Asyncrone

11. >What version of ECMAScript async / await was released in ?

Les fonctionnalités async / await font parti de la version **ESnext** depuis l'ECMAScript 2017 (ES8).
12. >Component-oriented programming for the web is considered more
   maintainable. Why?

Cette architecture est réputée plus facile à maintenir car on **divise** l'application en plusieurs modules et components 
qui peuvent être réutilisés et qui sont indépendants. 
<br/>En faisant ça on crée une **arborescence plus logique**, c'est plus facile de s'y retrouver et c'est plus facile d'ajouter de nouvelles fonctionnalités au bon endroit.

13. >What is Functional programming?

La programmation fonctionnelle est une méthode de programmation mettant l'accent sur l'utilisation de **fonctions** "pures" 
**à la chaîne**, ce qui facilite la compréhension et la réutilisation du code.
<br/>
###### Exemple : filtrer les nombres pairs d'un tableau, les multiplier puis en faire la somme
```
let sum = arr.filter(num => num % 2 === 0)
    .map(num => num * 2)
    .reduce((acc, curr) => acc + curr, 0)
```

14. >Explain what the map() function does ?

La méthode **map()** crée un nouveau tableau en **appliquant une fonction** donnée à chaque élément du tableau existant en entrée.
###### Exemple : multiplier chacun des élements d'un tableau "arr"
```
let mult = arr.map(num => num * 2)
```
15. >Explain what the filter() function does ?

La méthode **filter()** crée un nouveau tableau contenant uniquement les éléments du tableau existant en entrée qui satisferont
la **condition** donnée (si true, ça passe).
###### Exemple : filtrer les élements pairs d'un tableau "arr"
```
let filtre = arr.filter(num => num % 2 === 0)
```
16. >Explain what the reduce() function does ?

La fonction permet de faire une **somme** dans élements du tableau existant en entrée, mais en mieux.
<br/> En effet, la fonction prend deux arguments : **"accumulateur"** et **"valeur_actuelle"**, et lors de chaque itération, la valeur_actuelle
est ajoutée à l'accumulateur. À la fin, la valeur finale de l'accumulateur est retournée par la fonction.
<br/> On peut également initialiser la valeur de l'accumulateur à une valeur particulière.

###### Exemple : sommer les élements d'un tableau "arr"
```
let sum = arr.reduce((acc, curr) => acc + curr, 0)
```
17. >What is the difference between .then() and async/await when
   handling asynchronous functions?

Avec __async/await__, l'execution de la fonction va se mettre en **pause** et ne va continuer que lorsque la Promise sera complétée. 
<br/>Tandis qu'avec le __.then()__, on va **continuer** le reste de la fonction et uniquement lorsqu'on aura le callback de la promise
on reviendra à la partie à l'intérieur du .then().
<br/>Async/await permet notamment d'écrire de manière synchrone une fonction asynchrone. 

18. >What does the _ prefix mean on a sass file

Les fichiers qui commencent par le **préfix** _ sont, par convention des fichiers à ne pas **compiler individuellement**. 
Mais ils sont importés dans d'autres fichiers/méthodes pour être utilisés.
<br>Cela permet de faciliter la modularité et la réutilisation du code CSS.

## Méthodologie
Une seule branche main push mais la méthodologie appliquée fut de développer sur la branche develop puis de merge --ff-only sur main lorsque nécessaire.

## Bonus

1 et 2 réalisés : 
* Sauvegarde dans le local storage des informations de session (temps, nbcartes, état_cartes) & système de chargement de partie
* Tableau de scores final avec filtres par nombre de cartes

Bonus 3 ? ... à découvrir
![image](https://github.com/Fabrikot/web-01/assets/107400688/6588eaa0-fec0-464c-a7c8-f48c14eb39cb)
