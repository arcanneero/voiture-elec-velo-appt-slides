# Comment j'ai fini par déployer à 2h du matin une application sur AWS pour piloter des voitures électriques avec un vélo d'appartement.

## Abstract

```
- J'ai une super idée, mais je vais avoir besoin d'aide, parce que moi et le code...
ha ?
- Je voudrais faire tourner des voitures électriques sur un circuit en faisant pédaler des gens pendant 24h
...
- Tu vois comment faire ?
- Alors... c'est pas dur... Il suffit de deux Arduino, d'un Raspberry, quelques capteurs et c'est parti...
```

Et voilà à peu près comment en 2 minutes j'ai été convaincu de suivre un hurluberlu dans un projet franchement rigolo mêlant de nombreuses technos.

Et cerise sur le gâteau, les aléas techniques m'ont conduit jusqu'à déployer la solution sur AWS depuis une salle des fêtes en rase campagne un jour de tempête avec pour seule connexion mon téléphone...

## Détails


### Plan

* Il était une fois... (4 min)
	* L'idée - Mise en contexte et description des cas d'usage
	* Le projet - Présentation des différents composants imaginés au démarrage
* Réalisations, écueils, et dénouements ! (8 min)
	* Vélos et voitures
		* Raspberry vs Arduino - Suite à quelques tests, le gagnant est : Arduino !
		* Les joies des shields - Quelques déboires électroniques et un POC qui fonctionne
	* Compte tour et restitutions
		* Le retour du raspberry ! - Usage de python pour l'appel d'un service REST
		* Un peu de dev - Implémentation d'un back springboot, et d'un front Angular
* Le jour J, alias MEP (8 min)
    * Le fil rouge... - Intégrer les composants le jour J : mauvaise idée !
    * Et si rien ne se passait comme prévu...
        * Ça marchait sur mon poste - Comment un Firewall peut vite devenir un enfer !
        * Et je met ça où ? - Présentation du déploiement sur AWS (pourquoi et comment)
* Défi relevé ? (5 min)
    * Bilan du projet - En quelques chiffres
    * Le dev universel - Ouverture sur l'apport de la pluralité
    * Nous pouvons tous contribuer... - de l'Open source à l'action caritative
    
### Compléments

Quelques Tweets sur l'événement : https://twitter.com/nicgiro/status/1071219558613221376

### Resources

* Les slides du Quickie (15mins) : 
    * [Devfest]( ./quickie/index-devfest.html)
    * [Onepoint]( ./quickie/index-onepoint.html)
* Les slides de la "mini" conf (30mins) : 
    * [Devfest]( ./short/index-devfest.html)
    * [Onepoint]( ./short/index-onepoint.html)
* Captation vidéo :
    * [Devfest Nantes](https://www.youtube.com/watch?v=PYldMeoL9F0)
* Les dépots de code : 
    * [Arduino](https://github.com/arcanneero/iot-for-play)
    * [Api et IHM](https://github.com/arcanneero/24h-de-no)
  
  

## Références 

* Technical Knowledge Sharing (2018-2019) : Mise en place et animation hebdomadaire autour des technos/méthodes du projet (30 min)
* GDG Tours : [L'adoc : du néant à la galaxie Antora](https://www.meetup.com/fr-FR/GDG-Tours/events/259980415/) (30 pers.)
* Breizhcamp 2019 : [L'adoc : du néant à la galaxie Antora](https://www.youtube.com/watch?v=67QMncs1wvw) (100 pers.)
* Nantes DevOps : [L'adoc : du néant à la galaxie Antora](https://www.meetup.com/fr-FR/Nantes-DevOps/events/259469585/) (20 pers.)
* Présentation technique interne (Juin 2018): Et si l'adoc était accessible à tous ? (30 pers.)
* Nantes Jug 2017 : [L'aventure #piswarm: Gamifier notre outillage traditionnel pour mettre en avant des concepts innovants.](http://nantesjug.org/#/events/2017_12_14) (50 pers.)
* Software Crafters Nantes 2016 : [DevOps : Concept à la mode ou réalité ?](https://www.meetup.com/fr-FR/nantes-software-crafters-Nantes/events/235435543/) (30 pers.)


