/*global gapi*/

export default class User {
    idProvider;
    googleUserInstance;

    constructor(context, callbackUser, callbackVisitor) {
        this.context = context;
        this.callbackUser = callbackUser;
        this.callbackVisitor = callbackVisitor;
        this._userData = {first_name: '', last_name: '', email: '', groups: [], create_date: null};
        this.logout = this.logout.bind(this);
        this.intuitSignIn = this.intuitSignIn.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
    }

    gapiLoadWhenReady(script) {
        const checkForLoggedInUser = this.checkForLoggedInUser.bind(this);
        if (script.getAttribute('gapi_processed')) {
            // Load the auth2 instance
            gapi.load('auth2', function () {
                gapi.auth2.init({
                    client_id: '444058961244-j1ceheocuu09gfllsr0omgle5963n32i.apps.googleusercontent.com',
                    // Scopes to request in addition to 'profile' and 'email'
                    //scope: 'additional_scope'
                }).then(checkForLoggedInUser);
            });
        } else {
            setTimeout(() => {
                this.gapiLoadWhenReady(script)
            }, 100)
        }
    }

    checkForLoggedInUser(googleAuthInstance) {
        // Google API has successfully instantiated here
        if (googleAuthInstance.isSignedIn.get()) {
            this.googleSignIn();
        } else {
            fetch('/api/session', {
                method: 'GET',
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                credentials: "same-origin",
            })
                .then((response) => response.json())
                .then(userData => {
                    this.idProvider = 'intuit';
                    this.userData = userData;
                })
                .then(this.callbackUser)
                .catch(error => {
                    this.callbackVisitor(error.message);
                });
        }
    }

    renderButton() {
        // Render the Google Sign-In button
        gapi.signin2.render('googleSignIn', {
            'scope': 'profile email',
            'width': 100,
            'height': 26,
            'theme': 'dark',
            'onsuccess': this.googleSignIn,
            // 'onfailure': () => {}
        });
    }

    set userData(data) {
        for (const [key, value] of Object.entries(data)) {
            this._userData[key] = value
        }
    }

    get groups() {
        return this._userData.groups;
    }

    get firstName() {
        return this._userData.first_name;
    }

    get lastName() {
        return this._userData.last_name;
    }

    get email() {
        return this._userData.email;
    }

    get createDate() {
        return this._userData.create_date;
    }

    refreshToken() {
        const timeLeft = this.googleUserInstance.getAuthResponse().expires_in;
        console.log('refresh token: auth expires in', timeLeft);
        if (timeLeft < 300) {
            this.googleUserInstance.reloadAuthResponse()
                .then(authResponse => {
                    fetch('/api/session', {
                        method: 'POST',
                        headers: {'X-Requested-With': 'XMLHttpRequest'},
                        body: JSON.stringify({token: authResponse.id_token}),
                        credentials: "same-origin",
                    })
                        .then(response => {
                            console.log('refreshed google token', response);
                            if (response.status > 299) {
                                alert('Login expired and refresh failed. Try logging in again.')
                            }
                        });
                })
        } else if (timeLeft) {
            setTimeout(this.refreshToken, (timeLeft - 120) * 1000);
        } else {
            this.googleSignIn();
        }
    }

    logout(event) {
        event.preventDefault();
        fetch('/api/session', {
            method: 'DELETE',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            credentials: "same-origin",
        })
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('Server sign-out failed');
                }
                this.callbackVisitor('Successfully logged out.');
            })
            .catch(error => {
                console.log(error);
                if (this.googleUserInstance) {
                    this.googleUserInstance.disconnect();
                }
                this.callbackVisitor(error.message);
            });

        if (this.idProvider === 'google') {
            this.googleUserInstance.disconnect();
        } else if (this.idProvider === 'intuit') {
            console.log('logged out from intuit');
        }
        this.idProvider = '';
    }

    intuitSignIn() {
        this.idProvider = 'intuit';
        fetch('/api/intuit-sso', {
            method: 'POST',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            credentials: "same-origin",
        })
            .then((response) => response.text())
            .then(url => {
                if (url.substring(0, 4) === 'http') {
                    window.location = url;
                } else {
                    throw new Error('Intuit sign-in failed! (' + url + ')');
                }
            })
            .catch(error => {
                console.log(error);
                this.callbackVisitor(error.message);
            });
    }

    googleSignIn() {
        this.idProvider = 'google';
        const auth2 = gapi.auth2.getAuthInstance();
        this.googleUserInstance = auth2.currentUser.get();
        let status;
        fetch('/api/session', {
            method: 'POST',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            body: JSON.stringify({token: this.googleUserInstance.getAuthResponse().id_token}),
            credentials: "same-origin",
        })
            .then((response) => {
                status = response.status;
                if (status > 299) {
                    return response.text();
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (status > 299) {
                    throw new Error(data);
                }
                for (const [key, value] of Object.entries(data)) {
                    this._userData[key] = value
                }
                this.refreshToken();
                return this;
            })
            .then(this.callbackUser)
            .catch(error => {
                console.log(error);
                if (this.googleUserInstance) {
                    this.googleUserInstance.disconnect();
                }
                this.callbackVisitor(error.message);
            });
    }
}
