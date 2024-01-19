// import PatientController
const PatientController = require("../controllers/PatientController");

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
router.get("/patients", PatientController.index);
router.post("/patients", PatientController.store);
router.put("/patients/:id", PatientController.update);
router.delete("/patients/:id", PatientController.destroy);
router.get("/patients/:id", PatientController.show);
router.get("/patients/findname/:name", PatientController.showName);
router.get("/patients/status/positif", PatientController.showPositif);
router.get("/patients/status/sembuh", PatientController.showSembuh);
router.get("/patients/status/meninggal", PatientController.showMeninggal);

// export router
module.exports = router;
