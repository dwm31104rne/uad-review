const express = require('express');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';
const PORT = process.env.PORT || 5000;
const DB_FILE = './db.json';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());  // Untuk parse JSON di body request


// Middleware untuk autentikasi JWT
function authenticateJWT(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(403).send('Akses ditolak');

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Middleware untuk otorisasi peran
function authorizeRoles(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('Akses ditolak');
    }
    next();
  };
}

// Rute utama
app.get('/', (req, res) => {
  res.send('Selamat datang di Halaman Utama!');
});

// Endpoint untuk pendaftaran
app.post('/api/register', (req, res) => {
  const { username, password, role, accessCode } = req.body;

  if (!username || !password || !role) {
    return res.status(400).send('Semua field wajib diisi');
  }

  if (role === 'admin' && accessCode !== 'admin-secret') {
    return res.status(403).send('Kode akses tidak valid untuk admin');
  }

  const newUser = { username, password, role };

  fs.readFile(DB_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error membaca database');
    const db = JSON.parse(data);
    db.users = db.users || [];
    db.users.push(newUser);

    fs.writeFile(DB_FILE, JSON.stringify(db), (err) => {
      if (err) return res.status(500).send('Error menyimpan database');
      res.status(201).send('Pendaftaran berhasil');
    });
  });
});

// Rute login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(DB_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error membaca database');
    const db = JSON.parse(data);

    const user = db.users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY);
    res.json({ token });
  });
});

// CRUD untuk kegiatan kampus
app.get('/api/activities', (req, res) => {
  if (!fs.existsSync(DB_FILE)) return res.status(500).send('Database not found');

  fs.readFile(DB_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error membaca database');
    res.json(JSON.parse(data).activities);
  });
});

app.post('/api/activities', authenticateJWT, (req, res) => {
  const newActivity = req.body;

  fs.readFile(DB_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error membaca database');
    const db = JSON.parse(data);
    db.activities.push(newActivity);

    fs.writeFile(DB_FILE, JSON.stringify(db), (err) => {
      if (err) return res.status(500).send('Error menyimpan database');
      res.status(201).json(newActivity);
    });
  });
});

app.put('/api/activities/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  const updatedActivity = req.body;

  fs.readFile(DB_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error membaca database');
    const db = JSON.parse(data);
    const activityIndex = db.activities.findIndex((activity) => activity.id == id);
    if (activityIndex === -1) return res.status(404).send('Activity not found');

    db.activities[activityIndex] = { ...db.activities[activityIndex], ...updatedActivity };

    fs.writeFile(DB_FILE, JSON.stringify(db), (err) => {
      if (err) return res.status(500).send('Error menyimpan database');
      res.json(db.activities[activityIndex]);
    });
  });
});

app.delete('/api/activities/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;

  fs.readFile(DB_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error membaca database');
    const db = JSON.parse(data);
    db.activities = db.activities.filter((activity) => activity.id != id);

    fs.writeFile(DB_FILE, JSON.stringify(db), (err) => {
      if (err) return res.status(500).send('Error menyimpan database');
      res.status(200).send('Activity deleted');
    });
  });
});

// Endpoint untuk menyimpan ulasan
app.post('/api/reviews', authenticateJWT, (req, res) => {
  const { activityId, title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send('Judul dan konten ulasan wajib diisi');
  }

  fs.readFile(DB_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error membaca database');
    const db = JSON.parse(data);
    db.reviews = db.reviews || [];
    const newReview = {
      id: db.reviews.length + 1,
      activityId,
      title,
      content,
      userId: req.user.username,
      createdAt: new Date().toISOString(),
    };
    db.reviews.push(newReview);

    fs.writeFile(DB_FILE, JSON.stringify(db), (err) => {
      if (err) return res.status(500).send('Error menyimpan database');
      res.status(201).json(newReview);
    });
  });
});

// Endpoint untuk mengedit ulasan dalam 24 jam
app.put('/api/reviews/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  fs.readFile(DB_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error membaca database');
    const db = JSON.parse(data);
    const review = db.reviews.find((r) => r.id == id && r.userId === req.user.username);

    if (!review) return res.status(404).send('Ulasan tidak ditemukan atau bukan milik Anda');
    const reviewTime = new Date(review.createdAt).getTime();
    const now = Date.now();
    if (now - reviewTime > 24 * 60 * 60 * 1000) {
      return res.status(403).send('Ulasan hanya dapat diedit dalam waktu 24 jam');
    }

    review.title = title || review.title;
    review.content = content || review.content;

    fs.writeFile(DB_FILE, JSON.stringify(db), (err) => {
      if (err) return res.status(500).send('Error menyimpan database');
      res.json(review);
    });
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
