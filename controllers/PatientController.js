// import Model Patient
const Patient = require("../models/Patient")

// buat class PatientController
class PatientController {
  async index(req, res) {
    // memanggil method static all dengan async await.
    const patients = await Patient.all();

    // TODO 4: Tampilkan data patients
    if (patients.length > 0) {
      const data = {
          message: "Get all Patient",
          data: [patients],
      };
      res.status(200).json(data);
    }
    // jika tidak ada datanya
    else {
      const data = {
        message: "Patient is empty",
      };
      res.status(200).json(data);
    }
  }

  /**
   * Buat fungsi untuk insert data.
   */
  async store(req, res) {
      /**
     * Validasi sederhana
     * - Handle jika salah satu data tidak dikirim
     */
      
    // destructing object req.body
    const { name, phone, address, status, in_date_at, out_date_at } = req.body;
    
    // Jika data undefined maka kirim response error
    if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
      const data = {
        message: `Semua data harus dikirim`,
      };
      return res.status(422).json(data);
    }
    // jika terisi semua
    const patient = await Patient.create(req.body);
    const data = {
      message: `Patient is added successfully`,
      data: patient,
    };
    return res.status(422).json(data);
  }

  async update(req, res) {
    // Update data patient
    const { id } = req.params;
    // cari id patient yang ingin diupdate
    const patient = await Patient.find(id);

    if (patient) {
      // Melakukan update data sesuai id dan data body yang diisi
      const patient = await Patient.update(id, req.body);
      const data = {
          message: "Patient is update successfully",
          data: patient,
      };
      res.status(200).json(data);
    }
    // jika tidak berhasil
    else {
      const data = {
        message: "Patient not found"
      };
      res.status(404).json(data);
    }
  }

  async destroy(req, res) {
    // Hapus data patient
    const { id } = req.params;
    // cari id patient yang ingin diupdate
    const patient = await Patient.find(id);

    if (patient) {
      // Melakukan hapus data sesuai id
      await Patient.delete(id);
      const data = {
        message: "Patient is delete successfully",
      };
      res.status(200).json(data);
    // jika tidak berhasil
    } else {
      const data = {
        message: "Patient not found",
      };
      res.status(404).json(data);
    }
  }

  // show data details sesuai id
  async show(req, res) {
    const { id } = req.params;
    // cari id patient yang ingin diupdate
    const patient = await Patient.find(id);

    // jika berhasil
    if (patient) {
      const data = {
        message: "Menampilkan detail patient",
        data: patient,
      };
      res.status(200).json(data);
    // jika gagal
    } else {
      const data = {
        message: "patient not found",
      };
      res.status(404).json(data);
    }
  }

  // Menampilkan data berdasarkan nama
  async showName(req, res) {
    const { name } = req.params;
    const patient = await Patient.findName(name);

    if (patient) {
      const data = {
        message: "Get searched resource",
        data: patient,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Resource not found",
      };
      res.status(404).json(data);
    }
  }

  // Menampilkan data berdasarkan status positif
  async showPositif(req, res) {
    try { 
      const patient = await Patient.findStatus("positif");

      if (patient.length > 0) {
        const data = {
          message: "Get positive resource",
          data: patient,
        };
        res.status(200).json(data);
      } else {
        const data = {
          message: "Resource not found",
        };
        res.status(404).json(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Menampilkan data berdasarkan status sembuh
  async showSembuh(req, res) {
    const patient = await Patient.findStatus("sembuh");

    if (patient.length > 0) {
      const data = {
        message: "Get recovered resource",
        data: patient,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Resource not found",
      };
      res.status(404).json(data);
    }
  }

  // Menampilkan data berdasarkan status meninggal
  async showMeninggal(req, res) {
    const patient = await Patient.findStatus("meninggal");

    if (patient.length > 0) {
      const data = {
        message: "Get dead resource",
        data: patient,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Resource not found",
      };
      res.status(404).json(data);
    }
  }
}

// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
