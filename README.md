# 🍻 Bierpong Turnier - Kostüm Voting WebApp

Eine einfache, sichere WebApp für die Abstimmung über das beste Kostüm beim Bierpong-Turnier. Jedes Gerät kann nur einmal abstimmen.

## Features ✨

- ✅ **Jedes Gerät = 1 Vote** - localStorage + DeviceID verhindert mehrfaches Abstimmen
- 📱 **Mobile-friendly** - Responsive Design, optimiert für Smartphones
- 📊 **Live-Ergebnisse** - Admin sieht Stimmen in Echtzeit mit Progress-Bars
- 🎯 **QR-Code** - Voter-Seite über QR-Code erreichbar (auch auf Diashow anzeigbar)
- 📸 **Bilder-Upload** - Admin lädt Kostenbilder für jedes Team hoch
- 📋 **Excel-Import** - Teams einfach aus Excel importieren

## Schnell-Start 🚀

### 1. Dependencies installieren
```bash
npm install
```

### 2. Server starten
```bash
npm start
# Server läuft unter http://localhost:3000
```

### 3. Admin-Bereich öffnen
```
http://localhost:3000/admin.html
```

## Workflow 📝

### Admin-Seite (admin.html)

#### Schritt 1: Teams laden
1. Erstelle eine Excel-Datei mit Spalte `Name`:
   ```
   Name
   Team 1
   Team 2
   Team 3
   ```
2. Klick auf "Excel hochladen"
3. Teams erscheinen im Bereich "2. Bilder zu Teams hochladen"

#### Schritt 2: Bilder hochladen
1. Für jedes Team: Bild-Datei auswählen (JPG, PNG, etc.)
2. Klick "Bild hochladen"
3. Bilder erscheinen in der Diashow

#### Schritt 3: QR-Code generieren
1. Klick "QR-Code generieren"
2. QR wird angezeigt
3. Optionen: "QR ausdrucken" oder QR-Screenshot speichern

#### Schritt 4: Live-Ergebnisse überwachen
- "Ergebnisse aktualisieren" Button oder warten (auto-refresh alle 5s)
- Sieht Votes, Prozente, Progress-Bars in Echtzeit

### Voter-Seite (vote.html)
- QR-Code oben rechts anzeigen lassen (optional in Diashow)
- Teams mit ← / → durchblättern
- **Einmal** "FÜR DIESES TEAM ABSTIMMEN" klicken
- Nach Abstimmung: Button deaktiviert, Danke-Nachricht
- Kann weiterhin alle Teams ansehen, aber nicht mehr abstimmen

## Technisches 🔧

### Stack
- **Backend**: Node.js + Express
- **Frontend**: Vanilla HTML/CSS/JS
- **Storage**: JSON-Files (`data/teams.json`, `data/votes.json`)
- **Device-Tracking**: localStorage + generierte DeviceID

### Datenstruktur

**teams.json**
```json
[
  {
    "id": 1,
    "name": "Team Name",
    "image": "/images/team_1.jpg",
    "votes": 5
  }
]
```

**votes.json**
```json
{
  "dev_xyz_123456": {
    "teamId": 1,
    "timestamp": "2026-10-31T22:30:00.000Z"
  }
}
```

### API Endpoints

| Endpoint | Method | Beschreibung |
|----------|--------|-------------|
| `/api/excel` | POST | Excel-Datei hochladen, Teams extrahieren |
| `/api/images` | POST | Bild für Team hochladen |
| `/api/teams` | GET | Alle Teams abrufen |
| `/api/qr` | GET | QR-Code und Voter-URL generieren |
| `/api/vote` | POST | Abstimmung speichern |
| `/api/check-voted` | POST | Prüfen ob Device schon abgestimmt hat |
| `/api/results` | GET | Ergebnisse mit Vote-Counts (nur Admin) |

## Excel-Format 📊

Einfache Spalte mit Team-Namen. Erste Zeile = Header:

```
Name
Die Biermeister
Bubble Tea Ninjas
Die Flamingos
```

oder auch:

```
Team
Team A
Team B
Team C
```

## Customization 🎨

- **Farben**: `public/styles.css` anpassen (Gradient-Farben)
- **Text**: HTML-Dateien editieren
- **Port**: `PORT` env-var setzen oder `server.js` zeile anpassen

## Sicherheit 🔒

- ✅ Device-ID in localStorage (kein Server-Cookie nötig)
- ✅ Jedes Gerät kann nur 1x abstimmen
- ✅ Page Reload blockiert nicht-erneutes Abstimmen
- ✅ Keine Session-abhängig, nur Geräte-abhängig
- ⚠️ Nicht für sehr große Events (> 1000 Gäste) optimiert

## Tipps für die Party 🎉

1. **QR-Code ausdrucken** oder auf großem Monitor anzeigen
2. **Diashow auf Beamer**: QR wird mit angezeigt
3. **Gäste nutzen Handy**: Scannen → Abstimmen
4. **Admin überwacht**: Auf separatem Monitor live zuschauen
5. **Nach dem Turnier**: Admin-Seite neu laden, Excel runterladen, neue Teams + Bilder = Neustart

## Troubleshooting 🔧

### Server läuft nicht
```bash
npm install
npm start
```

### Teams werden nicht geladen
- Excel-Format überprüfen (Spalte `Name` oder `Team`)
- Nicht Excel-Formate werden unterstützt: `.xlsx`, `.csv`

### Abstimmung funktioniert nicht
- Browser-Console öffnen (F12) → Errors prüfen
- localhost erreichbar? `http://localhost:3000`
- DeviceID in localStorage? (öffne DevTools → Application → localStorage)

## Lizenz 📄

MIT - Frei verwendbar, veränderbar, privat & kommerziell.

---

**Viel Spaß bei eurem Bierpong-Turnier! 🍻**
