import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
  // second style of initializing state. equivalent to the constructor -> super setup
  state = { latitude: null, errorMessage: '' };

  componentDidMount() {
    // good place for data loading
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ latitude: position.coords.latitude }),
      error => this.setState({ errorMessage: error.message })
    );
  }

  componentDidUpdate() {
    // good place for data loading based on updates, ex: search terms
    console.log('My component was updated');
  }

  renderContent() {
    if ( this.state.errorMessage && !this.state.latitude ) {
      return <div>Error: {this.state.errorMessage}</div>
    }

    if ( !this.state.errorMessage && this.state.latitude ) {
      return <SeasonDisplay latitude={this.state.latitude} />
    }

    return <Spinner message="Please accept location request" />
  }

  render() {
    return (
      <div className="border red">
        {this.renderContent()}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
