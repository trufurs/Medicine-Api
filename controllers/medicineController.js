const Medicine = require('../models/medicineModel');
const { fetchAggregatedMedicineData } = require('../services/apiService');

exports.getMedicineData = async (req, res) => {
  const medicineName = req.params.name;

  // Check if data is already cached
  //let cachedMedicine = await Medicine.findOne({ name: medicineName });
  //if (cachedMedicine) {
  //  return res.status(200).json(cachedMedicine.data);
  //}

  try {
    const medicineData = await fetchAggregatedMedicineData(medicineName);

    // Cache the new data
    //const newMedicine = new Medicine({ name: medicineName, data: medicineData });
    //await newMedicine.save();

    res.status(200).json(medicineData); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medicine data', error: error.message });
  }
};