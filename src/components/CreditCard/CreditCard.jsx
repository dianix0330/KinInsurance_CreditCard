import "./index.scss";
export default function CreditCard({
  creditNumber = "0000 0000 0000 0000",
  expireDate = "MM/YY",
  cvv = "000",
  fullName,
}) {
  return (
    <div className="credit-card__content">
      <div className="credit-card__content--front">
        <div className="card__content__logo"></div>
        <p className="card__content__credit-number">{creditNumber}</p>
        <p className="card__content__name">{fullName}</p>
        <p className="card__content__expiry">
          {`Expiry`} <br /> {expireDate}
        </p>
      </div>
      <div className="credit-card__content--back">
        <p className="card__content__cvv">
          {`CVV`} <br /> {cvv}
        </p>
      </div>
    </div>
  );
}
