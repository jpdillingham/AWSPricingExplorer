import React, { Component } from 'react';
import { BACKEND_URL } from '../../constants';
import { getGuid } from '../../util';

import { Button, Intent, Spinner, Select } from "@blueprintjs/core";
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
        content: 'select service',
        filters: [],
    }

    componentWillMount = () => {
        fetch(BACKEND_URL + '/services')
        .then(response => {
            response.json().then(data => {
                this.setState({ services: data });
            })
        })
    }

    handleFilterChange = (filterId, attribute, value) => {
        console.log(filterId, attribute,value);
    }

    handleServiceSelect = (service) => {
        this.setState({ 
            selectedService: this.state.services.find(s => s.ServiceCode == service)
        }, () => {
            console.log(this.state.selectedService)
            fetch(BACKEND_URL + '/services/' + service)
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
                        <AttributeFilter 
                            filterId={1} 
                            service={this.state.selectedService} 
                            attributes={attributes} 
                            onChange={this.handleFilterChange}
                        />
                        <Button>Add Filter</Button>
                    </div>
                }
                <pre>{JSON.stringify(this.state.content, null, 4)}</pre>
            </div>
        );
    }
}

export default App;
