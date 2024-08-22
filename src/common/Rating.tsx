const Star = ({ filled }: { filled: boolean }) => {
  return <span className={filled ? "star filled" : "star"}>★</span>;
};

export const RatingStar = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <Star key={index} filled={index < filledStars} />
      ))}
    </div>
  );
};
