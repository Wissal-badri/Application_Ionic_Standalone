import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private readonly DB_NAME = 'weather_db';

  constructor() {}

  async initializePlugin() {
    // For web support, we need to initialize jeep-sqlite
    if (Capacitor.getPlatform() === 'web') {
      const jeepSqliteEl = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqliteEl);
      await customElements.whenDefined('jeep-sqlite');
      await this.sqlite.initWebStore();
    }

    try {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        false,
        'no-encryption',
        1,
        false
      );

      await this.db.open();

      const schema = `
        CREATE TABLE IF NOT EXISTS data_weather (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          city TEXT NOT NULL,
          country TEXT NOT NULL,
          temp REAL,
          pressure REAL,
          humidity REAL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await this.db.execute(schema);
      console.log('Database initialized and table created');
    } catch (err) {
      console.error('Error initializing database', err);
    }
  }

  async addWeather(city: string, country: string, temp: number, pressure: number, humidity: number) {
    const sql = `INSERT INTO data_weather (city, country, temp, pressure, humidity) VALUES (?, ?, ?, ?, ?);`;
    await this.db.run(sql, [city, country, temp, pressure, humidity]);
    
    if (Capacitor.getPlatform() === 'web') {
      await this.sqlite.saveToStore(this.DB_NAME);
    }
  }

  async getWeatherHistory() {
    const sql = `SELECT * FROM data_weather ORDER BY id DESC;`;
    const result = await this.db.query(sql);
    return result.values || [];
  }
}
