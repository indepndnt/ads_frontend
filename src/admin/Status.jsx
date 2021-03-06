import React, {Component} from "react";
import { Link } from "react-router-dom";
/*global AbortController*/

export default class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queues: [{name: 'loading ...', count: 0}],
            workers: [{name: 'loading ...', state: '', currentJob: '', queues: []}],
            workResult: null,
            errors: null,
            queue: '(loading ...)',
            jobs: [{id: '', description: 'loading ...', origin: '', excInfo: '', createdAt: '', endedAt: ''}],
            recentJobs: [{job_id: '', description: 'loading ...', result: '', started: '', ended: ''}],
        };
        this.refreshQueueInterval = null;
        this.refreshJobsInterval = null;
        this.controller = new AbortController();
        this.signal = this.controller.signal;
        this.setQueues = this.setQueues.bind(this);
        this.setJobs = this.setJobs.bind(this);
        this.handleRequeue = this.handleRequeue.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCompact = this.handleCompact.bind(this);
    }

    componentDidMount() {
        this.setQueues();
        this.setJobs('failed');
        this.refreshQueueInterval = setInterval(this.setQueues, 30000);
        this.refreshJobsInterval = setInterval(this.setJobs, 10000, null);
    }

    componentWillUnmount() {
        clearInterval(this.refreshQueueInterval);
        clearInterval(this.refreshJobsInterval);
        this.controller.abort();
    }

    setQueues() {
        fetch('/api/admin/queue', {
            method: 'GET',
            credentials: "same-origin",
            signal: this.signal,
        })
            .then(response => response.json())
            .then(data => this.setState(data));
    }

    setJobs(queue) {
        if (queue === null) {
            queue = this.state.queue;
        }
        fetch('/api/admin/jobs?queue=' + queue, {
            method: 'GET',
            credentials: "same-origin",
            signal: this.signal,
        })
            .then(response => response.json())
            .then(data => this.setState({jobs: data.jobs, recentJobs: data.recentJobs, queue}));
    }

    handleRequeue(event, jobId) {
        event.preventDefault();
        fetch('/api/admin/jobs', {
            method: 'PUT',
            credentials: "same-origin",
            body: JSON.stringify({
                queue: this.state.queue,
                job: jobId,
            }),
            signal: this.signal,
        })
            .then(response => response.json())
            .then(data => {
                this.setState(data);
                this.setJobs(this.state.queue);
            })
    }

    handleCancel(event, jobId) {
        event.preventDefault();
        fetch('/api/admin/jobs', {
            method: 'DELETE',
            credentials: "same-origin",
            body: JSON.stringify({
                queue: this.state.queue,
                job: jobId,
            }),
            signal: this.signal,
        })
            .then(response => response.json())
            .then(data => {
                this.setState(data);
                this.setJobs(this.state.queue);
            })
    }

    handleCompact(event) {
        event.preventDefault();
        fetch('/api/admin/jobs', {
            method: 'PATCH',
            credentials: "same-origin",
            body: JSON.stringify({
                queue: this.state.queue,
            }),
            signal: this.signal,
        })
            .then(response => response.json())
            .then(data => {
                this.setState(data);
                this.setJobs(this.state.queue);
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="card-deck">
                    <div className="card">
                        <div className="card-header"><h3>Queues</h3></div>
                        <table id="queues" className="table table-bordered card-body">
                            <thead>
                            <tr>
                                <th>Queue</th>
                                <th className="narrow">Jobs</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.queues.map(q =>
                                <tr key={q.name} className={q.name === 'failed' && q.count > 0 ? 'text-danger' : ''}>
                                    <td>
                                        <button onClick={event => {
                                            event.preventDefault();
                                            this.setJobs(q.name)
                                        }}>{q.name}</button></td>
                                    <td className="narrow">{q.count}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="card">
                        <div className="card-header"><h3>Workers</h3></div>
                        <table id="workers" className="table table-bordered card-body">
                            <thead>
                            <tr>
                                <th>State</th>
                                <th>Worker</th>
                                <th>Queues</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.workers.map(w =>
                                <tr data-role="worker" key={w.name}>
                                    <td>{w.state === "" ? "" : <i title={w.currentJob}>

                                    </i>}</td>
                                    <td>{w.name}</td>
                                    <td>{w.queues}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="card-title">
                            <h3>Jobs on <strong className={this.state.queue === 'failed' ? 'text-danger' : ''}>
                                {this.state.queue}</strong></h3>
                        </div>
                        <button id="empty-btn" onClick={e => this.handleCancel(e, 'all')}
                           className="btn btn-danger btn-sm" style={{float: 'right'}} data-toggle="tooltip"
                           title="Remove all jobs from this queue (DESTRUCTIVE)" data-html={true}>
                            Empty</button>
                        <button id="compact-btn" onClick={this.handleCompact}
                           className="btn btn-primary btn-sm" style={{float: 'right', marginRight: 8}}
                           data-toggle="tooltip"
                           title="Remove all stale jobs from this queue (non-destructive)">
                            Compact</button>
                        {this.state.queue === 'failed' ?
                            <button id="requeue-all-btn" className="btn btn-primary btn-sm"
                               onClick={e => this.handleRequeue(e, 'all')}
                               style={{float: 'right', marginRight: 8}}>
                                Requeue All</button> : ''}
                        This list below contains all the registered jobs on queue&nbsp;
                        <strong>{this.state.queue}</strong>, sorted by age (oldest on top).
                    </div>
                    <div className="card-body">
                        {this.state.workResult ? <p>{this.state.workResult}</p> : ''}
                        {this.state.errors ? this.state.errors.map(e =>
                            <p className="alert-danger">{e}</p>) : ''}

                        <table id="jobs" className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th className="narrow">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.jobs.map(j =>
                                <tr data-role="job" data-job-id={j.id} key={j.id}>
                                    <td>

                                        <span className="description">{j.description}</span>
                                        {j.excInfo ?
                                            <span className="origin">from <strong>{j.origin}</strong></span> : ''}
                                        <div className="job_id">{j.id}</div>
                                        {j.excInfo ? <div>
                                            <span className="end_date">Failed at {j.endedAt}</span>
                                            <pre className="exc_info">{j.excInfo}</pre>
                                        </div> : ''}
                                    </td>
                                    <td><span className="creation_date">{j.createdAt}</span></td>
                                    <td className="actions narrow">
                                        <button onClick={e => this.handleRequeue(e, j.id)}
                                           className="btn btn-info btn-sm">
                                            Requeue</button>
                                        <Link to={j.id} onClick={e => this.handleCancel(e, j.id)}
                                           className="btn btn-warning btn-sm">
                                            Cancel</Link>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>Recently completed jobs</h3>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Result</th>
                            <th>Started/Ended</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.recentJobs.map(h =>
                            <tr key={h.job_id}>
                                <td>{h.job_id}</td>
                                <td>{h.description}</td>
                                <td>{h.status}</td>
                                <td>{h.result}</td>
                                <td>
                                    <small>{h.started}<br/>{h.ended}</small>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}