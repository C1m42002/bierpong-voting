import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';
import QRCode from 'qrcode';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Verzeichnisse
const dataDir = path.join(__dirname, 'data');
const imagesDir = path.join(dataDir, 'images');

[dataDir, imagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Datei-Pfade
const teamsFile = path.join(dataDir, 'teams.json');
const votesFile = path.join(dataDir, 'votes.json');

// Storage für Multer
const imageStorage = multer.diskStorage({
  destination: imagesDir,
  filename: (req, file, cb) => {
    const teamId = req.body.teamId;
    const ext = path.extname(file.originalname);
    cb(null, `team_${teamId}${ext}`);
  }
});

const memStorage = multer.memoryStorage();
const upload = multer({ storage: memStorage });
const uploadImage = multer({ storage: imageStorage });

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper: Daten laden/speichern
const loadJSON = (filePath, defaultValue = []) => {
  if (!fs.existsSync(filePath)) return defaultValue;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const saveJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// API: Excel hochladen
app.post('/api/excel', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const workbook = XLSX.read(new Uint8Array(req.file.buffer), { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const teams = data.map((row, idx) => ({
      id: idx + 1,
      name: row.Name || row.Team || row.name || `Team ${idx + 1}`,
      image: null,
      votes: 0
    }));

    saveJSON(teamsFile, teams);
    res.json({ success: true, count: teams.length, teams });
  } catch (error) {
    console.error('Excel upload error:', error);
    res.status(400).json({ error: error.message });
  }
});

// API: Bilder hochladen
app.post('/api/images', uploadImage.single('image'), (req, res) => {
  try {
    const teamId = parseInt(req.body.teamId);
    const teams = loadJSON(teamsFile, []);
    const team = teams.find(t => t.id === teamId);

    if (!team) return res.status(404).json({ error: 'Team not found' });

    const filename = path.basename(req.file.filename);
    team.image = `/images/${filename}`;
    saveJSON(teamsFile, teams);

    res.json({ success: true, team });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API: Teams abrufen
app.get('/api/teams', (req, res) => {
  const teams = loadJSON(teamsFile, []);
  res.json(teams);
});

// API: QR-Code generieren
app.get('/api/qr', async (req, res) => {
  try {
    const protocol = req.protocol;
    const host = req.get('host');
    const voterUrl = `${protocol}://${host}/vote.html`;
    const qrImage = await QRCode.toDataURL(voterUrl);
    res.json({ qr: qrImage, url: voterUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API: Abstimmen
app.post('/api/vote', (req, res) => {
  try {
    const { teamId, deviceId } = req.body;
    const votes = loadJSON(votesFile, {});
    const teams = loadJSON(teamsFile, []);

    // Check: Device hat schon gewählt?
    if (votes[deviceId]) {
      return res.status(403).json({ error: 'Already voted from this device' });
    }

    // Vote speichern
    votes[deviceId] = { teamId, timestamp: new Date().toISOString() };
    saveJSON(votesFile, votes);

    // Team vote count erhöhen
    const team = teams.find(t => t.id === teamId);
    if (team) {
      team.votes = (team.votes || 0) + 1;
      saveJSON(teamsFile, teams);
    }

    res.json({ success: true, message: 'Vote recorded' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API: Check ob Device bereits abgestimmt hat
app.post('/api/check-voted', (req, res) => {
  const { deviceId } = req.body;
  const votes = loadJSON(votesFile, {});
  res.json({ voted: !!votes[deviceId] });
});

// API: Ergebnisse (Admin)
app.get('/api/results', (req, res) => {
  const teams = loadJSON(teamsFile, []);
  const votes = loadJSON(votesFile, {});
  const totalVotes = Object.keys(votes).length;

  const results = teams.map(team => ({
    ...team,
    percentage: totalVotes > 0 ? ((team.votes / totalVotes) * 100).toFixed(1) : 0
  }));

  res.json({ results, totalVotes });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🍻 Bierpong Voting started at http://localhost:${PORT}`);
  console.log(`📊 Admin: http://localhost:${PORT}/admin.html`);
  console.log(`🗳️  Vote: http://localhost:${PORT}/vote.html`);
});
