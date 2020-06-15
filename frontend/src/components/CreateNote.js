import React, {Component} from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://benti.io:3030/api/users');
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username
        })
        if (this.props.match.params.id) {
            const res = await axios.get('http://benti.io:3030/api/notes/' + this.props.match.params.id)
            console.log(res.data)
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                editing: true,
                _id: this.props.match.params.id
            })
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        };
        if (this.state.editing) {
            await axios.put('http://benti.io:3030/api/notes/' + this.state._id, newNote);
        } else {
            const res = await axios.post('http://benti.io:3030/api/notes', newNote);
            console.log(res);
        }
        window.location.href = '/';
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({date});
    }

    render() {
        return (<div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h3>Create a Note</h3>
                {/** SELECT USER */}
                <div className="form-group">
                    <select
                        className="form-control"
                        name="userSelected"
                        onChange={this.onInputChange}
                        value={this.state.userSelected}
                        >
                        {
                            this.state.users.map(user =>
                                <option key={user} value={user}>
                                    {user}
                                </option>)
                        }
                    </select>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        name="title"
                        onChange={this.onInputChange}
                        value={this.state.title}
                        required/>
                    <textarea
                        name="content"
                        className="form-control"
                        placeholder="Content"
                        onChange={this.onInputChange}
                        value={this.state.content}
                        required
                        >
                    </textarea>

                    <div className="form-group">
                        <DatePicker
                            className="form-control"
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            />
                    </div>

                </div>
                <form onSubmit={this.onSubmit}>
                    <button type="submit" className="btn btn-primary">
                        Create
                    </button>

                </form>
            </div>
        </div>);
    }
}
