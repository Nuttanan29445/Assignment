function checkCondition(value, condition, threshold) {
  switch (condition) {
    case "LT":
      return value < threshold;
    case "LE":
      return value <= threshold;
    case "GT":
      return value > threshold;
    case "GE":
      return value >= threshold;
    default:
      return false;
  }
}

function getLengthRange(minCondition, minLength, maxCondition, maxLength) {
  if (maxLength === 99) {
    if (minCondition === "GT") {
      return `>${minLength}`;
    } else if (minCondition === "GE") {
      return `>=${minLength}`;
    }
  }
  if (minCondition === "GT" && maxCondition === "LT") {
    return `${minLength + 0.01}-${(maxLength - 0.01).toFixed(2)}`;
  }
  if (minCondition === "GT" && maxCondition === "LE") {
    return `${minLength + 0.01}-${maxLength.toFixed(2)}`;
  }
  if (minCondition === "GE" && maxCondition === "LT") {
    return `${minLength}-${(maxLength - 0.01).toFixed(2)}`;
  }
  if (minCondition === "GE" && maxCondition === "LE") {
    return `${minLength}-${maxLength.toFixed(2)}`;
  }
  return "";
}

exports.CompositionAndDefectRice = (riceData, standards) => {
  const composition = [];
  const defect = {};

  let totalWeight = 0;
  riceData.forEach((rice) => {
    totalWeight += rice.weight;
  });

  standards.forEach((standard) => {
    const lengthRange = getLengthRange(
      standard.conditionMin,
      standard.minLength,
      standard.conditionMax,
      standard.maxLength
    );
    composition.push({
      name: standard.name,
      lengthRange: lengthRange,
      actualPercentage: 0,
    });
  });

  riceData.forEach((rice) => {
    if (!defect[rice.type]) {
      defect[rice.type] = rice.weight;
    } else {
      defect[rice.type] += rice.weight;
    }

    for (const standard of standards) {
      if (standard.shape.includes(rice.shape)) {
        const meetsMinCondition = checkCondition(
          rice.length,
          standard.conditionMin,
          standard.minLength
        );
        const meetsMaxCondition = checkCondition(
          rice.length,
          standard.conditionMax,
          standard.maxLength
        );

        if (meetsMinCondition && meetsMaxCondition) {
          const compositionItem = composition.find(
            (item) => item.name === standard.name
          );
          if (compositionItem) {
            compositionItem.actualPercentage += rice.weight;
          }
          break;
        }
      }
    }
  });
  composition.forEach((item) => {
    item.actualPercentage =
      ((item.actualPercentage / totalWeight) * 100).toFixed(2) + "%";
  });

  const defectPercentages = [];
  let foreignMatterWeight = 0;
  for (const type in defect) {
    if (type !== "white") {
      foreignMatterWeight += defect[type];
    }
    defectPercentages.push({
      name: type,
      actualPercentage: ((defect[type] / totalWeight) * 100).toFixed(2) + "%",
    });
  }

  if (foreignMatterWeight > 0) {
    defectPercentages.push({
      name: "total",
      actualPercentage:
        ((foreignMatterWeight / totalWeight) * 100).toFixed(2) + "%",
    });
  }

  return [composition, defectPercentages];
};
