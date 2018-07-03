import React, { Component } from 'react';
import { BACKEND_URL } from '../../constants';
import { getGuid } from '../../util';

import { Position, Toaster, Intent } from "@blueprintjs/core";

import ServiceSelect from './ServiceSelect';
import AttributeFilter from './AttributeFilter';
import AddFilterButton from './AddFilterButton';
import FetchDataButton from './FetchDataButton';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            services: [],
            selectedService: undefined,
            content: undefined,
            filters: [],
            toasts: [],
        }

        this.toaster = React.createRef();
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
            filters: this.state.filters.map(f => f.filterId === filter.filterId ? filter : f)
        })
    }

    handleFilterDelete = (filter) => {
        this.setState({
            filters: this.state.filters.filter(f => f.filterId !== filter.filterId)
        });
    }

    handleFetchData = () => {
        let query = this.state.filters
            .reduce((acc, f) => (acc === '' ? '?' : acc + '&') + f.attribute + '=' + f.value, '');

        fetch(BACKEND_URL + '/services/' + this.state.selectedService.ServiceCode + '/products' + query)
        .then(response => {
            response.json().then(data => {
                this.setState({ content: data});
                this.handleToast('Fetched ' + data.length + ' products for ' + this.state.selectedService.ServiceCode);
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
                    this.handleToast('Fetched attributes for service ' + data.Services[0].ServiceCode);
                })
            })
        });
    }

    handleServiceClear = () => {
        this.setState({ 
            selectedService: undefined, 
            filters: [], 
            content: undefined 
        });
    }

    handleToast = (message) => {
        this.toaster.current.show({ 
            message: message,
            intent: Intent.SUCCESS,
        });
    }

    render() {
        let attributes = this.state.selectedService ? this.state.selectedService.AttributeNames : [];

        return (
            <div className={'pt-dark'}>
                <ServiceSelect 
                    services={this.state.services} 
                    onChange={this.handleServiceSelect}
                    onClear={this.handleServiceClear}
                />
                {!this.state.selectedService ? '' :
                    <div>
                        {this.state.filters.map(f => 
                            <AttributeFilter 
                                key={f.filterId}
                                filterId={f.filterId} 
                                service={this.state.selectedService} 
                                attributes={attributes} 
                                onChange={this.handleFilterChange}
                                onDelete={() => this.handleFilterDelete(f)}
                            />
                        )}
                        <AddFilterButton onClick={this.handleAddFilter}/>
                        <FetchDataButton onClick={this.handleFetchData}/>
                        <Toaster ref={this.toaster} position={Position.BOTTOM}/>
                    </div>
                }
                <pre>{JSON.stringify(this.state.content, null, 4)}</pre>
            </div>
        );
    }
}

export default App;
