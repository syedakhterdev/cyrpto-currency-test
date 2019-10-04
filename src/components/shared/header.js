import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getCurrencies} from '../../redux/actions/currency'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Link} from 'react-router-dom'

class Header extends Component{
    state={
        currency:'USD'
    }
     handleChange = event => {
        
          this.setState({currency:event.target.value},()=>{
        if(this.state.currency==='USD'){
           
            this.props.selectCurrency(this.state.currency,"$")
        }else if (this.state.currency==='GBP'){
            this.props.selectCurrency(this.state.currency,'£')
        }else if (this.state.currency==='EUR'){
            this.props.selectCurrency(this.state.currency,'€')
        }else if (this.state.currency==='JPY'){
            this.props.selectCurrency(this.state.currency,'¥')
        }else if (this.state.currency==='KRW'){
            this.props.selectCurrency(this.state.currency,'₩')
        }
         
        })
      
      };
render(){
const detailPageHeader=(  <div className="col-6">
                            <div className="currency_deatail">
                                <div className="back_btn">
                                <Link to='/'>   <img src={require('../../images/back-arrow.png')}/></Link>
                                </div>
                                <div className="currency_img">
                                <img src={require('../../images/bit-coin-detail.png')}/>
                                </div>
                                <div className="currencyName_detail">
                                    <h4>{this.props.SingleCurrency}</h4>
                                    <span>{this.props.symbol}</span>
                                </div>
                                <span className="price_dollars"><b>{this.props.currencySign}</b>{this.props.price*this.props.rate}</span>
                            </div>
                        </div>)
    return(

        <div>

 
            {/* <!-- Header Start --> */}
            <header>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        {this.props.layout==='home'?
                        <div className="col-6">
                            <div className="logo">
                                <a href="#">VFCrypto</a>
                            </div>
                        </div>
                        :
                       
                        detailPageHeader
                    }
                        <div className="col-6">
                     

                            <div className="header_dropdown">
                                <div className="dropdown dropright">
                              
                                    <FormControl 
                                    >
        <Select
          value={this.state.currency}
          onChange={this.handleChange}
          displayEmpty
          name="currency"
        >
          <MenuItem value="">
          
          </MenuItem>
          <MenuItem value='USD'>USD</MenuItem>
          <MenuItem value='GBP'>GBP</MenuItem>
          <MenuItem value='EUR'>EUR</MenuItem>
          <MenuItem value='JPY'>JPY</MenuItem>
          <MenuItem value='KRW'>KRW</MenuItem>
        </Select>
    
      </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

}
const mapStateToProps = (state)=>{
    return{
        selectedCurrency: state.selectedCurrency,
        currencyRate:state.currencyRate,
        currencySign:state.currency.currencySign
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        selectCurrency: (selected,sign)=>{dispatch(getCurrencies(selected,sign))},
      
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);