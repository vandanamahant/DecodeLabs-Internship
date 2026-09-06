const fs = require('fs');
const path = require('path');
const pool = require('./config/db');

const initializeDatabase = async () => {
  try {
    const sqlFilePath = path.join(__dirname, 'schema.sql');
    const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');
    
    await pool.query(sqlQuery);
    console.log('Database Schema & Tables created successfully!');
  } catch (error) {
    console.error('Error executing schema:', error.message);
  } finally {
    await pool.end();
  }
};

initializeDatabase();