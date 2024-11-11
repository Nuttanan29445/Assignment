const standardsUrl =
  "https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/standards.json";

exports.getStandard = async (req, res) => {
  try {
    const response = await fetch(standardsUrl);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const standards = await response.json();
    res.json(standards);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
