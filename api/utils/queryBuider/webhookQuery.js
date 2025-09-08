export const paymentQueryBuilder = (queryParams) => {
  const filters = {};
  const orConditions = [];

  if (queryParams.matricNumber) filters.matricNumber = queryParams.matricNumber;
  if (queryParams.itemName) filters.itemName = queryParams.itemName;
  if (queryParams.reference) filters.reference = queryParams.reference;
  if (queryParams.searchTerm) {
    filters.$or = [
      { itemName: { $regex: queryParams.searchTerm, $options: "i" } },
      { priceTag: { $regex: queryParams.searchTerm, $options: "i" } },
    ];
  }

  if (queryParams.startDate && queryParams.endDate) {
    filters.createdAt = {
      $gte: new Date(queryParams.startDate),
      $lte: new Date(queryParams.endDate),
    };
  }

  return filters;
};
