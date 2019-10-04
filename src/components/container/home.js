import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../shared/header";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCurrencies } from "../../redux/actions/currency";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  state = {
    currencies: []
  };
  fetchCurrencies() {
    axios
      .get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
      .then(res => {
        this.setState({ currencies: res.data });
      })
      .catch(err => console.log("Error getting currencies data", err));
  }
  componentDidMount() {
    this.props.selectCurrency("USD", "$");
    this.fetchCurrencies();
    // set Interval
    this.interval = setInterval(this.fetchCurrencies, 60000);
  }

  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.interval);
  }
  // get images
  getIcons(id) {
    let path = "";
    let images = [
      {
        id: "bitcoin",
        path: "/assets/bitcoin.png"
      },
      {
        id: "caret",
        path: "/assets/caret.png"
      },
      {
        id: "ethereum",
        path: "/assets/ethereum.png"
      },
      {
        id: "litecoin",
        path: "/assets/litecoin.png"
      },
      {
        id: "ripple",
        path: "/assets/ripple.png"
      },
      {
        id: "stellar",
        path: "/assets/stellar.png"
      }
    ];
    let filter = images.filter(ele => ele.id === id);

    if (filter.length > 0) {
      return (path = filter[0]["path"]);
    } else {
      return (path = "/assets/not-found.png");
    }
  }
  render() {
    return (
      <div>
        <Header layout="home" />
        <div className="content">
          <div className="table_section">
            <div className="table_outer">
              <table className="table">
                <thead className="thead">
                  <tr>
                    <Link to=""></Link>
                    <th colSpan="3"></th>
                    <th>Cryptocurrency</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>24H Change</th>
                    <th colSpan="3"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.currencies &&
                    this.state.currencies.map(element => (
                      <tr key={element.id}>
                        <Link
                          to={"/currency_detail/" + element.id}
                          className="row_link"
                          style={{ textDecoration: "none" }}
                        ></Link>

                        <td colSpan="3"></td>
                        <td>
                          <div className="td_col td_currency">
                            <span className="counter">{element.rank}</span>
                            <div className="currency_name">
                              <img
                                className="currency_icon"
                                src={this.getIcons(element.id)}
                              />
                              <h5>{element.name}</h5>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="td_col td_price">
                            <span>{this.props.currencySign}</span>
                            <h5>
                              {element.price_usd * this.props.currencyRate}
                            </h5>
                          </div>
                        </td>
                        <td>
                          <div className="td_col td_marketPlace">
                            <span>
                              {
                                this.props.currencySign

                                                         }
                            </span>

                            <h5>
                              {element.market_cap_usd * this.props.currencyRate}
                            </h5>
                          </div>
                        </td>
                        <td>
                          <div className="td_col td_hours">
                            <span className="hours_change">
                              {element.percent_change_24h + "%"}
                         
                              {element.percent_change_24h > 0 ? (
                                <FontAwesomeIcon icon={faArrowUp} />
                              ) : (
                                <FontAwesomeIcon icon={faArrowDown} />
                              )}
                            </span>
                          </div>
                        </td>
                        <td colSpan="3"></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    selectedCurrency: state.currency.selectedCurrency,
    currencyRate: state.currency.currencyRate,
    isLoading: state.isLoading,
    currencySign: state.currency.currencySign
  };
};
const mapDispatchToProps = dispatch => {
  return {
    selectCurrency: (selected, sign) => {
      dispatch(getCurrencies(selected, sign));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
