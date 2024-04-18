import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService, deleteUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import './UserManage.scss'
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAR_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (id) => {
        try {
            let res = await deleteUserService(id)
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact()
            } else (
                alert(res.errMessage)
            )
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="mx-3">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className='table-responsive'>
                    <div className='title text-center'>Manage Users</div>
                    <div className='mx-1'>
                        <button
                            className='btn btn-primary px-3'
                            onClick={() => this.handleAddNewUser()}
                        ><i className='fas fa-plus'></i>  Add a new user</button>
                    </div>
                    <br />
                    <div className='table-scroll'>
                        <table className="table table-hover">
                            <thead className='sticky-top bg-primary text-white'>
                                <tr>
                                    <th scope="col">Email</th>
                                    <th scope="col">Firstname</th>
                                    <th scope="col">Lastname</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arrUsers && arrUsers.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button className="btn btn-success h-auto mx-1 px-3" >Edit</button>
                                                    <button
                                                        className="btn btn-danger h-auto mx-1 px-3"
                                                        onClick={() => this.handleDeleteUser(item.id)}
                                                    >Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
