import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalUser.scss'
import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter: ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
                <ModalBody>
                    <div class="container">
                        <form action="/post-crud" method="post" class="row g-3">
                            <div class="col-6">
                                <label for="inputEmail4" class="form-label">Email</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                    disabled
                                />
                            </div>
                            <div class="col-6">
                                <label for="inputPassword4" class="form-label">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                    disabled
                                />
                            </div>
                            <div class="col-6">
                                <label for="inputEmail4" class="form-label">First name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="First name"
                                    value={this.state.firstName}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                />
                            </div>
                            <div class="col-6">
                                <label for="inputPassword4" class="form-label">Last name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Last name"
                                    value={this.state.lastName}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                />
                            </div>
                            <div class="col-12">
                                <label for="inputAddress" class="form-label">Address</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Address"
                                    value={this.state.address}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                />
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className='px-2'
                        color="primary"
                        onClick={() => this.handleSaveUser()}>
                        Save
                    </Button>
                    <Button
                        className='px-2'
                        color="secondary"
                        onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
