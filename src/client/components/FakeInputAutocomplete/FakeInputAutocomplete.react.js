import React, { Component, PropTypes } from 'react';
import s from './FakeInputAutocomplete.module.less';
import fuzzysearch from 'fuzzysearch';
import VerticalList from '../VerticalList';
import { Motion, spring } from 'react-motion';

export default
class FakeInputAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      isFoused: false
    };
  }

  handleInputChange(event) {
    let value = event.target.value;
    this.setState({ value });
  }

  filterVariants(variants, filterFunction, searchQuery) {
    return variants.filter(variant => filterFunction(variant.value, searchQuery));
  }

  handleInputFocus() {
    this.setState({ isFocused: true });
  }

  handleInputBlur() {
    this.setState({ isFocused: false });
  }

  render() {
    let {
      filterFunction,
      placeholder,
      variants,
      maxSuggessionsHeight,
      isShowSuggessionsAbove,
      ...restProps
    } = this.props;
    let { value, isFocused } = this.state;
    let filteredVariants = this.filterVariants(variants, filterFunction, value);

    let showSuggessions = isFocused && filteredVariants.length;
    let suggessions = (
      <Motion
        defaultStyle={{ x: 0, y: 0 }}
        style={{
          x: showSuggessions ? spring(maxSuggessionsHeight) : spring(0),
          y: showSuggessions ? spring(1) : spring(0)
        }}
      >{interpolatedStyle =>
        <div
          className={s.suggessionsContainer}
          style={{
            maxHeight: `${console.log(interpolatedStyle.x) || interpolatedStyle.x}px`,
            opacity: interpolatedStyle.y
          }}
        >
          <div className={s.suggessions} >
            <VerticalList items={filteredVariants} />
          </div>
        </div>}
      </Motion>
    );

    return (
      <div className={s.fakeInputAutocomplete}>
        <input
          value={value}
          className={s.input}
          placeholder={placeholder}
          onChange={this.handleInputChange.bind(this)}
          onFocus={this.handleInputFocus.bind(this)}
          onBlur={this.handleInputBlur.bind(this)}
          { ...restProps }
        />
        {suggessions}
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
  isShowSuggessionsAbove: PropTypes.bool,
  maxSuggessionsHeight: PropTypes.number
};
FakeInputAutocomplete.defaultProps = {
  defaultValue: '',
  filterFunction: (value1, value2) => fuzzysearch(value2.toLowerCase(), value1.toLowerCase()),
  placeholder: '',
  variants: [],
  isShowSuggessionsAbove: false,
  maxSuggessionsHeight: 320
};
