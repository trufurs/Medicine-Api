const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const fetchMedicineFromOpenFDA = async (query) => {
  const url = `https://api.fda.gov/drug/label.json?search=${query}&limit=1`;
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching data from OpenFDA:', error.message);
    return null;
  }
};

const fetchMedicineFromMedlinePlusAPI = async (query) => {
  const url = `https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=${query}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Another API:', error.message);
    return null;
  }
};

// Aggregate data from multiple APIs
const fetchAggregatedMedicineData = async (medicineName) => {
  const openFDAData = await fetchMedicineFromOpenFDA(medicineName);
  const medlinePlusAPIData = await fetchMedicineFromMedlinePlusAPI(medicineName);
  
  return {
    openFDA: openFDAData,
    medlinePlusAPI: medlinePlusAPIData
  };
};

module.exports = { fetchAggregatedMedicineData };