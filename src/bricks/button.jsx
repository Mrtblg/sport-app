import React from 'react';
import PropTypes from 'prop-types';
import { css, withStyles } from '../skeleton/ressources/with-styles';

/**
 * Display a button
 */
const Button = ({
  label,
  onPress,
  type,
  styles,
}) => {
  const typeStyle = styles[type];
  return (
    <div {...css([styles.button, typeStyle])} onClick={onPress} role="button" tabIndex={0} onKeyDown={onPress}>
      <div {...css(styles.label)}>
        {label}
      </div>
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired, // label of the button
  onPress: PropTypes.func.isRequired, // callback called when user click on button
  type: PropTypes.string, // decides the button colour, possible values : ['primary', 'warning']
  styles: PropTypes.object.isRequired,
};

Button.defaultProps = {
  type: 'primary',
};

export default withStyles(({ color, margin, fontSize }) => ({
  button: {
    padding: `${margin.std} ${margin.L}`,
    cursor: 'pointer',
  },
  label: {
    fontSize: fontSize.L,
    color: color.text,
  },
  primary: {
    backgroundColor: color.primary,
  },
  warning: {
    backgroundColor: color.warning,
  },
}))(Button);
