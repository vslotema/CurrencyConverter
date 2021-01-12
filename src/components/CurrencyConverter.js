import React, { Component } from "react";
import CurrencyForms from "./CurrencyForms";
import { getRates } from "./FetchCurrencyRates";
import { getCurrencyMap } from "./FetchCurrenciesMap";

class CurrencyConverter extends Component {
  state = {
    amount: 1,
    exchange: 0,
    from: { value: "USD", label: "USD - United States Dollar" },
    to: { value: "EUR", label: "Eur - Euro" },
    rates: [],
    options: [],
    submit: false,
  };

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem("options"))) this.setUpOptions();
    else
      this.setState({ options: JSON.parse(localStorage.getItem("options")) });
  }

  setUpOptions = async () => {
    try {
      const currenciesMap = getCurrencyMap();
      currenciesMap.then((data) => {
        Object.entries(data).map((item) => {
          const option = { value: item[0], label: item[0] + " - " + item[1] };
          const options = JSON.parse(localStorage.getItem("options"))
            ? JSON.parse(localStorage.getItem("options"))
            : [];
          options.push(option);
          localStorage.setItem("options", JSON.stringify(options));
          return item;
        });
      });
    } catch (e) {
      console.log("Error while fetching options ", e);
    }
  };

  handleSelectFrom = (from) => {
    this.setState({ from });
    from.label = from.label.split(" - ")[0];
    this.changeBackOption();
  };

  handleSelectTo = (to) => {
    this.setState({ to });
    to.label = to.label.split(" - ")[0];
    this.changeBackOption();
  };

  changeBackOption = () => {
    if (JSON.parse(localStorage.getItem("options")))
      this.setState({ options: JSON.parse(localStorage.getItem("options")) });
    else this.setUpOptions();
  };

  handleAmount = (e) => {
    this.setState({ amount: e.target.value });
  };

  handleExchange = async () => {
    try {
      const rates = getRates();
      rates.then((data) => {
        const from = this.getFromRate(data.rates);
        const to = this.getToRate(data.rates);
        const exchange = (this.state.amount * ((1 / from) * to)).toFixed(5);
        this.setState({ exchange });
        this.setState({ submit: true });
      });
    } catch (err) {
      console.log("error during exchange ", err);
    }
  };

  getFromRate = (rates) => {
    const from = Object.entries(rates).filter(
      (i) => i[0] === this.state.from.value
    );
    return from[0][1];
  };

  getToRate = (rates) => {
    const to = Object.entries(rates).filter(
      (i) => i[0] === this.state.to.value
    );
    return to[0][1];
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleExchange();
  };

  handleSwitch = (e) => {
    e.preventDefault();

    const newFrom = document.getElementById("from").children[0].children[0]
      .children[0];

    newFrom.innerHTML = this.state.to.value;

    const newTo = document.getElementById("to").children[0].children[0]
      .children[0];

    newTo.innerHTML = this.state.from.value;

    this.changeBackOption();
    if (this.state.submit) this.handleExchange();
    this.setState({ from: this.state.to });
    this.setState({ to: this.state.from });
  };

  render() {
    return (
      <>
        <div className="bg-gradient-to-t from-gray-900 to-blue-800 h-screen text-center lg:text-left">
          <h1 className="semi-bold h-10 mx-auto w-11/12 text-white text-2xl p-5 pt-8 sm:text-3xl">
            Currency Converter
          </h1>
          <CurrencyForms
            key="currencyForm"
            onSelectFrom={this.handleSelectFrom}
            onSelectTo={this.handleSelectTo}
            onAmount={this.handleAmount}
            onSubmit={this.handleSubmit}
            onSwitch={this.handleSwitch}
            options={this.state.options}
            exchange={this.state.exchange}
            from={this.state.from}
            to={this.state.to}
            amount={this.state.amount}
            submitted={this.state.submit}
          />
        </div>
      </>
    );
  }
}

export default CurrencyConverter;
