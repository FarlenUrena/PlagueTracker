export const formatTimestamp = timestamp => {
  if (!timestamp || !timestamp.toDate) return '';

  const date = timestamp.toDate();
  if (!date) return '';

  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return `${formattedDate}, ${formattedTime}`;
};
