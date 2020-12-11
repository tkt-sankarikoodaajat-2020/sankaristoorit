# Raportti

Tämä raportti perustuu jokaisen miniprojektin sprintin jälkeen pidettyihin retroperspektiivikokouksiin, sekä projektin päätteeksi kehitystiimin jäsenten muodostamaan analyysiin. Retroperspektiivissä käytimme _Glad, Sad & Mad_ -tekniikkaa. Loppuanalyysin sekä retrospektiivien anti on kerätty _Flinga_ -sovelluksen ja kehitystiimin kesken käydyn keskustelun avulla.

## Tekijät

Tämän miniprojektin toteuttivat Matias Brax, Pontus Hedlund, Johannes Lares, Ville Manninen, Melker Narikka ja Teemu Närhi.

##   Kohdatut haasteet 

Ensimmäinen sprintti oli ehkä haastavin, johtuen siitä että projekti oli monille kehitystiimissä ensimmäinen kollektiivinen ohjelmointiprosessi. Sprintin aikana toimintatapamme kuitenkin muovautuivat hiljalleen dynamiikkaamme sopivaksi ja ensimmäiseen retroperspektiiviin saavuttaessa, olimme jo taklanneet osan ilmenneistä haasteista.

Yhdeksi keskeiseksi haasteeksi koko projektissa nousi _user storien_, eli käyttäjätarinoiden jakaminen. Käyttäjätarinat tulisi jakaa niin, ettei oma työnkulku riipu muiden työstä. Ensimmäisessä sprintissä oli lisäksi päällekkäisyyksiä _technical taskeissa_, mikä aiheutti päällekkäistä ohjelmistokehitystä. Suurin osa ilmenneistä haasteista ensimmäisessä sprintissä olivat kuitenkin pieniä teknisiä ongelmia, liittyen _ESlintin_ käyttöön tai verkko-ongelmiin (Johanneksen netti).

Toisessa sprintissä olimme organisoineet toimintaa mallikkaasti ensimmäisestä sprintistä oppineina. Tämä kehitys näkyi retroperspektiivissä annettujen _Mad&Sad_ lappujen lukumäärän rajulla vähenemisellä. Ainoastaan projektityöskentelyyn liittyen käyttäjätarinan _Definition of Doneen_ (DoD) siirtämisen kynnystä nostettiin, sillä ensimmäisessä sprintissä niitä oltiin siirretty valmiiksi turhan nopeasti, ja sitten _daily scrumissa_ palautettu takaisin testaukseen. Tavoitteeksi otettiin seuraavaan sprinttiin, että DoD olisi varmasti kunnossa, ennen käyttäjätarinan "valmistumista".

Kolmannessa retroperspektiivissä ainut Mad -lappu oli enää "näytön jakaminen demossa", ongelmatilanne saatiin kuitenkin pelastettua "sankarimaisella" tyylillä joka mainiosti kuvasi myös tämän kolmannen sprintin meininkiä.

Teknisistä haasteista yksi päänvaivan aiheuttajista olivat Cypress -kirjaston end to end -testit, jotka hajoilivat vähän väliä ja välillä jopa ilman muutoksia koodiin. Lisäpäänvaivaa tässä aiheutti _Continuous Deployment_ (CD) putken riippuvuus mainittujen testien hajoamisesta. Nämä tuottivat säännöllisesti "tunkkausta", jonka tuloksena saimme häiriöt ratkaistua aina ennen asiakastapaamisia ja _final releasea_. Lisäksi testikirjaston dokumentaation lukemiseen kului runsaasti aikaa, mikä piti ottaa huomioon viikoittaiseen kuuden tunnin työajan säännöstelyssä.

##  Onnistumiset ja kehityskohteet

Kokonaisuudessaan olimme miniprojektiimme hyvin tyytyväisiä, onnistuimme luomaan toimivan ja tyylikkään lukuvinkkisovelluksen hyvällä ryhmähengellä. Projektimme eteni tasaisesti joka viikko ja saimme edistettyä sovellusta asiakkaan toivomilla ominaisuuksilla.

Teknisistä puolista olimme tyytyväisiä erityisesti CD-putkemme toimivuuteen läpi projektin. Onnistuimme myös luomaan toimivan nettisovelluksen _Full Stack_ -kurssin tekniikoilla, vaikka suurimmalla osalla ryhmästämme ei ollut vielä paljoakaan tästä muuta kuin yo. kurssin tarjoamat opit takanaan (jos sitäkään). Vältyimme myös pelätyiltä _Merge_ -konflikteilta suunnilleen kokonaan.

Prosessin perspektiivistä palavereita oli sopiva määrä. Pidimme säntillisesti retrospektiivin, daily scrumin (perjantaisin hieman pidennettynä miniprojektin luonteesta johtuen) ja ennen asiakastapaamisia lyhyen pre-demopalaverin. Palavereissa oli aluksi hieman turhan paljon pituutta mikä tuli ilmi ensimmäisessä retrospektiivissä, onnistuimme jatkossa produktiivisemmin käsittelemään aiheita.

Projektinhallinnan viestinnän kannalta meillä oli hyvin käytössä erilaisia viestintävälineitä - _Zoom_ puhe- ja näköyhteydelle, jo aikaisemmin mainittu Flinga valkotauluna tarvittaessa (retro, loppupalaveri) ja _Telegram_ viestittelyyn. Telegramin käyttö mahdollisti jatkuvan yhteyden kehitystiimiin.

Kehityskohdista jo ensimmäisestä retrospektiivistä lähtien nousi ESlint ja sen käyttö. ESlint tulisi olla koko tiimillä kunnossa ja yhtenäisesti konfiguroituna. Yksi tapa tämän varmistamiseksi olisi ollut lisätä _eslintrc_ projektin repositorion _package.json_ -tiedostoon, heti projektin alussa. Seuraavaa projektia varten _Featuretogglet_ koettiin myös mieluisampana, kuin uusien _branchien_ muodostaminen jokaista käyttäjätarinaa varten. Loppudemossa eräs ryhmä nosti _Slackin_ hyödyt ja vertasi niitä Telegramiin - keskusteluun olisi ollut mahdollista luoda vielä enemmän ulottuvuuksia Slackin avulla.

##  Opitut asiat

Opittujen asioiden kirjo osoittautui laajaksi loppuanalyysissa. Kirjon voikin jakaa selvästi kahteen teemaan: teknisiin ja tiimityöskentelyyn.

Aikaisemminkin mainittu Full Stack -osaaminen syveni kehitystiimin jäsenten keskuudessa. Frontendin, backendin ja koko sovelluksen toiminnan testaamista tehtiin koko tiimin keskuudessa jatkuvan kehityksen mukaisesti, aina kun uusia ominaisuuksia lisättiin sovellukseen. Opimme toisin sanoen testaamaan Full Stack -sovellusta ketterästi. Näistä nostona _Cypress_ ja siihen yhdistetty _Gherkinin_ _Cucumber_ -dokumentaation osaaminen syventyi.

_GitHub Actions_ -ominaisuuden käyttö konkreettisessa projektissa ja sen avulla _Monorepomme_ _Frontendin_ ja _Backendin_ vieminen _Herokuun_ oli myös opittujen asioiden korissa. Opimme myös käyttämään projektissa GitHubin välilehteä _Projects_, jossa opimme muodostamaan käyttäjätarinoita _Issueina_. Samoin opittuna asiana _Pull Request_ -toiminnon ja haarojen __mergeäminen_ eli yhdistäminen _Main_ -haaraan oli projektimme peruskauraa toisesta sprintistä lähtien. 

Tiimityössä tämä oli monelle kehitystiimin jäsenelle ensimmäinen monen henkilön ohjelmointi-kokemus, sekä Scrum-projekti. Opimme myös, että etätyö toimii ja voi tuottaa [minttistä](https://urbaanisanakirja.com/word/mintissamintti/) hedelmää! Lisäksi miniprojekti näin COVID-19 -aikaan pidettynä oli hyvää harjoitusta nimenomaan etätyöstä ja ajanhallinnasta. 
