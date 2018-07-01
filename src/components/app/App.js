import React, { Component } from 'react';
import { BACKEND_URL } from '../../constants';
import { getGuid } from '../../util';

import ServiceDropDown from './ServiceDropDown';
import AttributeFilter from './AttributeFilter';
import AddFilterButton from './AddFilterButton';
import FetchDataButton from './FetchDataButton';

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

    handleAddFilter = () => {
        this.setState({ 
            filters: this.state.filters.concat({ 
                filterId: getGuid(),
            })
        })
    }

    handleFilterChange = (filter) => {
        this.setState({
            filters: this.state.filters.map(f => {
                return f.filterId === filter.filterId ? filter : f
            })
        })
    }

    handleFetchData = () => {
        let query = this.state.filters
            .reduce((acc, f) => (acc === '' ? '?' : acc + '&') + f.attribute + '=' + f.value, '');

        fetch(BACKEND_URL + '/services/' + this.state.selectedService.ServiceCode + '/products' + query)
        .then(response => {
            response.json().then(data => {
                this.setState({ content: data});
            });
        });
    }

    handleServiceSelect = (service) => {
        this.setState({ 
            selectedService: this.state.services.find(s => s.ServiceCode === service),
            filters: [],
        }, () => {
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
                        {this.state.filters.map(f => 
                            <AttributeFilter 
                                key={f.filterId}
                                filterId={f.filterId} 
                                service={this.state.selectedService} 
                                attributes={attributes} 
                                onChange={this.handleFilterChange}
                            />
                        )}
                        <AddFilterButton onClick={this.handleAddFilter}/>
                        <FetchDataButton onClick={this.handleFetchData}/>
                    </div>
                }
                <pre>{JSON.stringify(this.state.content, null, 4)}</pre>
            </div>
        );
    }
}

export default App;
