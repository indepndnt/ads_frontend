import React, {Component} from 'react';

export default class Section extends Component {
    render() {
        return (
            <section>
              <div className="container">
                <div className="row align-items-center">
                  <div className={"col-lg-6" + (this.props.swap === "true" ? " order-lg-2" : "")}>
                    <div className="p-5">
                      <img className="img-fluid rounded-circle" src={this.props.image} alt=""/>
                    </div>
                  </div>
                  <div className={"col-lg-6" + (this.props.swap === "true" ? " order-lg-1" : "")}>
                    <div className="p-5">
                      <h2 className="display-4">{this.props.heading}</h2>
                      <p>{this.props.text}</p>
                        {this.props.button}
                    </div>
                  </div>
                </div>
              </div>
            </section>
        );
    }
}
