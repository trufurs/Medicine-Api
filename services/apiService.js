const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const fetchMedicineFromOpenFDA = async (query) => {
	const url = `https://api.fda.gov/drug/label.json?search=${query}&limit=5`;
	try {
		const medicines = await axios.get(url);
		if (medicines.length > 0) {
			// Extract essential information from the response
			const results = medicines.map((item) => ({
				brand_name: item.openfda.brand_name
					? item.openfda.brand_name[0]
					: "N/A",
				warnings: item.warnings ? item.warnings[0] : "N/A",
				usage: item.indications_and_usage
					? item.indications_and_usage[0]
					: "N/A",
				precautions: item.precautions ? item.precautions[0] : "N/A",
				dosage_and_administration: item.dosage_and_administration
					? item.dosage_and_administration[0]
					: "N/A",
			}));

			return res.send(results);
		}
	} catch (error) {
		console.error("Error fetching data from OpenFDA:", error.message);
		return null;
	}
};

const fetchMedicineFromMedlinePlusAPI = async (query) => {
	const url = `https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=${query}`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error fetching data from Another API:", error.message);
		return null;
	}
};

// Aggregate data from multiple APIs
const fetchAggregatedMedicineData = async (medicineName) => {
	const openFDAData = await fetchMedicineFromOpenFDA(medicineName);
	const medlinePlusAPIData = await fetchMedicineFromMedlinePlusAPI(
		medicineName
	);

	return {
		openFDA: openFDAData,
		medlinePlusAPI: medlinePlusAPIData,
	};
};

module.exports = { fetchAggregatedMedicineData };
