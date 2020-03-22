# TP quiprendquoi - (rebaptisé) Qui prend whaat ?

## Installation

`npm install`

`mkdir public`

`npm run start`

## Améliorations apportées

- Affichage de la liste des items sur la page événément (`app.js`, `party.pug`)
- Possibilité d'ajouter un item (`app.js`, `party.pug`)
- Possibilité d'afficher les items (`app.js`, `party.pug`)
- Possibilité de supprimer un item (`app.js`, `party.pug`)
- Meilleure présentation visuelle des items (`*.scss`)
- Navigation : possibilité de retour sur la page créer un évènement (`navigation.js`)
- Structure en modules (un peu) (`navigation.js`, `isPartyPage.js`)


## Article personnel

### **Sujet : La mémoire dans la peau… du navigateur.**


La sensation de dépit lorsque la page d’un site web se fait attendre, tout le monde la déteste. Oui, car aujourd’hui, tout doit aller très vite. Action. Réaction. Elle là, le petit dinosaure apparait… argh. 
Pour parer à cet écueil, des systèmes de mémoires existent.
Pendant ce TP, nous avons eu l’occasion, entre autres, d’évoquer le stockage de données d’une application web, en gardant en ligne de mire d’offrir à l’utilisateur du web, « l’internaute » comme on ne dit plus, l’expérience d’un site web façon SPA et résilient à la fois. Cette matrice posée, l’utilisation de la mémoire de stockage du navigateur a été un choix adapté à nos objectifs, et ce, au regard de la méthode de l’amélioration progressive. Dans cette optique, libre à nous d’utiliser par la suite des outils toujours plus innovants en laissant le moins possible, de configurations de l’utilisation de notre application sur le bord de route.

LocalStorage, SessionStorage, IndexedDB, Cache, Cookies…Cet article abordera donc les systèmes de mémoire du navigateur, aura pour but de mettre un peu au clair ces différents moyens de stocker des données localement, sans avoir la prétention de l’exhaustitivité bien sûr. Je m’attarderai un peu plus sur les technos qui ont été mises en application dans ce projet : localStoage et Cache.

#### **Définitions et mots-clés**

##### **LocalStorage**

LocalStorage est un des mécanismes de stockage (avec le sessionStorage) fournit par l’API Web Storage selon un modèle de paires clé / valeur. Il maintient une zone de stockage distinct pour chaque donnée passées. La durée de disponibilité varie selon le mécanisme : le localStorage donne accès à la donnée même lorsque le navigateur est fermé et rouvert (contrairement au sessionStorage rend disponible la donnée tant que le navigateur est ouvert, y compris les rechargements et restaure).
Le localStorage est considéré comme simple d’utilisation, mais simpliste aussi : en effet, il ne permet que de stocker des données de types String.

Un exemple ci-dessous, lors de ma tentative (argh) d’implémentation de l’API Push. Petit rappel : la sécurisation de la communication entre le serveur de push et le navigateur est effectuée grâce à un système de couple clef privée clef publique. L'idée est de créer la souscription en fournissant la clef publique. Une fois la clef publique fournie, la résolution de la promesse renvoie un objet sous format JSON que je souhaitais stocker dans le localStorage :


```javascript
const subscriptionObject = JSON.parse(JSON.stringify(pushSubscription))

localStorage.setItem('user-push', JSON.stringify(pushSubscription))
const infosubscription = JSON.parse(localStorage.getItem('user-push'));
```

Pour stocker des données autre que du type String, il faudra convertir en string puis parser.

##### **La Cache par les Services workers**

La mise en cache est le processus de stockage de copies de fichiers dans un emplacement de stockage (cache) temporaire afin de pouvoir y accéder plus rapidement (à la prochaine visite du site par exemple). Le cache est l'équipement ou l'instrument du navigateur qui lui permet de sauvegarder les données, une paire d'objets Request/Response, nécessaires à la consultation d'un site web (images, langage HTML...). Cette techno requiert la mise en place d’un service worker. 
Pour faire court, le service worker est un fichier JavaScript qui s’exécute en arrière-plan, sans accès au DOM ni aux interactions avec les utilisateurs. Il peut rendre notre application disponible offline en proposant par exemple d'y répondre en revoyant les fichiers statiques dans le cache ou en récupérant des données dans un autre store (web storage).

##### **Autres systèmes de stockages local au navigateur**

##### - IndexedDB 
C’est l'API à utiliser pour le stockage côté client si vous souhaitez stocker des données complexes, des fichiers ou même des blobs dans le navigateur. Le fonctionnement de cette base de données est complètement différent de localStorage et présente une complexité supplémentaire. Il s'agit d'un système de base de données basé sur les transactions qui est décrit par MDN comme une base de données orientée objet basée sur JavaScript. Cela signifie que les données ne sont pas stockées dans une table avec des lignes et des colonnes comme avec un SGBDR basé sur SQL, mais plutôt avec des objets JavaScript qui sont indexés avec une clé, plus comparable à du MongoDB.

##### - Cookies

Ils contiennent une très petite quantité de données à une capacité maximale de 4 Ko. Les cookies sont utilisés de différentes manières, par exemple pour stocker les pages visitées sur un site ou les informations de connexion d'un utilisateur. Ils sont limités en ce qu'ils ne peuvent stocker que des chaînes.
De nombreux sites Web sécurisés utilisent des cookies pour valider l'identité de leurs utilisateurs après leur connexion afin de les empêcher d'avoir à ressaisir leurs informations d'identification sur chaque page. Une autre utilisation des cookies est de personnaliser ou d'ajuster l'expérience utilisateur en fonction de l'historique de navigation limité sur le site.


#### **Performances et limites**


##### - Performances 
L'API localStorage est simple à utiliser mais synchrone, pas super en termes de performance. Donc, si vous l'utilisez trop souvent, votre application commencera bientôt à se figer.

Là on aurait bien envie d’utiliser l’IndexedDB qui est asynchrone, donc efficace, mais difficile d’utilisation, avec des callbacks et des écouteurs d’évènements difficiles à contrôler…

[ Mozilla a réalisé une super librairie, localForage : une API simple calquée sur le localStorage natif, mais en interne stocké de façon asynchrone grâce à IndexedDB pour que cela soit performant, écrite en ES5. Un mélange du localStorage et de l’IndexedDB mais avec le meilleur des deux… Génial ! à tester.]

Concernant l'API Cache, ses services sont bien évidemment précieux en terme de performance. En effet, comme la développeur back, le développeur front a lui aussi sont rôle à jouer dans la diminution des requêtes de base de données, que celle-ci n'est pas seulement bonne pour l'utilisateur - elle est également essentielle pour maintenir la bande passante du serveur et faire évoluer les services de manière allégée. En particulier, dans des petites équipes qui ne peuvent pas se permettre les frais  d’AWS premium de 20 000€ par mois et qui s'exécute sur des clusters de serveurs locaux, il y a un enjeux économiques qui peut être capital pour certaines entreprises (petites ou débutantes). De plus, d'énormes pics de trafic peuvent entraîner des performances Web temporairement ralenties et même provoquer des pannes de serveurs. 

##### - Limites de stockage

Bien sûr, le stockage de ces données, quelque soit le ou les systèmes choisis, sont limité en termes de volumes. Difficiles d'avoir des chiffres exactes la dessus, de plus que ces volumes varient en fonctions des navigateurs et personnalisés par l'utilisateur, et que cet esapce est partagé entre tout le stockage d'origine: LocalStorage, IndexedDB, Filesystem et bien sûr les caches.

Le **Web storage** a considérablement plus d'espace de stockage que les cookies.


Ce script permet de connaître cette limite
```javascript
if (localStorage && !localStorage.getItem('size')) {
    var i = 0;
    try {
        // Test up to 10 MB
        for (i = 250; i <= 10000; i += 250) {
            localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
        }
    } catch (e) {
        localStorage.removeItem('test');
        localStorage.setItem('size', i - 250);            
    }
}
```
Sinon il y a également des simulateur, qui compte le nombre de caractères qui peuvent être stockés dans le localStorage.

Pour le **Cache**, l'utilisation du Storage API du service worker vous indiquera l'étendu de votre espace de stockage : 
```javascript
if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate().then(({usage, quota}) => {
    console.log(`Using ${usage} out of ${quota} bytes.`);
  }).catch(error => {
    console.error('Loading storage estimate failed:');
    console.log(error.stack);
  });
} else {
  console.error('navigator.storage.estimate API unavailable.');
}
```

Quelques chiffres difficile à corroborer :
- Firefox no limits, but will prompt after 50MB data stored
- Mobile Safari 50MB max
- Desktop Safari unlimited (prompts after 5MB)
- IE10+ maxes at 250MB and prompts at 10MB



#### **Conclusion**

Il y aurait beaucoup d’autres aspects de la question à développer, comme la sécurité des données ou bien encore des librairies ou frameworks ( comme redis, PouchDB, emberData etc…) alternatifs… Reste que du stockage local au stockage de session, des caches côté client aux services distants très en vogue (cloud computing) comme AWS - les façons dont nous compilons les données persistantes auront un impact important sur le type d'UX que les développeurs peuvent fournir à leurs utilisateurs.


#### **Ressources**

Article global sur le storage des PWA : https://medium.com/dev-channel/offline-storage-for-progressive-web-apps-70d52695513c#.19w8r1c4o

AppCache vs. Web Storage vs. Cookie : http://researchhubs.com/post/computing/web-application/appcache-vs-web-storage-vs-cookie.html

LocalForage : http://localforage.github.io/localForage/

Localstorage Test : http://dev-test.nemikor.com/web-storage/support-test/
Cette page testera si votre navigateur prend en charge localStorage, sessionStorage ou globalStorage.Les tests détermineront également s'il existe une limite de stockage pour tout système de stockage pris en charge.


Comprendre le Caching : https://www.cloudflare.com/learning/cdn/what-is-caching/


Le cache et les différentes stratégies de mise en cache : https://lesdieuxducode.com/blog/2018/8/rendre-un-site-disponible-hors-ligne-avec-le-service-worker
(cache-only, network only, network first, cache first, cache and update)

Le service worker et les navigateurs : https://jakearchibald.github.io/isserviceworkerready/


Les limites de stockage du client—side storage : 
- https://love2dev.com/blog/what-is-the-service-worker-cache-storage-limit/
- https://www.html5rocks.com/en/tutorials/offline/quota-research/


