/**
 * Deinterio Architectural Database Engine (IndexedDB)
 * High-capacity, structured client-side database replacing fragile 5MB localStorage.
 * Handles hundreds of megabytes of portfolio photos, 3D laser scans, lead records, and client files.
 */

const DB_NAME = 'DeinterioArchitecturalDB';
const DB_VERSION = 1;

export const DB_STORES = {
  CLIENTS: 'clients',
  LEADS: 'leads',
  PROJECTS: 'projects',
  SERVICES: 'services',
  PRICING: 'pricing',
  BLOGS: 'blogs',
  TRACKER_PROJECTS: 'tracker_projects',
  CLIENT_STORIES: 'client_stories',
  SETTINGS: 'settings',
} as const;

export type DBStoreName = typeof DB_STORES[keyof typeof DB_STORES];

class DeinterioDatabase {
  private dbPromise: Promise<IDBDatabase> | null = null;

  /**
   * Initializes and opens the IndexedDB database.
   */
  public getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB is not supported in this browser environment.'));
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores if they don't already exist
        if (!db.objectStoreNames.contains(DB_STORES.CLIENTS)) {
          db.createObjectStore(DB_STORES.CLIENTS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(DB_STORES.LEADS)) {
          db.createObjectStore(DB_STORES.LEADS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(DB_STORES.PROJECTS)) {
          db.createObjectStore(DB_STORES.PROJECTS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(DB_STORES.SERVICES)) {
          db.createObjectStore(DB_STORES.SERVICES, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(DB_STORES.PRICING)) {
          db.createObjectStore(DB_STORES.PRICING, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(DB_STORES.BLOGS)) {
          db.createObjectStore(DB_STORES.BLOGS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(DB_STORES.TRACKER_PROJECTS)) {
          db.createObjectStore(DB_STORES.TRACKER_PROJECTS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(DB_STORES.CLIENT_STORIES)) {
          db.createObjectStore(DB_STORES.CLIENT_STORIES, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(DB_STORES.SETTINGS)) {
          db.createObjectStore(DB_STORES.SETTINGS, { keyPath: 'key' });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('Failed to open DeinterioArchitecturalDB:', request.error);
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  /**
   * Retrieves all records from a specified store.
   */
  public async getAll<T>(storeName: DBStoreName): Promise<T[]> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.getAll();
        req.onsuccess = () => resolve((req.result || []) as T[]);
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn(`[DB] Error in getAll for ${storeName}:`, err);
      return [];
    }
  }

  /**
   * Retrieves a single record by its key.
   */
  public async get<T>(storeName: DBStoreName, key: IDBValidKey): Promise<T | null> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result ? (req.result as T) : null);
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn(`[DB] Error in get for ${storeName} key ${String(key)}:`, err);
      return null;
    }
  }

  /**
   * Inserts or updates a single record.
   */
  public async put<T>(storeName: DBStoreName, value: T): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.put(value);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.error(`[DB] Error in put for ${storeName}:`, err);
    }
  }

  /**
   * Saves an entire array of records into a store (clears old items first to ensure perfect sync).
   */
  public async setAll<T extends object>(storeName: DBStoreName, items: T[]): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.clear();
        for (const item of items) {
          store.put(item);
        }
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.error(`[DB] Error in setAll for ${storeName}:`, err);
    }
  }

  /**
   * Deletes a record by key.
   */
  public async delete(storeName: DBStoreName, key: IDBValidKey): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.delete(key);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.error(`[DB] Error in delete for ${storeName}:`, err);
    }
  }

  /**
   * Clears a store completely.
   */
  public async clear(storeName: DBStoreName): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.clear();
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.error(`[DB] Error in clear for ${storeName}:`, err);
    }
  }

  /**
   * Gets a setting value by key.
   */
  public async getSetting<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const record = await this.get<{ key: string; value: T }>(DB_STORES.SETTINGS, key);
      return record ? record.value : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  /**
   * Saves a setting value by key.
   */
  public async setSetting<T>(key: string, value: T): Promise<void> {
    await this.put(DB_STORES.SETTINGS, { key, value });
  }

  /**
   * Exports the entire database as a JSON string for backups.
   */
  public async exportAll(): Promise<string> {
    const backup: Record<string, any> = {
      exportTimestamp: new Date().toISOString(),
      app: 'Dentorio Luxury Interior Architecture',
      version: DB_VERSION,
      stores: {},
    };

    for (const storeName of Object.values(DB_STORES)) {
      backup.stores[storeName] = await this.getAll(storeName);
    }

    return JSON.stringify(backup, null, 2);
  }

  /**
   * Restores an exported database JSON.
   */
  public async importAll(jsonData: string): Promise<boolean> {
    try {
      const parsed = JSON.parse(jsonData);
      if (!parsed.stores) return false;

      for (const [storeName, items] of Object.entries(parsed.stores)) {
        if (Object.values(DB_STORES).includes(storeName as DBStoreName)) {
          if (Array.isArray(items)) {
            await this.setAll(storeName as DBStoreName, items);
          }
        }
      }
      return true;
    } catch (err) {
      console.error('[DB] Failed to import database:', err);
      return false;
    }
  }

  /**
   * Collects record counts for database statistics display.
   */
  public async getStats(): Promise<Record<string, number>> {
    const stats: Record<string, number> = {};
    for (const storeName of Object.values(DB_STORES)) {
      const items = await this.getAll(storeName);
      stats[storeName] = items.length;
    }
    return stats;
  }
}

export const appDB = new DeinterioDatabase();
