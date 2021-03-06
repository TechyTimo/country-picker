import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// components / actions
import CountryListPage from '../pages/CountryListPage'
import * as actions from '../actions'
import { filterCountries } from '../utils/helperFunctions'

class CountryListContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    this.props.actions.requestAllCountries()
  }
  render () {
    return (
      <div>
        { this.props.countries.length > 0
          ? <CountryListPage
            countries={filterCountries(this.props.countries, this.props.searchFieldInput)}
            selectedCountry={this.props.selectedCountry}
            selectCountry={this.props.actions.selectCountry}
            searchFieldInput={this.props.searchFieldInput}
            changeSearchFieldInput={this.props.actions.changeSearchFieldInput}
          />
          : <div>Loading Countries...</div>
        }
      </div>
    )
  }
}

CountryListContainer.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired
  })).isRequired,
  selectedCountry: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  searchFieldInput: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  // only use reducers and the data you need per container
  countries: Object.values(state.countriesReducer.countries),
  selectedCountry: state.countriesReducer.selectedCountry,
  searchFieldInput: state.countriesReducer.searchFieldInput
})

const mapDispatchToProps = dispatch => ({
  // pass down actions as functions. child components should not do redux
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CountryListContainer)
