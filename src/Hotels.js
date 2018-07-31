import React, { Component } from 'react';

import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Hotels extends Component {

    render() {
        console.log(this.props.hotels);
        return (
            <div className="all_posts_container">
                <h2 className="all_post_heading">Hotels</h2>
                {this.props.loading ? <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div> : null}
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {this.props.hotels.map((post) => (
                        <div key={post.id} className="post">
                            {
                                (<div className="row">
                                    <div className="col-lg-6">
                                        <img src="https://picsum.photos/200/300/?image=625" className="img-rounded" alt="picsum" />
                                    </div>
                                    <div className="col-lg-6">
                                        <h3 className="all_post_heading">{post.name}</h3>
                                        <p className="message">{post.company.bs}</p>
                                        <p className="message">{post.company.catchPhrase}</p>
                                        <p className="message">{post.phone}</p>
                                    </div>
                                </div>
                                )
                            }

                        </div>
                    ))}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    loading: state.loading
})
export default connect(mapStateToProps)(Hotels);