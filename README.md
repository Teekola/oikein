# Oikein

Kahootin kaltainen Quizz-sovellus.

Käyttäjäkokemus:

1. Etusivulla on tekstikenttä, johon syötetään huoneen numerokoodi
2. Kun koodi on syötetty, painetaan liity. Käyttäjä ohjautuu sivulle, jossa syötetään nimi.
3. Käyttäjä kirjoittaa tekstikenttään nimen ja painaa "siirry odottamaan" -painiketta, josta
   käyttäjä siirtyy odotushuoneeseen.
4. Odotushuoneessa näkyy kaikki samaan huoneeseen liittyneet henkilöt. Kun huoneen luonut henkilö painaa
   aloita-painiketta, kaikille huoneessa oleville henkilöille tulee näkyviin ensimmäinen kysymys. Tämän jälkeen tulee näkyviin
   vastausvaihtoehdot.
5. Käyttäjä valitsee vastausvaihtoehdon vastausajan sisällä. Kun kaikki ovat vastanneet tai vastausaika päättyy,
   siirrytään tulossivulle. Jos kysymyksiä on vielä jäljellä, siirrytään hetken kuluttua seuraavaan kysymykseen.
6. Kun kaikki kysymykset on esitetty, siirrytään lopputulossivulle.

Hallinnointi:

1. Hallinnoija pystyy luomaan kysymyssarjoja.
   -  kysymyssarjaan voi luoda kysymyksiä 1+ kpl ja kysymysten vastausvaihtoehtoja 2-4 kpl.
2. Hallinnoija pystyy luomaan huoneita.
   -  Huoneelle generoidaan automaattisesti id-arvo.
   -  Huone luodaan kysymyssarjan kohdalta, jolloin huonetta vastaa aina tietty kysymyssarja
   -  Tarvitaan tieto kussakin huoneessa olevista käyttäjistä
      -  käyttäjän nimi
      -  käyttäjän vastaukset kuhunkin kysymykseen
   -  Tarvitaan tieto siitä, missä vaiheessa kysymyssarjaa mennään:
      -  odotusvaihe
      -  kysymyksen numero
      -  tulostila
      -  lopputulostila
