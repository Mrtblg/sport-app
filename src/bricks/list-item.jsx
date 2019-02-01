import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Link } from 'react-router-dom';
import { css, withStyles } from '../skeleton/ressources/with-styles';

/**
 * Displays an item designed to go in a list
 * that takes an array of parameters as labels
 * each parameter corresponding to a row label
 * This item can be passed an url and becomes a link
 * this item can also be used for different purposes
 * see props.type for more details
 */
const ListItem = ({
  labels,
  type,
  link,
  styles,
}) => {
  const labelsView = labels.map(label => (
    <div key={label} {...css(styles.label)}>{label}</div>
  ));
  const typeStyle = styles[type];
  if (link !== undefined) {
    return (
      <Link to={link} {...css([styles.container, typeStyle])}>
        {labelsView}
      </Link>
    );
  }
  return (
    <div {...css([styles.container, typeStyle])}>
      {labelsView}
    </div>
  );
};

ListItem.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.any).isRequired, // labels to be displayed in this order
  link: PropTypes.string, // route to follow on click
  type: PropTypes.string, // possible values : ['std', 'header', 'button', 'selected']
  styles: PropTypes.object.isRequired,
};

ListItem.defaultProps = {
  type: 'std',
  link: undefined,
};

export default withStyles(({ color, margin, fontSize }) => ({
  container: {
    backgroundColor: color.neutralXS,
    display: 'flex',
    padding: `${margin.std} ${margin.L}`,
    borderBottom: `1px solid ${color.neutralS}`,
    textDecoration: 'none',
  },
  header: {
    backgroundColor: color.neutralS,
  },
  button: {
    backgroundColor: color.primary,
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: color.neutralS,
  },
  label: {
    fontSize: fontSize.std,
    color: color.text,
    flex: 1,
  },
}))(ListItem);
