/*global gapi*/

export default class User {
    idProvider;
    googleUserInstance;

    constructor(context, callbackUser, callbackVisitor) {
        this.context = context;
        this.callbackUser = callbackUser;
        this.callbackVisitor = callbackVisitor;
        this._userData = {first_name: '', last_name: '', email: '', groups: [], create_date: null};
    }

    gapiLoadWhenReady(script) {
        if (script.getAttribute('gapi_processed')) {
            // Load the auth2 instance
            gapi.load('auth2', () => {
                gapi.auth2.init({
                    client_id: '444058961244-j1ceheocuu09gfllsr0omgle5963n32i.apps.googleusercontent.com',
                    // Scopes to request in addition to 'profile' and 'email'
                    //scope: 'additional_scope'
                }).then(this.checkForLoggedInUser, this.googleLoginError);
            });
        } else {
            setTimeout(() => {
                this.gapiLoadWhenReady(script)
            }, 100)
        }
    }

    checkForLoggedInUser = googleAuthInstance => {
        // Google API has successfully instantiated here
        if (googleAuthInstance.isSignedIn.get()) {
            this.googleSignIn();
        } else {
            fetch('/api/session', {
                method: 'GET',
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                credentials: "same-origin",
            })
                .then(response => {
                    if (response.status > 299) {
                        throw new Error('Failed to validate login with server, please try again in a few minutes.')
                    }
                    return response.json();
                })
                .then(userData => {
                    this.idProvider = 'intuit';
                    for (const [key, value] of Object.entries(userData)) {
                        this._userData[key] = value
                    }
                })
                .then(this.callbackUser)
                .catch(error => {
                    this.callbackVisitor(error.message);
                });
        }
    };

    googleLoginError = error => {
        // If an error is raised while initializing (this can happen in old unsupported browsers)
        console.log('Google authentication error:');
        console.log(error);
        this.logout();
    };

    renderButton = () => {
        // Render the Google Sign-In button
        gapi.signin2.render('googleSignIn', {
            'scope': 'profile email',
            'width': 100,
            'height': 26,
            'theme': 'dark',
            'onsuccess': this.googleSignIn,
            'onfailure': (e) => {this.googleLoginError('Sign-in button failure ' + e)}
        });
    };

    refreshToken = () => {
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
                                alert('Login expired and refresh failed. Please try logging in again.')
                            }
                        });
                })
        } else if (timeLeft) {
            setTimeout(this.refreshToken, (timeLeft - 120) * 1000);
        } else {
            this.googleSignIn();
        }
    };

    logout = () => {
        fetch('/api/session', {
            method: 'DELETE',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            credentials: "same-origin",
        })
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('Server sign-out failed, already signed out.');
                }
            })
            .catch(error => {
                console.log(error);
                if (this.googleUserInstance) {
                    this.googleUserInstance.disconnect();
                }
            })
            .finally(() => {
                this.callbackVisitor('Successfully logged out.');
            });

        if (this.idProvider === 'google') {
            this.googleUserInstance.disconnect();
        } else if (this.idProvider === 'intuit') {
            console.log('logged out from intuit');
        }
        this.idProvider = '';
    };

    googleSignIn = () => {
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
