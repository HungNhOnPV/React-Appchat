import React from 'react';
import firebase from '../../firebase';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        displayName: '',
        errors: [],
        loading: false,
        usersRef: firebase.database().ref('users')
    }

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.isFormvalid(this.state)) {
            this.setState({ errors:[], loading: true});
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedInUser => {
                console.log(signedInUser);
            })
            .catch(err => {
                console.log(err);
                this.setState({ errors: this.state.errors.concat(err), loading: false });
            });
            
        }
    }

    isFormvalid = ({ email, password }) => email && password;

    handleInputError = (errors, inputName) => {
        return errors.some(error => 
            error.message.toLowerCase().includes(inputName)
        ) 
            ? 'error' 
            : ''
    }

    authenticate = provider => {
        console.log(provider);
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebase
          .auth()
          .signInWithPopup(authProvider)
          .then(this.authHandler)
          .catch(err => {
            console.log(err);
            this.setState({ errors: this.state.errors.concat(err), loading: false });
        });
      };
     
    // xử lý sau khi xác thực
    authHandler = async authData => {
        const user = authData.user;
        this.setState({
          email: user.email,
          displayName: user.displayName
        });
        this.saveUser(user).then(() => {
            console.log('user save');
        })
      };

    saveUser = user => {
        return this.state.usersRef.child(user.uid).set({
            name: user.displayName,
            avatar: user.photoURL
        });
    }

    render() {
        const { email, password, errors, loading } = this.state;
        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />
                        Log in Devchat
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                        
                            <Form.Input fluid name="email" icon="mail" iconPosition="left" 
                            placeholder="Email Address" onChange={this.handleChange} value={email} className={this.handleInputError(errors, 'email')} type="email"/>

                            <Form.Input fluid name="password" icon="lock" iconPosition="left" 
                            placeholder="Password" onChange={this.handleChange} value={password} className={this.handleInputError(errors, 'password')} type="password"/>

                            <Button disabled={loading} className={ loading ? 'loading' : '' } color="violet" fluid size="large">Submit</Button>
                            <Button type="button" disabled={loading} className={ loading ? 'loading' : '' } color="primary" fluid size="large" style={{marginTop: '10px'}} onClick={() => this.authenticate("Facebook")}>Facebook Login</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (<Message error>
                        <h3>Error</h3>
                        {this.displayErrors(errors)}
                    </Message>)}
                    <Message>Don't have an accout? <Link to="/register">Register</Link></Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;