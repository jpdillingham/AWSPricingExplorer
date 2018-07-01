import React, { Component } from 'react';

import { Button, Intent, Spinner, Select } from "@blueprintjs/core";
import AttributeList from './AttributeList';
import ServiceDropDown from './ServiceDropDown';
import AttributeFilter from './AttributeFilter';

const styles = {
    body: {

    }
}

class App extends Component {
    state = { 
        services: [],
        selectedService: undefined,
        content: 'select service'
    }

    componentWillMount = () => {
        fetch('http://localhost:3001/services')
        .then(response => {
            response.json().then(data => {
                this.setState({ services: data });
            })
        })
    }

    handleServiceSelect = (service) => {
        this.setState({ 
            selectedService: this.state.services.find(s => s.ServiceCode == service)
        }, () => {
            console.log(this.state.selectedService)
            fetch('http://localhost:3001/services/' + service)
            .then(response => {
                response.json().then(data => {
                    this.setState({ content: data.Services[0] })
                })
            })
        });
    }

    render() {
        let attributes = this.state.selectedService ? this.state.selectedService.AttributeNames : [];

        return (
            <div className={'pt-dark'}>
                <ServiceDropDown services={this.state.services} onChange={this.handleServiceSelect}/>
                {!this.state.selectedService ? '' :
                    <div>
                        <AttributeFilter service={this.state.selectedService} attributes={attributes} />
                        <Button>Add Filter</Button>
                    </div>
                }
                <pre>{JSON.stringify(this.state.content, null, 4)}</pre>
                <AttributeList attributes={attributes}/>
            </div>
        );
    }
}

export default App;
