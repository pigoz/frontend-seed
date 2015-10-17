import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component {
  render() {
    return (
      <div> Welcome to the Frontend Seed! </div>
    );
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById("react-app"));
