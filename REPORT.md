# Raportti

Raportti perustuu jokaisen miniprojektin sprintin jälkeen pidettyihin retrospektiiveihin ja projektin lopuksi tekijöiden muodostamaan analyysiin. Retrospektiiveissä käytimme _Glad, Sad & Mad_ -tekniikkaa. Loppuanalyysin ja retrospektiivien anti on kerätty _Flinga_ -sovelluksen ja yhdessä käydyn viestimisen avulla. 

## Tekijät

Tämän miniprojektin toteuttivat Johannes Lares, Pontus Hedlund, Ville Manninen, Matias Brax, Teemu Närhi ja Melker Narikka. 

##   Kohdatut haasteet 

Ensimmäisen sprintin aikana kohtasimme ehkä eniten haasteita. Tähän saattoi vaikuttaa se, että tämä oli monille ryhmässämme ensimmäinen kollektiivinen ohjelmistotuotannon projekti. Sprintin aikana toimintatapamme kuitenkin ryhmässä muovautuivat hiljalleen dynamiikkaamme sopivaksi ja ensimmäiseen retrospektiiviin tultaessa, olimme jo taklanneet osan ilmenneistä haasteista. 

Yhdeksi keskeiseksi haasteeksi koko projektissa nousi _user storien_ eli käyttäjätarinoiden jakaminen. Käyttäjätarinat tulisi jakaa niin, ettei oma työ riipu muiden työstä. Ensimmäisessä sprintissä oli lisäksi päällekkäisyyksiä _technical taskeissa_, mikä melkein aiheutti päällekkäisyyksiä ohjelmiston tuottamisessa. Suurin osa ilmenneistä haasteista ensimmäisessä sprinssiä oli kuitenkin pieniä teknisiä ongelmia, kuten _ESlintin_ käyttöön tai verkko-ongelmiin (Johanneksen netti) liittyen.

Toisessa sprintissä olimme organisoineet toimintaa mallikkaasti ensimmäisestä sprintistä oppineia. Tämä näkyi _Mad&Sad_ lappujen lukumäärän rajulla vähenemisellä. Ainoastaan projektityöskentelyyn liittyen käyttäjätarinan _Definition of Doneen_ (DoD) siirtämisen kynnystä nostettiin, sillä sprintissä niitä oltiin siirretty valmiiksi turhan nopeasti, ja sitten _daily scrumissa_ siirretty takaisin testaukseen. Tavoitteeksi otettiin seuraavaan sprinttiin, että DoD olisi kunnossa, ennen käyttäjätarinan "valmistumista". 

Kolmannessa retrospektiivissä ainut Mad-lappu oli enää  näytön jakaminen Macbookilla demossa. Tilanne kuitenkin saatiin pelastettua sankarimaisella tyylillä, joka mainiosti kuvasi myös tämän kolmannen sprintin meininkiä.

Teknisistä haasteista yksi päänvaivan aiheuttajista olivat Cypress-testit, jotka hajoilivat vähän väliä ja välillä jopa ilman muutoksia. Lisäpäänvaivaa tässä aiheutti _Continuous Deployment_ (CD) putken huutaminen testien hajoamisesta. Nämä tuottivat säännöllisesti "tunkkausta", jonka tuloksena saimme häiriöt ratkaistua aina ennen asiakastapaamisia ja _final releasea_. Lisäksi dokumentaation lukemiseen meni runsaasti aikaa, mikä piti ottaa huomioon viikottaisen kuuden tunnin työrupeaman säännöstelyssä. 

##  Onnistumiset ja kehityskohteet

Kokonaisuudessaan olimme miniprojektiimme hyvin tyytyväisiä. Onnistuimme luomaan toimivan ja tyylikkään lukuvinkkikirjaston hyvällä ryhmähengellä. Saimme tasaisesti joka viikko edistettyä sovellusta asiakkaan toivomilla ominaisuuksilla eteenpäin. 

Teknisistä puolista olimme tyytyväisiä erityisesti CD-putkemme toimivuuteen läpi projektin. Onnistuimme myös luomaan toimivan nettisovelluksen _Full Stack_ -kurssin tekniikoilla, vaikka suurimmalla osalla ryhmästämme ei ollut vielä paljoakaan tästä muuta kuin yo. kurssin tarjoamat opit takanaan (jos sitäkään). Vältyimme myös pelätyiltä _Merge_ -konflikteilta suunnilleen kokonaan. 

Prosessin perspektiivistä palavereita oli hyvä määrä. Pidimme säntillisesti retrospektiivin, daily scrumin (perjantaisin hieman pidennettynä miniprojektin luonteesta johtuen) ja ennen asiakastapaamisia pre-demopalaverin. Palavereissa oli hieman turhan paljon pituutta aluksi, mutta ensimmäisessä retrospektiivissä tämä tuli ilmi, ja onnistuimme jatkossa produktiivisemmin käsittelemään aiheita. 

Projektinhallinnan viestinnän kannalta meillä oli hyvin käytössä erilaisia viestintävälineitä - _Zoom_ puhe- ja näköyhteydelle, jo aikaisemmin mainittu Flinga valkotauluna tarvittaessa (retro, loppupalaveri) ja _Telegram_ viestittelyyn. Telegramin käyttö mahdollisti jatkuvan yhteyden muihin. 

Kehityskohdista jo ensimmäisestä retrospektiivistä lähtien nousi ESlint ja sen käyttö. ESlint tulisi olla koko tiimillä kunnossa. Yksi tapa tämän varmistamiseksi olisi lisätä _eslintrc_ projektin repositorion _package.json_ -tiedostoon, heti projektin alussa. Seuraavaa projektia varten _Featuretogglet_ koettiin myös mieluisampana kuin uusien _branchien_ muodostaminen jokaista käyttäjätarinaa varten. Loppudemossa eräs ryhmä nosti _Slackin_ hyödyt ja vertasi niitä Telegramiin - keskusteluun olisi mahdollista luoda vielä enemmän ulottuvuuksia Slackin avulla. 

##  Opitut asiat

Opittujen asioiden kirjo osoittautui laajaksi loppuanalyysissa. Kirjon voikin jakaa selvästi kahteen teemaan: tekniset ja tiimityö. 

Jo aikaisemminkin mainittu Full Stack -osaaminen syveni tiimin jäsenien keskuudessa. Frontendin, backendin  ja koko sovelluksen toiminnan testaamista tehtiin koko tiimin keskuudessa jatkuvan kehityksen mukaisesti aina kun uusia ominaisuuksia lisättiin sovellukseen. Opimme toisin sanoen testaamaan Full Stack -sovellusta ketterästi. Näistä nostona _Cypress_ ja siihen yhdistetty _Gherkinin_ _Cucumber_ -dokumentaation osaaminen syventyi. 

_GitHub Actions_ -ominaisuuden käyttö konkreettisessa projektissa ja sen avulla _Monorepomme_ _Frontendin_ ja _Backendin_ vieminen _Herokuun_ oli myös opittujen asioiden korissa. Opimme myös käyttämään projektissa GitHubin välilehteä _Projects_, jossa opimme muodostamaan käyttäjätarinoita _Issueina_. Samoin opittuna asiana _Pull Request_ -toiminnon ja haarojen __mergeäminen_ eli yhdistäminen _Main_ -haaraan oli projektimme peruskauraa toisesta sprintistä lähtien. 

Tiimityössä tämä oli monelle ensimmäinen monen henkilön ohjelmointi-kokemus, sekä Scrum-projekti. Opimme myös, että etätyö toimii ja voi tuottaa [minttistä](https://urbaanisanakirja.com/word/mintissamintti/) hedelmää! Lisäksi miniprojekti näin COVID-19 -aikaan pidettynä oli hyvää harjoitusta nimenomaan etätyöstä ja ajanhallinnasta. 