# Deployment Guide 🚀

## Local (auf deinem Mac)

### Installation
1. Node.js installieren: https://nodejs.org/
2. Projekt klonen/downloaden
3. `npm install`
4. `npm start`
5. Browser: `http://localhost:3000/admin.html`

## Lokal im Netzwerk (WiFi)

Wenn andere im Netzwerk sind und über QR-Code abstimmen sollen:

### 1. Deine Mac IP finden
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
# Beispiel: 192.168.1.100
```

### 2. Server starten
```bash
npm start
# Server läuft auf http://192.168.1.100:3000
```

### 3. QR-Code generieren
- Admin-Seite: `http://192.168.1.100:3000/admin.html`
- QR-Code generieren
- QR-Code zeigt die Voter-URL mit deiner IP

### 4. Gäste scannen
Alle im gleichen WiFi können jetzt abstimmen.

---

## Cloud Deployment (Gratis)

### Option 1: Railway (Empfohlen - Einfach)

1. **Repository erstellen**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **GitHub Account erstellen** (https://github.com)

3. **Repo auf GitHub hochladen**
   ```bash
   git remote add origin https://github.com/your-username/bierpong-voting.git
   git branch -M main
   git push -u origin main
   ```

4. **Railway-Account** (https://railway.app)
   - GitHub mit Railway verbinden
   - Projekt importieren: `bierpong-voting`
   - Automatischer Deploy

5. **App öffnen**
   - Railway gibt dir eine URL wie: `https://bierpong-voting.up.railway.app`
   - Admin: `https://bierpong-voting.up.railway.app/admin.html`

### Option 2: Vercel (Noch einfacher, aber braucht Anpassung)

1. **Vercel-Account** (https://vercel.com)
2. **Projekt hochladen**
   - Vercel ist optimiert für Next.js/Frontend
   - Diese App braucht einen Node.js Backend
   - Vercel unterstützt das, aber Railway ist einfacher

### Option 3: Heroku (Kostenpflichtig geworden 💰)

Heroku ist nicht mehr gratis, daher nicht empfohlen.

---

## Produktionsgebrauch 🏆

### Was zu beachten ist:
- **Backup**: `data/teams.json` und `data/votes.json` sichern
- **Nicht gleichzeitig mehrfach deployieren**
- **Vote-Datei ist persistent** - Nach dem Turnier löschen
- **Keine Authentication** - Admin-Seite ist nicht geschützt!

### Optional: Admin-Passwort hinzufügen

Bearbeite `server.js` und füge Authentifizierung hinzu:

```javascript
app.post('/api/excel', (req, res) => {
  if (req.headers['x-admin-key'] !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // ... rest of code
});
```

Dann im Frontend (`admin.html`) Headers mit Admin-Key senden.

---

## Tipps 💡

- **Größeres Event?** Evtl. zu Datenbank upgraden (SQLite ist für kleine Events ausreichend)
- **Mehrfach-Session?** `data/votes.json` vor jedem Event leeren
- **Bilder speichern?** `data/images/` Folder backup
- **Verlosung machen?** Admin kann von Results CSV exportieren

---

Viel Erfolg beim Deployment! 🎉
