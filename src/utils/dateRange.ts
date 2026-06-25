export const getDateRange = (
  range: string
) => {
  const today = new Date();

  const to =
    today
      .toISOString()
      .split("T")[0];

  const fromDate =
    new Date(today);

  switch (range) {
    case "7days":
      fromDate.setDate(
        today.getDate() - 7
      );
      break;

    case "30days":
      fromDate.setDate(
        today.getDate() - 30
      );
      break;

    case "90days":
      fromDate.setDate(
        today.getDate() - 90
      );
      break;

    default:
      fromDate.setDate(
        today.getDate()
      );
  }

  return {
    from:
      fromDate
        .toISOString()
        .split("T")[0],

    to,
  };
};