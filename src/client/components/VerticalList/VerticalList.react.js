import React, { Component, PropTypes } from 'react';
import s from './VerticalList.module.less';

export default
class VerticalList extends Component {
  handleItemClick(event, key) {
    let { onClick } = this.props;
    onClick(event, key);
  }

  render() {
    let {
      items,
      onClick, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;
    return (
      <div className={s.verticalList} { ...restProps }>
        {items.map(item => (
          <div
            className={s.item}
            key={item.key}
            onClick={event => this.handleItemClick.call(this, event, item.key)}
          >
            {item.value}
          </div>
        ))}
      </div>
    );
  }
}

VerticalList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.node
  })),
  onClick: PropTypes.func
};
VerticalList.defaultProps = {
  items: [],
  onClick: () => {}
};
