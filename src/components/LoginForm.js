import React from "react";
import axios from "axios";

class LoginForm extends React.Component {

    state = { email: "", password: "" };

    onLoginSubmit = (e) => {
        e.preventDefault();
        
        axios.post("http://dev.api.kabox.io/api/auth/login", this.state)
        .then(response => {
            console.log(response);
            if (response.status === 200) {

                window.localStorage.setItem("access_token", response.data.access_token);
                // window.localStorage.getItem("access_token") --get the token
                // push to Home page
                this.props.history.push("/home");
            }
        })
        .catch(error => {
            console.log(error.response.status); // 422 or 402
            console.log(error.response);
            
            this.setState({ error: error.response.status });
        })

        this.setState({ error: null });
        console.log(this.state);
    }

    render() {

        return (
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="content">Log-in to your account</h2>
                    <form className="ui large form" onSubmit={this.onLoginSubmit}>
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input className="login-input" type="email" name="email" autoFocus placeholder="E-mail address" onChange={(e) => this.setState({ email: e.target.value, error: null })} value={this.state.email} />
                                </div>

                                <div className="error-message">
                                    {this.state.error === 422 && this.state.email.length === 0 ? "Please enter e-mail" : ""}
                                    {this.state.error === 422 && this.state.email.length !== 0 && this.state.password.length === 0 ? "" : ""}
                                    {this.state.error === 422 && this.state.email.length !== 0 && this.state.password.length !== 0 ? "That e-mail does not exist in the system" : ""}
                                </div>

                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input className="login-input" type="password" name="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value, error: null })} value={this.state.password} />
                                </div>

                                <div className="error-message">
                                    {this.state.error === 401 ? "Password is not correct" : ""}
                                    {this.state.error === 422 && this.state.password.length === 0 ? "Please enter password" : ""}
                                    {this.state.error === 422 && this.state.email.length !== 0 && this.state.password.length !== 0 ? "Please enter correct password" : ""}
                                </div>

                            </div>
                            <button className="ui fluid large submit button">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            
        );
    }
}

export default LoginForm;