# Sankaristoorit backend how-to

### Näin pääset alkuun

Kansiossa `./sankaristoorit-backend` komento npm install. Tämä asentaa kaikki tarvittavat nodemoduulit. Lisää vain .env tiedosto kansioon `./sankaristoorit-backend`

## Komennot

Suoritetaan siis komentoriviltä kansiossa `./sankaristoorit-backend`

### npm run start

Käytetään production kantaa, ei seurata tiedostojen muuttumista.

### npm run test

Ajaa backendin testit ja kantana testi

### npm run dev

Käytetään dev kantaa, seurataan tiedostojen muuttumista. Hyvä devaamiseen.

## APIDocien teko

#### Asenna apidoc

`npm install apidoc -g`

#### Generoi apidoc

`apidoc -e node_modules`

Tämän jälkeen docit löytyvät hakemistosta `./doc/`
