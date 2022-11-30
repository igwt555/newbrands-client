import React, { Component } from 'react';

// Import React Scrit Libraray to load Google object
import Script from 'react-load-script';

class Search extends Component {
  // Define Constructor
  constructor(props) {
    super(props);
    console.log(props)
    
    // Declare State
    this.state = {
      city: '',
      query: ''
    };
    
  }
  
  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ['address'],
      componentRestrictions: { country: "fr" },
      fields: ['ALL']
    };
    
    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById(this.props.id),
      options,
      );
      
      // Avoid paying for data that you don't need by restricting the set of
      // place fields that are returned to just the address components and formatted
      // address.
      
      // Fire Event when a suggested name is selected
      this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
    }
    
    handlePlaceSelect = () => {
      
      // Extract City From Address Object
      const addressObject = this.autocomplete.getPlace();
      const address = addressObject.address_components;
      
      // Check if address is valid
      if (address) {
        // Set State
        this.setState(
          {
            query: addressObject.address_components[0].long_name + ' ' + addressObject.address_components[1].long_name,
            zipcode: address[6].long_name,
            city: address[2].long_name,
          }
          );
        this.props.handleChange([this.state.query, this.state.zipcode, this.state.city])
    }
  }

  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCsGxTPgRze55f80qwk6wnRHDGfhsO1lpI&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <input type="text" id={this.props.id} placeholder={this.props.placeholder} value={this.state.query} onChange={(e) => this.setState({...this.state, query: e.target.value})}
          style={{
            margin: '0 auto',
            maxWidth: 800,
          }}
        />
      </div>
    );
  }
}

export default Search;