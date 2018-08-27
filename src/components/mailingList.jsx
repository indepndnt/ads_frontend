import React, {Component} from 'react';

export default class MailingList extends Component {
    render() {
        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 text-muted text-center">
                            Sign up for our mailing list for news and updates!
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <form id="newsletter" className="form-group flex-fill" action="/newsletter/add_subscriber"
                              method="POST">
                            <div className="input-group">
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <input className="form-control flex-grow-1" type="email" name="email" id="email" required
                                       placeholder=" enter your email address"/>
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-danger">Keep Updated</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        )
            ;
    }
}
