# Wortjagd – német gyakorló Android app

Játékos német szókincs- és nyelvtangyakorló B1 szinten: 20 lecke 7 modulban, plusz 3 országismereti lecke. A projektből a GitHub automatikusan Android telepítőfájlt (APK-t) készít, neked semmit nem kell telepítened a gépedre.

## Mi van a mappában?

| Fájl / mappa | Mire való |
|---|---|
| `www/index.html` | Maga az app (minden képernyő, játék és a beépített kérdés-adatbázis) |
| `data/nemet_szotar_adatbazis.xlsx` | A kérdés-adatbázis Excelben – ezt töltöd fel a Google Drive-ra |
| `.github/workflows/build-apk.yml` | A GitHub ezzel építi meg az APK-t |
| `package.json`, `capacitor.config.json` | Az Android csomagolás beállításai (Capacitor 6) |
| `assets/` | App ikon és indítóképernyő |
| `signing/debug.keystore` | Állandó aláírókulcs, hogy az új verzió rátelepüljön a régire |
| `scripts/copy-libs.js` | Segédszkript az Excel-olvasó könyvtár bemásolásához |

## 1. APK készítése GitHubon (kb. 15 perc, egyszeri)

1. Regisztrálj vagy jelentkezz be a [github.com](https://github.com) oldalon.
2. Jobb felül **+ → New repository**. Név: `wortjagd`. Lehet **Private** is. Kattints a **Create repository** gombra.
3. Az új, üres repó oldalán kattints az **uploading an existing file** linkre, és húzd be a kicsomagolt mappa **teljes tartalmát**. Utána **Commit changes**.

   > **Fontos – a `.github` mappa:** a ponttal kezdődő mappák Windowson és macOS-en gyakran rejtettek, és a feltöltésből kimaradhatnak. Ellenőrizd, hogy a repóban látszik-e a `.github/workflows/build-apk.yml` fájl. Ha nem:
   > **Add file → Create new file**, a névhez írd be pontosan: `.github/workflows/build-apk.yml`, majd másold bele a fájl tartalmát (Jegyzettömbbel megnyitható), és **Commit changes**.

4. Nyisd meg az **Actions** fület. Ha kéri, engedélyezd a workflow-kat. Az „Android APK” folyamat magától elindul (vagy indítsd el: **Android APK → Run workflow**).
5. Kb. 8–12 perc múlva zöld pipa jelenik meg. Kattints a futásra, lent az **Artifacts** résznél töltsd le a **wortjagd-apk** csomagot. Ez egy zip, benne a `wortjagd-1.2.0.apk`.

### Telepítés a telefonra

1. Másold át az APK-t a telefonra (pl. Google Drive, e-mail, USB).
2. Koppints rá. Ha az Android figyelmeztet, engedélyezd az **ismeretlen forrásból származó alkalmazások** telepítését ehhez az apphoz (pl. Fájlok vagy Chrome).
3. A **Wortjagd** ikon (sárga bélyeg) megjelenik az alkalmazások között.

Frissítéskor az új APK **rátelepül** a régire, és a haladásod (XP, tallér, bélyegek, statisztika) megmarad. Ehhez szolgál a `signing/debug.keystore` – ne töröld és ne cseréld le.

### Állandó letöltési link (opcionális)

Az Actions-ben készült fájlok 90 nap után törlődnek, és csak bejelentkezve tölthetők le. Ha állandó linket szeretnél:
**Releases → Draft a new release → Choose a tag**, írd be pl. `v1.2.0`, majd **Publish release**. A workflow pár perc múlva automatikusan hozzáteszi az APK-t a kiadáshoz.

## 2. A kérdés-adatbázis kezelése Google Drive-ból (frissítés újraépítés nélkül)

1. Töltsd fel a `data/nemet_szotar_adatbazis.xlsx` fájlt a Google Drive-odra. Maradhat Excel-fájl, vagy megnyithatod Google Táblázatként is (**Megnyitás a következővel → Google Táblázatok**). Ilyenkor a táblázat linkjét használd.
2. **Megosztás → Általános hozzáférés: Bárki, aki rendelkezik a linkkel** (Megtekintő). Másold ki a linket.
3. Az appban: **Beállítás → Kérdés-adatbázis**, illeszd be a linket, és koppints az **Importálás linkről** gombra.
4. Ha később szerkeszted a táblázatot, az appban elég a **Frissítés** gomb. Ha bekapcsolod a **Frissítés az app indításakor** opciót, minden indításkor automatikusan frissül.

**Szabályok a táblázat szerkesztéséhez:**
- A munkalapok nevét (`lessons`, `vocab`, `conjugation`, `expressions`, `sentences`, `gap_fill`, `quiz`, `odd_one_out`, `dialogues`, `grammar`) és az első sor oszlopneveit **ne változtasd meg**.
- Új lecke: új sor a `lessons` lapon, egyedi `lesson_id`-vel (pl. `L21`), modulszámmal és modulnévvel (`modul_title`).
- Új szó: új sor a `vocab` lapon. Az `id` legyen egyedi (pl. `L21-W001`), a `pos_hu` az alábbiak egyike: főnév, ige, melléknév, határozószó, kötőszó, elöljárószó.
- Új igénél a `conjugation` lapra is kell egy sor (a `verb_id` egyezzen a `vocab` lap `id`-jével), különben az ige kimarad az Igeragozó és a Perfekt-műhely játékból.
- `gap_fill`: a mondatban a hiányzó rész helye `___` (három aláhúzás), legalább 2 rossz válasz kell.
- `sentences`: a `tokens` oszlop elhagyható, ilyenkor az app szóközök mentén darabolja a mondatot.
- A hiányos sorokat az app kihagyja, és importáláskor kiírja, hány ilyet talált. Az eredeti adatbázis bármikor visszaállítható: **Beépített adatbázis visszaállítása**.

Az app a letöltött adatbázist eltárolja, így internet nélkül is működik.

## 3. Az app kódjának frissítése

Ha új `www/index.html`-t kapsz:
1. A repóban nyisd meg a `www` mappát → **Add file → Upload files**, töltsd fel az új `index.html`-t, majd **Commit changes**.
2. Ajánlott a `package.json`-ban a `"version"` számát is növelni (pl. `1.2.1`).
3. Az Actions automatikusan új APK-t készít. Telepítsd a régi fölé.

## 4. Helyi építés (haladóknak, nem kötelező)

Kell hozzá: Node.js 20, Android Studio (JDK 17).

```bash
npm install
npx cap add android
npm run android:sync
npx cap open android      # Android Studióban: Build → Build APK(s)
```

## Megjegyzések

- **Engedélyek:** az app csak az internetet használja (a Google Drive-os importáláshoz). Az adatok a telefonon maradnak.
- **Android vissza gomb:** bezárja az ablakot vagy a játékot, a főmenüre ugrik, és a főmenüből kilép.
- **Aláírás:** a mellékelt kulcs debug-kulcs, saját telepítéshez és osztálytermi terjesztéshez elég. A Google Play áruházhoz külön release-kulcs kellene. Privát repóban tartsd, ha nem szeretnéd, hogy más is aláírhasson vele.
