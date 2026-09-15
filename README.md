# Algebruþjálfun

Stigskipt stærðfræðiforrit á íslensku: grunnreikningur, brot, algebrutjáningar, jöfnur, formúlur, hnit og jafna línu.

## Prófa forritið

Opnaðu `index.html` í vafra til að prófa án uppsetningar. Fyrir PWA, vistun utan nets og uppsetningu sem app þarf að opna forritið á HTTPS, til dæmis með GitHub Pages. Einnig er hægt að keyra staðbundinn vefþjón með `python3 -m http.server 8000` og opna `http://localhost:8000`.

## Birta með GitHub Pages

Í repository-inu: **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**. Þegar GitHub hefur birt síðuna er hún á `https://ingimar90.github.io/Algebru-j-lfun/`. Það getur tekið nokkrar mínútur að birtast. GitHub Pages þarf að vera virkt áður en slóðin opnast.

## Námsflæði

- Upphafskönnun: ein spurning fyrir hvert af 16 stigum; þrjú svarmöguleikar og „Veit ekki“.
- Tillaga: fyrsta stig sem nemandi svarar ekki rétt. Nemandi getur samt opnað hvaða stig sem er.
- Hvert stig: útskýring → sýnidæmi með skrefum → 10 breytileg dæmi. Frjáls æfing býður upp á ótakmarkaðan fjölda dæma.
- Viðmið: 8 rétt af 10 til að ljúka stigi. Ný æfing myndar nýjar tölur.
- Vísbendingar og lausnarskýringar eru aðgengilegar við hvert dæmi. Ný dæmi forðast nýlegar endurtekningar fyrir viðkomandi nemanda.

## Niðurstöður

Framvinda er vistuð sjálfkrafa í `localStorage` vafrans undir nafni nemandans, einnig í miðri æfingu. Í kennarasvæði má sækja CSV eða JSON-afrit og flytja JSON-afrit inn á annað tæki. Enginn reikningur eða miðlæg gagnageymsla er notuð: gögn milli tölva samstillast ekki og geta glatast ef vafragögnum er eytt. CSV-skrána þarf að vista sérstaklega ef óskað er eftir varanlegri skráningu.

## Skrár

`index.html`, `style.css` og `app.js` keyra forritið án pakkastjóra. `sw.js` og `manifest.webmanifest` gera það að uppsetjanlegu vefappi þegar það er birt með HTTPS.

## Uppsetning sem app

Opnaðu GitHub Pages-slóðina í Chrome eða Edge og ýttu á „Setja upp app“, eða veldu „Install app“ í valmynd vafrans. Á iPhone/iPad: opnaðu síðuna í Safari → Deila → Bæta við heimaskjá. Uppsett app geymir gögn áfram í sama vafrasniði; flutningur milli tækja krefst JSON-afrits.
