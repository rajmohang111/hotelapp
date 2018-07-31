import React, { Component } from 'react';
import Hotels from './Hotels.js'

import { connect } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactAutocomplete from 'react-autocomplete';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';


class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checkin: moment(),
            checkout: moment(),
            value: ''
        };
        this.handleCheckinChange = this.handleCheckinChange.bind(this);
        this.handleCheckoutChange = this.handleCheckoutChange.bind(this);
    }

    handleCheckinChange(date) {
        this.setState({
            checkin: date
        });
    }

    handleCheckoutChange(date) {
        this.setState({
            checkout: date
        });
    }

    componentDidMount() {
        console.log('componentDidMount');

        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                const hotels = res.data;
                this.setState({
                    hotels: hotels
                });
                this.props.dispatch({ type: 'SET_HOTELS', data: hotels });

                var el = document.querySelectorAll('[role="combobox"]')[0];
                el.className = 'form-control';
                el.closest("div").style.display = 'block';

            })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const destination = this.state.value;
        const checkin = this.state.checkin;
        const checkout = this.state.checkout;
        const travelers = this.travelers.value;

        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' })

        const filter = {
            destination,
            checkin,
            checkout,
            travelers,
            editing: false,
            errorMessage: ''
        }

        this.props.dispatch({
            type: 'SET_PARAM',
            data: filter
        })

        this.props.dispatch({
            type: 'SEARCH_HOTELS',
            data: filter,
            masterData: this.state.hotels
        })
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="first-stuff">
                        <h2 className="heading">Search Hotels</h2>
                    </div>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="destination">Destination</label>
                            <ReactAutocomplete
                                items={this.state.hotels}
                                className="form-control"
                                shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                getItemValue={item => item.name}
                                renderItem={(item, highlighted) =>
                                    <div
                                        key={item.id}
                                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                    >
                                        {item.name}
                                    </div>
                                }
                                value={this.state.value}
                                onChange={e => this.setState({ value: e.target.value })}
                                onSelect={value => this.setState({ value })}
                            />
                        </div>
                        <div className="form-group">
                            <label for="checkin">Check-In</label>
                            <DatePicker
                                selected={this.state.checkin}
                                onChange={this.handleCheckinChange}
                                className="form-control"
                                id="checkin" ref={(input) => this.checkin = input} placeholder="Enter Check-in"
                            />
                        </div>
                        <div className="form-group">
                            <label for="checkout">Check-Out</label>
                            <DatePicker
                                selected={this.state.checkout}
                                onChange={this.handleCheckoutChange}
                                placeholder="Enter Check-out"
                                className="form-control"
                                required id="checkout" ref={(input) => this.checkout = input}
                            />
                        </div>
                        <div className="form-group">
                            <label for="traverlers">Traverlers</label>
                            <input required type="text" id="traverlers" className="form-control" ref={(input) => this.travelers = input} placeholder="Enter Travelers"
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Search</button>
                        </div>
                    </form>
                    {this.props.errors ? <p style={{ color: '#ff7777' }}>{this.props.errors.message}</p> : null}
                </div>
                <Hotels hotels={this.props.hotels} />

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    hotels: state.hotels,
    errors: state.errors

})

export default connect(mapStateToProps)(Search);