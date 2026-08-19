const StatCard = ({ label, value }) => {
  return (
    <div className="stat-card">
      <span className="stat-card__title">
        {label}
      </span>

      <strong className="stat-card__value">
        {value}
      </strong>
    </div>
  );
};

export default StatCard;