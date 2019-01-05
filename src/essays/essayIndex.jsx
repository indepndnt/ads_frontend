import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ThinHeader from '../base/ThinHeader';

export default class EssayIndex extends Component {
    state = {
        articles: [{
            articleUrl: '',
            bannerImage: '',
            postTitle: '',
            postDate: '',
            leader: '',
        }]
    };

    constructor(props) {
        super(props);
        fetch('/api/essays/index', {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(articles => this.setState(articles))
    }

    render() {
        return (
            <React.Fragment>
                <ThinHeader
                    heading={<h2 className="masthead-heading mb-0">Essays</h2>}
                />
                {/* /admin/new_essay (add essay) */}
                {/* /admin/drafts (see drafts) */}

                <div className="row">
                    {this.state.articles.map(
                        article => (<div className="container" key={article.postDate}>
                                <hr/>
                                <div className="col-lg-12 text-center">
                                    <Link to={article.articleUrl}>
                                        <img className="img-responsive img-border img-full" src={article.bannerImage} alt=""/>
                                        <h2>{article.postTitle}</h2></Link>
                                    <p>{article.postDate}</p>
                                    <p className="text-left">{article.leader}</p>
                                    <Link to={article.articleUrl} className="btn btn-primary btn-lg rounded-pill mt-5">Read More</Link>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </React.Fragment>
        )
    }
}