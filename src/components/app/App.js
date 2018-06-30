import React, { Component } from 'react';

import { Button, Intent, Spinner } from "@blueprintjs/core";

class App extends Component {
  render() {
    return (
      <div>
        <Spinner intent={Intent.PRIMARY} />
        <Button intent={Intent.SUCCESS}>button content</Button>
      </div>
    );
  }
}

export default App;
