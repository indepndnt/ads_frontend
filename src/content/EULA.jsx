import React from 'react';
import Header from "../components/Header";

const EULA = () => {
    return (
        <div className="container">
            <Header heading="End-User License Agreement"/>
            <div className="section" id="end-user-license-agreement">

                <div className="section" id="end-user-license-agreement-for-accounting-data-solutions-apps">
                    <h2>End-User License Agreement for Accounting Data Solutions' Apps</h2>
                    <p>This End-User License Agreement ("EULA") is a legal agreement between you and Accounting Data
                        Solutions, LLC ("we") for the use of the software products identified above, which includes
                        computer software and may include associated media and electronic documentation ("App").</p>
                    <p>By using the App, you agree to be bounded by the terms of this EULA.</p>
                    <p><em>Grant of License.</em></p>
                    <p>This EULA grants you the right to use the App.</p>
                    <p><em>Termination.</em></p>
                    <p>We may terminate this EULA at any time and for any reason.</p>
                </div>
                <div className="section" id="limited-warranty">
                    <h2>Limited Warranty</h2>
                    <p><em>No Warranties.</em></p>
                    <p>We expressly disclaim any warranty for the App. The App and any related documentation is
                        provided "as is" without warranty of any kind, either express or implied, including, without
                        limitation, the implied warranties of merchantability, fitness for a particular purpose, or
                        noninfringement. The entire risk arising out of use or performance of the App remains with
                        you.</p>
                    <p><em>No Liability for Damages.</em></p>
                    <p>In no event shall we be liable for any damages whatsoever (including, without limitation,
                        damages for loss of business profits, business interruption, loss of business information,
                        or any other pecuniary loss) arising out of the use of or inability to use the App, even if
                        we are aware of the possibility of such damages and known defects.</p>
                </div>
            </div>
        </div>
    )
};

export default EULA;