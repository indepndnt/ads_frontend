import React, {Component} from 'react';
import $ from 'jquery';

export default class MailingList extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillMount() {
        this.setState({
            content: (
                <p>Sign up for our mailing list for news and updates!</p>
            ),
        })
    };

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        $.ajax({
            type: 'POST',
            url: '/api/mailing-list',
            data: {email: this.state.value},
            context: this,
            error: function (x, s, e) {this.setState({
                content: (
                    <div className="box justify-content-center">
                        <hr/>
                        <h2 className="modal-title text-center">Sorry!</h2>
                        <p>Something went wrong and we were not able to add you to the mailing list.</p>
                        <p>Error {x.status}: {s} {e}</p>
                    </div>
                )
            })},
            success: function () {this.setState({
                content: (
                    <div className="box justify-content-center">
                        <hr/>
                        <h2 className="modal-title text-center">Welcome!</h2>
                        <p>You have been subscribed to the mailing list.</p>
                    </div>
                )
            })},
        });
        event.preventDefault();
    }

    render() {
        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 text-muted text-center">
                            {this.state.content}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <form id="newsletter" className="form-group flex-fill" onSubmit={this.handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <input className="form-control flex-grow-1" type="email" name="email" id="email" required
                                       value={this.state.value} onChange={this.handleChange}
                                       placeholder=" enter your email address"/>
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-danger">Keep Updated</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}
