// import database
const db = require("../config/database");

// membuat class Patient
class Patient {
  /**
   * Membuat method static all.
   */
  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients";
      /**
       * Melakukan query menggunakan method query.
       * Menerima 2 params: query dan callback
       */
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Buat fungsi untuk insert data.
   */
  static async create(data) {
    // melakukan insert data ke database
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO patients SET ?";
      db.query(sql, data, (err, results) => {
        resolve(results.insertId);
      });
    });

    // melakukan query berdasarkan id
    const patient = await this.find(id);
    return patient;
  }

  // Mengupdate data patient
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE patients SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });

    // Mencari data yang baru diupdate
    const patient = await this.find(id);
    return patient;
  }

  // Menghapus data dari database
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  // Mencari data berdasarkan id
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        // destructing array
        const [patient] = results;
        resolve(patient);
      });
    });
  }

  // Mencari data berdasarkan Nama
  static findName(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE name = ?";
      db.query(sql, name, (err, results) => {
        // destructing array
        const [patient] = results;
        resolve(patient);
      });
    });
  }

  // Mencari data berdasarkan Status yang positif
  static findStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE status = ?";
      db.query(sql, status, (err, results) => {
        // destructing array
        const [patient] = results;
        resolve(patient);
      });
    });
  }

}

// export class Patient
module.exports = Patient;
