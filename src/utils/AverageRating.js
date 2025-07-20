export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  return (total / reviews.length).toFixed(1); // keep 1 decimal place
};
