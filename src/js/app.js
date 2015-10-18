import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component {
  render() {
    return (
      <p className="hello-world">
        <span className="icon icon-remove"></span>
        Welcome !
      </p>
    );
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById("react-app"));
