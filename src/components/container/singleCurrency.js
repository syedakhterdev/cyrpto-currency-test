import React, { Component } from "react";
import Header from "../shared/header";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrencies } from "../../redux/actions/currency";

class SingleCurrency extends Component {
  state = {
    currencies: []
  };
  componentDidMount() {
    this.props.selectCurrency("USD", "$");
    axios
      .get(
        `https://api.coinmarketcap.com/v1/ticker/${this.props.match.params.id}/`
      )
      .then(res => {
        this.setState({ currencies: res.data });
      })
      .catch(err => console.log("Single Currency Fetching Error", err));
  }
  render() {
    return (
      <div>
        <Header
          layout="detailPage"
          SingleCurrency={
            this.state.currencies.length > 0
              ? this.state.currencies[0]["name"]
              : ""
          }
          symbol={
            this.state.currencies.length > 0
              ? this.state.currencies[0]["symbol"]
              : ""
          }
          price={
            this.state.currencies.length > 0
              ? this.state.currencies[0]["price_usd"]
              : ""
          }
          rate={this.props.currencyRate}
        />

        {this.state.currencies && (
          <div class="content">
            <div class="deatail_wrap">
              <div class="row align-items-center">
                <div class="col-md-4 col-sm-2">
                  <div class="item_rank d-flex align-items-center">
                    <h5>Rank</h5>
                    <span class="rank_counter">
                      {this.state.currencies.length > 0
                        ? this.state.currencies[0].rank
                        : 0}
                    </span>
                  </div>
                </div>
                <div class="col-md-4 col-sm-5">
                  <div class="price_detail">
                    <h5>market Cap</h5>
                    <span class="price_number">
                      <b>{this.props.currencySign}</b>
                      {this.state.currencies.length > 0
                        ? this.state.currencies[0].market_cap_usd *
                          this.props.currencyRate
                        : 0}
                    </span>
                  </div>
                  <div class="price_detail">
                    <h5>circulating supply</h5>
                    <span class="price_number">
                      {}
                      <strong>BTC</strong>
                    </span>
                  </div>
                </div>
                <div class="col-md-4 col-sm-5">
                  <div class="price_detail">
                    <h5>24H volume</h5>
                    <span class="price_number">
                      <b>{this.props.currencySign}</b>
                      {this.state.currencies.length > 0
                        ? this.state.currencies[0]["24h_volume_usd"] *
                          this.props.currencyRate
                        : 0}
                    </span>
                  </div>
                  <div class="price_detail">
                    <h5>totla supply</h5>
                    <span class="price_number">
                      {this.state.currencies.length > 0
                        ? this.state.currencies[0]["total_supply"]
                        : 0}
                      <strong>BTC</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SingleCurrency)
);
