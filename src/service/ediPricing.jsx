import React, {Component} from 'react';

export default class EDIPricing extends Component {
    render() {
        return (
            <div className='container'>
                <div className='shadow p-3 mb-5 rounded bg-light border-dark'>
                <table className='table table-sm table-borderless'>
                    <thead>
                    <tr className='bg-success text-white text-center'>
                        <th>Description</th>
                        <th>Notes</th>
                        <th>Pricing</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Subscription</td>
                        <td>Base monthly fee</td>
                        <td>$ 29.95 monthly</td>
                    </tr>
                    <tr>
                        <td>Start-up and setup</td>
                        <td>One time setup fee</td>
                        <td className='font-weight-bold text-success'>no charge</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <hr/>
                        </td>
                    </tr>
                    <tr>
                        <td>Active Trading Partner fee</td>
                        <td>First five trading partners</td>
                        <td>$ 10.00 each, monthly</td>
                    </tr>
                    <tr>
                        <td>Active Trading Partner fee</td>
                        <td>6th through unlimited</td>
                        <td className='font-weight-bold text-success'>no charge</td>
                    </tr>
                    <tr>
                        <td>Add a new Trading Partner</td>
                        <td>One time setup fee</td>
                        <td>$ 49.00 each, one-time</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <hr/>
                        </td>
                    </tr>
                    <tr>
                        <td>Document transaction fee</td>
                        <td>Per EDI document, unlimited</td>
                        <td>$ 0.14 each</td>
                    </tr>
                    <tr>
                        <td>Acknowledgement documents</td>
                        <td>EDI 997 doc transactions</td>
                        <td className='font-weight-bold text-success'>no charge</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <hr/>
                        </td>
                    </tr>
                    <tr>
                        <td>Fulfillment House documents</td>
                        <td>Per purchase order *</td>
                        <td>$ 0.45 each</td>
                    </tr>
                    <tr>
                        <td>Add a new Fulfillment House</td>
                        <td>One time setup fee</td>
                        <td>$ 99.00 each, one-time</td>
                    </tr>
                    </tbody>
                </table>
                <div className='text-center'>
                    <small>* all inclusive of translated order document, optional UCC label document, optional
                        UPS Worldship file, optional packing slips, and receiving ASN info back</small>
                </div>
                </div>
            </div>
        )
    }
}