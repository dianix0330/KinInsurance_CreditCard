import React, { useState, useMemo } from "react";
import axios from "axios";

import { CreditCard, Input } from "./components";
import "./App.scss";
import moment from "moment/moment";

function App() {
  const [creditNumber, setCreditNumber] = useState("0000000000000000");
  const [expireDate, setExpireDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("MM/YY");
  const [cvv, setCVV] = useState("000");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zipCode, setZipCode] = useState("91730");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          creditNumber,
          expireDate,
          cvv,
          firstName,
          lastName,
          zipCode,
        }
      );

      setSuccessMessage(`Form submitted successfully! ID: ${response.data.id}`);
      setErrorMessage("");
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("For submission failed, Please try again later.");
    }
  };

  const isCreditCard = (cardNumber) => {
    // Reverse the credit card number
    const reversedNumber = cardNumber.split("").reverse().join("");

    let sum = 0;
    for (let i = 0; i < reversedNumber.length; i++) {
      let digit = parseInt(reversedNumber[i]);

      // Double the digit if the index is odd
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
    }

    return sum % 10 === 0;
  };
  const validateForm = () => {
    // Validate credit card number by length
    if (
      creditNumber.length < 15 ||
      creditNumber.length > 16
    ) {
      setErrorMessage("Credit card number must be 15-16 numbers");
      return false;
    }

    // Validate credit card number by Luhn Algorithm
    if (isCreditCard(creditNumber) === false) {
      setErrorMessage("Credit card number is not valid number");
      return false;
    }
    // Validate expiration date format
    if (moment(expireDate, "MM/YY", true).isValid() === false) {
      setErrorMessage("Expiration date must be in MM/YY format");
      return false;
    }

    // Validate CVV
    if (cvv.length < 3 || cvv.length > 4) {
      setErrorMessage("CVV must be 3-4 numbers");
      return false;
    }

    // Validate zip code
    if (zipCode.length !== 5 && zipCode.length !== 9) {
      setErrorMessage(`Billing zip code should be 5 or 9 numbers`);
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const formattedCreditNumber = useMemo(() => {
    const reversedNumber = creditNumber
      .replace(/\D/g, "")
      .split("")
      .reverse()
      .join("");
    const formattedNumber = reversedNumber
      .replace(new RegExp(`\\d{${4}}`, "g"), (match) => match + " ")
      .trim();
    return formattedNumber.split("").reverse().join("");
  }, [creditNumber]);

  const handleCreditNumberChange = (e) => {
    const currentNumber = e.target.value.replace(/\s/g, "");
    if (currentNumber.length < 17) setCreditNumber(currentNumber);
  };

  const handleExpireDateChange = (e) => {
    const currentDate = e.target.value.replace(/[^0-9/]/g, "");
    if (currentDate.length < 6) setExpireDate(currentDate);
  };

  const handleBlurExpireDate = (e) => {
    const dateInfo = e.target.value.split("/");
    let month, year;

    if (dateInfo.length < 2) {
      month = dateInfo[0].substring(0, 2);
      year = dateInfo[0].substring(2, 4);
    } else {
      month = (dateInfo[0] ?? "MM").padStart(2, "0");
      year = (dateInfo[1] ?? "YY").padStart(2, "0");
    }

    const currentDate = `${month.substring(0, 2)}/${year.substring(0, 2)}`;
    setExpireDate(currentDate);
    setFormattedDate(currentDate);
  };

  const handleCvvChange = (e) => {
    const currentCvv = e.target.value.replace(/\D/g, "");
    if (currentCvv.length < 5) setCVV(currentCvv);
  };

  return (
    <main className="app">
      <header className="app-header">Pay with credit card</header>
      <div>
        <div className="app-credit-card">
          <CreditCard
            creditNumber={formattedCreditNumber}
            expireDate={formattedDate}
            cvv={cvv}
            fullName={`${firstName} ${lastName}`}
          />
        </div>
        <form className="app-form" onSubmit={handleSubmit}>
          <div className="form-info">
            <Input
              label="Credit Card Number"
              type="text"
              value={formattedCreditNumber}
              onChange={handleCreditNumberChange}
              placeholder="XXXX XXXX XXXX XXXX"
              role="credit number"
              size="25"
              question="true"
              required
            />
            <Input
              label="Expiration Date"
              type="text"
              value={expireDate}
              onBlur={handleBlurExpireDate}
              onChange={handleExpireDateChange}
              placeholder="MM/YY"
              role="expiration date"
              size="15"
              required
            />
            <Input
              label="CVV"
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="XXX"
              role="cvv"
              size="8"
              question="true"
              required
            />
          </div>
          <div className="form-info">
            <Input
              label="Cardholder's First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              role="first name"
              size="20"
              required
            />
            <Input
              label="Cardholder's Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              role="last name"
              size="20"
              required
            />
            <Input
              label="Billing Zip Code"
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="XXXXXX"
              role="billing zip code"
              size="8"
              required
            />
          </div>
          <br />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </main>
  );
}

export default App;
