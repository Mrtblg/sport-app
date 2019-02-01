import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Link } from 'react-router-dom';
import { css, withStyles } from '../ressources/with-styles';


/**
 * Displays the navigation top menu
 * this is a progressive clickable route showing alls the routes
 * from home to current route
 * @todo implement it, as of now this is just a link to home screen
 */
const NavBar = ({ styles }) => (
  <div {...css(styles.container)}>
    <Link to="/" {...css(styles.link)}>Premier League</Link>
  </div>
);


NavBar.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default withStyles(({
  color,
  margin,
  fontSize,
  fontWeight,
}) => ({
  container: {
    padding: `${margin.L} ${margin.XL}`,
  },
  link: {
    fontSize: fontSize.XL,
    color: color.text,
    fontWeight: fontWeight.L,
  },
}))(NavBar);
