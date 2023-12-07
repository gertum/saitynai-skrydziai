    Sprendžiamo uždavinio aprašymas 

    Sistemos paskirtis 

Projektas bus skirtas kelionių oro keliais organizavimo palengvinimui, keleivio kelionės maršruto sudarymui.

Veikimas: svetainę turės sudaryti internetinė aplikacija ir sąsaja jai.

Turės būti išskirtos funkcijos oro uosto darbuotojui ir potencialiam klientui.

Darbuotojas turės galimybę pridėti naujus skrydžius, parinkti oro uostus iš kurių ir į kuriuos vykdomos kelionės, įrašyti kitas skrydžio charakteristikas. Tam jis, žinoma, turės prisijungti. Klientas nebūtinai turės prisijungti tam, kad galėtų naudotis platforma, bet, jeigu norės susikurti paskyrą, tai jam turėtų palengvinti darbą su sistema, ypač, jei lankosi ne pirmą sykį. Klientas galės atlikti pigiausio maršruto išpildančio jam reikalingus kriterijus (paprasčiausi tokie kriterijai būtų išvykimo ir atvykimo oro uostai) paiešką ir įsigyti kelionei lėktuvo bilietus.



    Funkciniai reikalavimai 

Neregistruotas sistemos vartotojas galės:

    Peržiūrėti pradinį („namų“) sistemos puslapį; 

    Užsiregistruoti; 

    Atlikti norimo maršruto paiešką; 

    Įsigyti bilietą ar bilietus: 

    Pridėti į krepšelį; 

    Peržiūrėti krepšelį; 

    Įvesti pirkėjo informaciją 

    Atlikti mokėjimą. 

Registruotas klientas galės:

    Peržiūrėti pradinį („namų“) sistemos puslapį; 

    Prisijungti; 

    Atsijungti; 

    Atlikti norimo maršruto paiešką; 

    Įsigyti bilietą ar bilietus: 

    Pridėti į krepšelį; 

    Peržiūrėti krepšelį; 

    Redaguoti pirkėjo informaciją 

    Atlikti mokėjimą. 

(Registruotas) darbuotojas galės:

    Peržiūrėti pradinį („namų“) sistemos puslapį; 

    Prisijungti (užsiregistruoti); 

    Atsijungti; 

    Pridėti naują skrydį. 

    Sistemos architektūra 

Sistemos dalys:

    Kliento pusė (ang. Front-End) – naudojant React.js; 

    Serverio pusė (angl. Back-End) – naudojant PHP Laravel. Duomenų bazė – MySQL 





Sistemos talpinimui bus naudojamas „Azure“ serveris. Kiekviena sistemos dalis diegiama tame pačiame serveryje.



Internetinė aplikacija bus patalpinta „Azure“ serveryje. Ji bus pasiekiama naudojant naršyklę per HTTPS protokolą. Naudotojui reikės sąsajos (API), kurią planuojama realizuoti naudojant „Laravel“ karkasą. API komunikuos su „MySQL“ duomenų baze naudodamas TCP ir IP protokolus.  
