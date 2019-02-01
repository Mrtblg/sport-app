import React from 'react';
import PropTypes from 'prop-types';
import { css, withStyles } from '../skeleton/ressources/with-styles';

/**
 * Displays a title
 */
const Title = ({ label, styles }) => (
  <div {...css(styles.label)}>
    {label}
  </div>
);

Title.propTypes = {
  label: PropTypes.string.isRequired, // label of the title
  styles: PropTypes.object.isRequired,
};

export default withStyles(({
  color,
  margin,
  fontSize,
  fontWeight,
}) => ({
  label: {
    padding: `${margin.std} ${margin.L}`,
    fontSize: fontSize.L,
    color: color.text,
    fontWeight: fontWeight.L,
    textAlign: 'center',
  },
}))(Title);
