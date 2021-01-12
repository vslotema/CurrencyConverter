import React, { Component } from "react";
import Select from "react-select";
import { FaExchangeAlt, FaChevronRight } from "react-icons/fa";


const currencyStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    border: "none",
    padding: "0.375rem",
    fontWeight: "600",
  }),
};


class CurrencyForms extends Component {
  render() {
    const lastUpdated = new Date(
      JSON.parse(localStorage.getItem("rates")).date
    ).toLocaleString("en-GB");
    return (
      <>
        <div className="container  bg-gray-900 bg-opacity-30 mx-auto w-screen h-5/6 top-10 lg:h-96 relative rounded-lg lg:top-32 lg:w-11/12 xl:w-10/12">
          <form className=" container mx-auto block pt-10 items-center  space-y-3 lg:pt-12 lg:space-y-0 lg:flex lg:space-x-6 lg:justify-center lg:p-10 ">
            <div>
              <p className="pb-1 text-white hidden lg:block">
                <label htmlFor="amount">Amount</label>
              </p>
              <input
                className="semi-bold w-full p-3 pl-4 rounded focus:ring-2 focus:ring-blue-600 xl:w-72 lg:w-60 "
                defaultValue="1"
                type="text"
                name="amount"
                id="amount"
                onChange={(e) => this.props.onAmount(e)}
              />
            </div>
            <div>
              <p className="pb-1 text-white hidden lg:block">
                <label htmlFor="from">From</label>
              </p>

              <Select
                className="w-full focus:ring-2 focus:ring-blue-600  text-left xl:w-72 lg:w-60 "
                id="from"
                options={this.props.options}
                defaultValue={{ label: "USD", value: "USD" }}
                onChange={(from) => this.props.onSelectFrom(from)}
                styles={currencyStyles}
              />
            </div>

            <button
              className="text-white  transform translate-y-2/4 hidden lg:block"
              type="submit"
              onClick={(e) => this.props.onSwitch(e)}
            >
              <FaExchangeAlt className="w-8 h-8  " />
            </button>
            <div>
              <p className="pb-1 text-white hidden lg:block">
                <label htmlFor="to">To</label>
              </p>
              <Select
                className="w-full focus:ring-8 focus:ring-blue-600 text-left xl:w-72 lg:w-60"
                id="to"
                options={this.props.options}
                defaultValue={{ label: "EUR", value: "EUR" }}
                onChange={(to) => this.props.onSelectTo(to)}
                styles={currencyStyles}
              />
            </div>

            <button
              className="w-full text-white bg-yellow-500 relative p-6 rounded lg:transform lg:translate-y-1/4 lg:w-12 lg:h-12 "
              type="submit"
              onClick={(e) => this.props.onSubmit(e)}
            >
              <FaChevronRight className="w-8 h-8 absolute transform left-2/4 -translate-x-2/4 -translate-y-2/4" />
            </button>
          </form>
          <div className="container w-full text-center pt-8 text-white w-24 absolute left-2/4 transform -translate-x-2/4  lg:pt-0  lg:w-2/4">
            <p className="text-2xl sm:text-3xl">
              {this.props.submitted
                ? this.props.amount + " " + this.props.from.value + " = "
                : ""}
            </p>
            <div className="flex justify-center flex-wrap items-end space-x-2">
              <h2 className="text-5xl sm:text-6xl">
                {this.props.submitted ? this.props.exchange : "Exchange "}
              </h2>
              <span className="text-3xl sm:text-4xl">
                {this.props.submitted
                  ? " " + this.props.to.value
                  : "Currencies!"}
              </span>
            </div>
            <p className="w-full pt-8 text-xs">
              {lastUpdated ? "Last updated on: " + lastUpdated : ""}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default CurrencyForms;
