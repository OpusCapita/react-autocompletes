import React, { Component, PropTypes } from 'react';
import s from './FakeInputAutocomplete.module.less';
import fuzzysearch from 'fuzzysearch';
import VerticalList from '../VerticalList';
import { Motion, spring, presets } from 'react-motion';

export default
class FakeInputAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      isFocused: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue) {
      this.setState({ value: nextProps.defaultValue });
    }
  }

  focus() {
    if (this._input) {
      this._input.focus();
    }
  }

  handleInputChange(event) {
    let value = event.target.value;
    let { onChange } = this.props;
    this.setState({ value });
    onChange(event, value);
  }

  handleItemClick(event, key) {
    let { onSelect } = this.props;
    onSelect(event, key);

    this._input.blur();
  }

  filterItems(items, filter, searchQuery) {
    return items.filter(item => filter(item.value, searchQuery));
  }

  handleFocus() {
    this.focus();
    this.setState({ isFocused: true });
  }

  handleBlur() {
    this.setState({ isFocused: false });
  }

  render() {
    let {
      defaultValue, // eslint-disable-line no-unused-vars
      filter,
      items,
      maxSuggessionsHeight,
      onChange, // eslint-disable-line no-unused-vars
      onSelect, // eslint-disable-line no-unused-vars
      inputReactComponent,
      placeholder,
      // origin, // TODO
      ...restProps
    } = this.props;
    let { value, isFocused } = this.state;
    let filteredItems = this.filterItems(items, filter, value);
    let inputProps = {
      ref: (ref => (this._input = ref)).bind(this),
      value,
      placeholder,
      onChange: this.handleInputChange.bind(this),
      ...restProps
    }

    let input = inputReactComponent ?
      inputReactComponent(inputProps) :
      (<input className={s.input} { ...inputProps } />);

    let showSuggessions = isFocused && filteredItems.length;
    let motionPreset = presets.stiff;
    let suggessions = (
      <Motion
        defaultStyle={{ x: 0, y: 0 }}
        style={{
          x: showSuggessions ? spring(maxSuggessionsHeight, motionPreset) : spring(0, motionPreset),
          y: showSuggessions ? spring(1, motionPreset) : spring(0, motionPreset)
        }}
      >{interpolatedStyle =>
        <div
          className={s.suggessionsContainer}
          style={{
            maxHeight: `${interpolatedStyle.x}px`,
            opacity: interpolatedStyle.y
          }}
        >
          <div className={s.suggessions}>
            <VerticalList
              items={filteredItems}
              onClick={(event, key) => this.handleItemClick(event, key)}
            />
          </div>
        </div>}
      </Motion>
    );

    return (
      <div
        ref={ref => (this._autocomplete = ref)}
        tabIndex={-1}
        className={s.fakeInputAutocomplete}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
      >
        {input}
        {suggessions}
      </div>
    );
  }
}

FakeInputAutocomplete.propTypes = {
  defaultValue: PropTypes.string,
  filter: PropTypes.func,
  inputReactComponent: PropTypes.func,
  placeholder: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
  })),
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  // origin: PropTypes.oneOf([ 'top', 'bottom', 'left-top', 'left-bottom', 'right-top', 'right-bottom' ]), // TODO
  maxSuggessionsHeight: PropTypes.number
};
FakeInputAutocomplete.defaultProps = {
  defaultValue: '',
  filter: (value1, value2) => fuzzysearch(value2.toLowerCase(), value1.toLowerCase()),
  placeholder: '',
  items: [],
  onChange: () => {},
  onSelect: () => {},
  // origin: 'bottom', // TODO
  maxSuggessionsHeight: 320
};
