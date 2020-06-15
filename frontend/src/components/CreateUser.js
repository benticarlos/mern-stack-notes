import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }

    async componentDidMount() {
        this.getUsers();
        console.log(this.state.users);
    }

     getUsers = async () => {
        const res = await axios.get('http://benti.io:3030/api/users');
        this.setState({
            users: res.data
        });
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault(); // activa el ajax en el boton
        await axios.post('http://benti.io:3030/api/users', {
            username: this.state.username
        })
        this.setState({username: ''});
        this.getUsers();
    }

    deleteUser = async (id) => {
        const response = window.confirm('Are you sure you want to delete it?');
        if (response) {
             await axios.delete('http://benti.io:3030/api/users/' + id);
            this.getUsers();
        }
    }

    render() {
        return (<div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Create New User</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername} />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </form>
                </div>
            </div>
            <div className="col-md-8">
                <ul className="list-group">
                    {
                        this.state.users.map(user => (
                            <li
                                className="list-group-item list-group-item-action"
                                key={user._id}
                                onDoubleClick={() => this.deleteUser(user._id)}
                                >
                                {user.username}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>);
    }
}
