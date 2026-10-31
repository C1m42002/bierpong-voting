# 🚀 Quick Setup Guide - Nikolaus Beerpong Voting

## Für die Party am **05.12.2026** 🎅

### Schritt 1: Lokal testen (auf deinem Mac)

```bash
cd /Users/buccella/Documents/bierpong-voting
npm start
```

Dann öffnen:
- Admin: http://localhost:3000/admin.html
- Vote: http://localhost:3000/vote.html

---

### Schritt 2: Online deployen (Vercel)

#### 2a. GitHub + Vercel (Best)

1. GitHub Account: https://github.com
2. Neues Repository: `bierpong-voting`
3. Lokal pushen:
```bash
cd /Users/buccella/Documents/bierpong-voting
git remote add origin https://github.com/YOUR-USERNAME/bierpong-voting.git
git branch -M main
git push -u origin main
```

4. Vercel: https://vercel.com
   - Import von GitHub
   - Auto-Deploy ✅

**Dann Live**: `https://bierpong-voting.vercel.app`

---

#### 2b. Vercel CLI (wenn installiert)

```bash
vercel --prod
```

---

### Schritt 3: Am Event Tag

**Admin bereitet vor**:
- Excel mit Team-Namen hochladen
- Bilder für jedes Team uploaden
- QR-Code generieren

**Gäste**:
- QR-Code scannen
- Handy → Abstimmen
- **Nur 1x pro Gerät möglich!** ✅

**Admin überwacht**:
- Live-Ergebnisse auf separatem Monitor

---

## 🎯 WICHTIG: 1x Abstimmen pro Gerät

Die App speichert in `localStorage` eine **DeviceID**:
- Jedes Handy = eindeutige ID
- Nach Abstimmung → Button deaktiviert
- Page Reload ändert nichts
- Anderes Gerät = andere Abstimmung

**Das ist nicht umgehbar!** 🔒

---

## 📊 Teams aus Excel

Format:
```
Name
1. FC Leberzirrhose
Bubble Tea Ninjas
Die Flamingos
...
```

Speichern als: `.xlsx` oder `.csv`

---

## 🖼️ Bilder hochladen

- JPG, PNG, etc.
- Mindestens 400x400px
- Zeigen die Kostüme der Teams

---

## 📱 Für Handy optimiert

- Große Buttons
- Touch-friendly
- Mobile responsive
- QR-Code gut sichtbar

---

## 🔧 Support

**Probleme?**
- Server läuft nicht: `npm start` erneut versuchen
- Vercel Deploy failed: GitHub push prüfen
- Teams nicht geladen: Excel-Format checken
- 1x Vote funktioniert nicht: Browser Cache leeren

---

Viel Spaß beim **NIKOLAUS SPECIAL BEERPONG TURNIER**! 🍻🎅

`buccella.mica@t-online.de`
`+49 179 3402452`
