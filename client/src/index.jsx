import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: (data) => {
        console.log(data);
        this.setState({
          repos: data
        }, () => console.log('fromstate', this.state.repos))
      }
    })
  }

  search(username) {
    console.log(`${username} was searched`);
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: { 'username': username }
    })
    .then(() => {
      $.ajax({
        url: '/repos',
        type: 'GET',
        success: (data) => {
          console.log('dataafterget', data);
          this.setState({
            repos: data
          })
        }
      })
    });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));