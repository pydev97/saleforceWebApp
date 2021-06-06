import React, { Component } from "react";
export default class Login extends Component {
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>User Name</label>
              <input type="email" className="form-control" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="form-group ">
              <a href="http://localhost:8080/oauth2/authorization/salesforce">
                Log in with Salesforce
              </a>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
            {/* <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p> */}
          </form>
        </div>
      </div>
    );
  }
}
