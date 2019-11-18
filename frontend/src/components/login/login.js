import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div className="login-container">
                <div className="login">
                    <form>
                        <div class="input-group align-item-center">
                            <div class="input-group-prepend">
                                <div class="input-group-text">@</div>
                            </div>
                            <div>
                                <input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="Username"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                )
            }
        }
        
export default Login;