import React, { Component, PropTypes } from 'react';
import s from './FakeInputAutocomplete.module.less';
import fuzzysearch from 'fuzzysearch';

export default
class FakeInputAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  handleInputChange(event) {
    let value = event.target.value;
    this.setState({ value });
  }

  filterVariants(variants, filterFunction, searchQuery) {
    return variants.filter(variant => filterFunction(variant.value, searchQuery));
  }

  render() {
    let { filterFunction, placeholder, variants, ...restProps } = this.props;
    let { value } = this.state;
    let filteredVariants = this.filterVariants(variants, filterFunction, value);
    return (
      <div className={s.fakeInputAutocomplete}>
        <input
          value={value}
          className={s.input}
          placeholder={placeholder}
          onChange={this.handleInputChange.bind(this)}
          { ...restProps }
        />
      </div>
    );
  }
}

FakeInputAutocomplete.propTypes = {
  defaultValue: PropTypes.string,
  filterFunction: PropTypes.func,
  placeholder: PropTypes.string,
  variants: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
  })),
  isShowPopupAbove: PropTypes.bool
};
FakeInputAutocomplete.defaultProps = {
  defaultValue: '',
  filterFunction: (value1, value2) => fuzzysearch(value2.toLowerCase(), value1.toLowerCase()),
  placeholder: '',
  variants: [],
  isShowPopupAbove: PropTypes.bool
};
