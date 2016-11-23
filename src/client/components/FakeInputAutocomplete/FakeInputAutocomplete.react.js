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
      isFoused: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.defaultValue !== nextProps.defaultValue) {
      this.setState({ value: nextProps.defaultValue });
    }
  }

  componentWillUnmount() {
    if(this._blurTimeout) {
      clearTimeout(this._blurTimeout);
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
  }

  filterItems(items, filter, searchQuery) {
    return items.filter(item => filter(item.value, searchQuery));
  }

  handleInputFocus() {
    this.setState({ isFocused: true });
  }

  handleInputBlur() {
    this._blurTimeout = setTimeout(() => this.setState({ isFocused: false }), 80);
  }

  render() {
    let {
      defaultValue,
      filter,
      items,
      maxSuggessionsHeight,
      onChange,
      onSelect,
      placeholder,
      // origin, // TODO
      ...restProps
    } = this.props;
    let { value, isFocused } = this.state;
    let filteredItems = this.filterItems(items, filter, value);

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
  filter: PropTypes.func,
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
