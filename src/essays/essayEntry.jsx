import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../base/Header';
import './code.css';

export default class EssayEntry extends Component {
    state = {
        heading: 'loading...',
        error: false,
        description: 'loading...',
        content: '',
        author: '',
    };
    constructor(props) {
        super(props);
        fetch('/api/essays' + this.props.url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(essay => this.setState(essay))
            .catch(error => {
                console.log(error);
                this.setState({heading: 'failed to load', description: 'failed to load', error: error})
            });
    }

    render() {
        if (this.state.error) {console.log(this.state.error)}

        return (
            <React.Fragment>
                <Header
                    heading={<h2 className="masthead-heading mb-0">{this.state.heading}</h2>}
                />

                <div className="container">
                    <span dangerouslySetInnerHTML={{__html: this.state.content}} />
                    <hr/>
                    <section id="isso-thread" data-title="Foo!"/>
                </div>

                <div className="container">
                    <div className="clearfix">
                        {(this.props.next === undefined ? '' :
                            <Link to={this.props.next} className='btn btn-sm float-left'>&larr; Newer</Link>
                        )}
                        {(this.props.prev === undefined ? '' :
                            <Link to={this.props.prev} className='btn btn-sm float-right'>Older &rarr;</Link>
                        )}
                    </div>
                </div>
                <script data-isso="/isso/" src="/isso/js/embed.min.js"/>
            </React.Fragment>
        )
    }
}