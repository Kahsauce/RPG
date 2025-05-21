import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Database setup
async function setupDatabase() {
  const db = await open({
    filename: join(__dirname, 'database.sqlite'),
    driver: sqlite3.Database,
  });

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      start TEXT NOT NULL,
      end TEXT NOT NULL,
      type TEXT NOT NULL,
      description TEXT,
      completed INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS training_sessions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      sport_type TEXT NOT NULL,
      date TEXT NOT NULL,
      duration INTEGER NOT NULL,
      description TEXT,
      intensity TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      feedback TEXT,
      metrics TEXT
    );

    CREATE TABLE IF NOT EXISTS meals (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      meal_type TEXT NOT NULL,
      description TEXT,
      foods TEXT,
      completed INTEGER DEFAULT 0,
      feedback TEXT
    );

    CREATE TABLE IF NOT EXISTS injuries (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      body_part TEXT NOT NULL,
      severity TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT,
      description TEXT,
      status TEXT NOT NULL,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS competitions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      sport_type TEXT NOT NULL,
      date TEXT NOT NULL,
      location TEXT NOT NULL,
      description TEXT,
      priority TEXT NOT NULL,
      goal TEXT,
      result TEXT
    );

    CREATE TABLE IF NOT EXISTS coach_messages (
      id TEXT PRIMARY KEY,
      coach_type TEXT NOT NULL,
      message TEXT NOT NULL,
      date TEXT NOT NULL,
      is_user INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT NOT NULL,
      birth_year INTEGER NOT NULL,
      weight REAL NOT NULL,
      height REAL NOT NULL,
      fitness_level TEXT NOT NULL,
      primary_sport TEXT NOT NULL,
      secondary_sports TEXT NOT NULL,
      dietary_restrictions TEXT,
      notifications INTEGER DEFAULT 1,
      units TEXT DEFAULT 'metric'
    );
  `);

  // Insert default user settings if not exists
  const userSettingsCount = await db.get('SELECT COUNT(*) as count FROM user_settings');
  if (userSettingsCount.count === 0) {
    await db.run(`
      INSERT INTO user_settings (id, name, birth_year, weight, height, fitness_level, primary_sport, secondary_sports, dietary_restrictions, notifications, units)
      VALUES (1, 'User', 1990, 70, 175, 'intermediate', 'run', '["swim", "bike", "football"]', '[]', 1, 'metric')
    `);
  }

  return db;
}

async function startServer() {
  const db = await setupDatabase();
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // API routes
  
  // Events
  app.get('/api/events', async (req, res) => {
    try {
      const events = await db.all('SELECT * FROM events');
      res.json(events.map(event => ({
        ...event,
        completed: !!event.completed,
        start: new Date(event.start),
        end: new Date(event.end)
      })));
    } catch (error) {
      console.error('Error getting events:', error);
      res.status(500).json({ error: 'Failed to get events' });
    }
  });

  app.post('/api/events', async (req, res) => {
    try {
      const { id, title, start, end, type, description, completed } = req.body;
      
      await db.run(
        'INSERT INTO events (id, title, start, end, type, description, completed) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id, title, start, end, type, description, completed ? 1 : 0]
      );
      
      res.status(201).json({ id, message: 'Event created successfully' });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  });

  app.put('/api/events/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, start, end, type, description, completed } = req.body;
      
      await db.run(
        'UPDATE events SET title = ?, start = ?, end = ?, type = ?, description = ?, completed = ? WHERE id = ?',
        [title, start, end, type, description, completed ? 1 : 0, id]
      );
      
      res.json({ message: 'Event updated successfully' });
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ error: 'Failed to update event' });
    }
  });

  app.delete('/api/events/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      await db.run('DELETE FROM events WHERE id = ?', [id]);
      
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ error: 'Failed to delete event' });
    }
  });

  // Training Sessions
  app.get('/api/training', async (req, res) => {
    try {
      const trainingSessions = await db.all('SELECT * FROM training_sessions');
      res.json(trainingSessions.map(session => ({
        ...session,
        completed: !!session.completed,
        date: new Date(session.date),
        metrics: session.metrics ? JSON.parse(session.metrics) : {}
      })));
    } catch (error) {
      console.error('Error getting training sessions:', error);
      res.status(500).json({ error: 'Failed to get training sessions' });
    }
  });

  // AI Coach endpoints
  app.post('/api/coach/sport', async (req, res) => {
    try {
      // This would normally call the OpenAI API
      // For demo purposes, return hardcoded data
      
      setTimeout(() => {
        res.json({
          message: 'Pour optimiser votre préparation au triathlon tout en intégrant le football, je vous suggère de réduire le volume de course à pied dans les 48h suivant vos matchs de football. Privilégiez plutôt la natation et le vélo durant ces périodes pour maintenir votre endurance tout en épargnant vos jambes. Nous pouvons également ajuster votre plan pour inclure des séances spécifiques de renforcement musculaire ciblant les groupes sollicités en football mais aussi bénéfiques pour le triathlon.'
        });
      }, 500);
    } catch (error) {
      console.error('Error getting sport coach advice:', error);
      res.status(500).json({ error: 'Failed to get sport coach advice' });
    }
  });

  app.post('/api/coach/diet', async (req, res) => {
    try {
      // This would normally call the OpenAI API
      // For demo purposes, return hardcoded data
      
      setTimeout(() => {
        res.json({
          message: 'Votre programme d\'entrainement intense de cette semaine nécessite une attention particulière à votre hydratation et à vos apports en glucides. Je vous recommande d\'augmenter votre consommation de féculents complets les jours d\'entrainements combinés (triathlon + football). Également, prévoyez une collation riche en protéines et glucides dans les 30 minutes suivant vos séances intenses pour optimiser la récupération musculaire.'
        });
      }, 500);
    } catch (error) {
      console.error('Error getting diet coach advice:', error);
      res.status(500).json({ error: 'Failed to get diet coach advice' });
    }
  });

  app.post('/api/coach/injury', async (req, res) => {
    try {
      // This would normally call the OpenAI API
      // For demo purposes, return hardcoded data
      
      setTimeout(() => {
        res.json({
          message: 'La combinaison de football et course à pied augmente les sollicitations sur vos genoux. Je vous conseille d\'intégrer des exercices de renforcement spécifiques pour les quadriceps et ischio-jambiers 2 fois par semaine. Portez également une attention particulière à vos sensations au niveau du genou droit qui montre des signes de fatigue. Nous devrions peut-être envisager une séance de récupération supplémentaire si les symptômes persistent.'
        });
      }, 500);
    } catch (error) {
      console.error('Error getting injury coach advice:', error);
      res.status(500).json({ error: 'Failed to get injury coach advice' });
    }
  });

  // User Settings
  app.get('/api/settings', async (req, res) => {
    try {
      const settings = await db.get('SELECT * FROM user_settings WHERE id = 1');
      
      if (!settings) {
        return res.status(404).json({ error: 'Settings not found' });
      }
      
      res.json({
        ...settings,
        notifications: !!settings.notifications,
        secondarySports: JSON.parse(settings.secondary_sports),
        dietaryRestrictions: settings.dietary_restrictions ? JSON.parse(settings.dietary_restrictions) : []
      });
    } catch (error) {
      console.error('Error getting user settings:', error);
      res.status(500).json({ error: 'Failed to get user settings' });
    }
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);