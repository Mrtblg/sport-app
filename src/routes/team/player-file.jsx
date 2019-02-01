import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, withStyles } from '../../skeleton/ressources/with-styles';
import Button from '../../bricks/button';
import Title from '../../bricks/title';

/**
 * Display and allow edition on player info
 */
class PlayerFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      height: '',
    };
    this.deletePlayer = this.deletePlayer.bind(this);
    this.savePlayer = this.savePlayer.bind(this);
    this.handlePlayerEdit = this.handlePlayerEdit.bind(this);
  }

  /** fetch player info */
  componentWillMount() {
    this.fetchPlayerInfo();
  }

  /** check if route changed, if so fetch new player info */
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      this.fetchPlayerInfo();
    }
  }

  /** fetch player info from parent state by playerID
   * If playerId is 'create' we are creating a new player
   * skip fetching
   * Once player is fetched notify parent about new
   * selecteed playerId
  */
  fetchPlayerInfo() {
    const { playerId } = this.props.match.params
    if (playerId === 'create') {
      this.setState({
        name: '',
        height: '',
      });
      this.props.selectedPlayerCallback(undefined);
    } else {
      const { fetchPlayerById } = this.props;
      this.setState(fetchPlayerById(playerId));
      this.props.selectedPlayerCallback(playerId);
    }
  }

  /**
   * Make the API call to delete the user then use the props
   * callback to inform the reset of the application
   * @todo make API call
   */
  deletePlayer() {
    const { playerId } = this.props.match.params;
    // todo delete player remotely API call and continue once API acked
    this.props.deletePlayer(playerId, true);
  }

  /**
   * Make the API call to create/update the user depending on wether
   * it already exists
   * callback to inform the reset of the application
   * @todo make to API call
   */
  savePlayer() {
    // todo create player remotely API call get ID returned by API
    const { teamId, playerId } = this.props.match.params;
    const { name, height } = this.state;
    if (playerId === 'create') {
      // todo create player remotely API call get ID returned by API
      const simulatedId = Math.floor(Math.random() * Math.floor(10000)).toString()
      const newPlayer = {
        name: name,
        height: height,
        uniqId: simulatedId,
        teamId: teamId,
      }
      this.props.createPlayer(newPlayer);
    } else {
      this.props.updatePlayer(playerId, {
        name: name,
        height: height,
      });
    }
  }

  /**
   * Modifies the state acccording to users modifications
   * @param {String} value
   * @param {String} key
   * @todo validate fields properly
   */
  handlePlayerEdit(value, key) {
    const updatedState = {};
    updatedState[key] = value;
    this.setState(updatedState);
  }

  /**
   * @todo create a custom form component and stylise it
   * @todo create a custom input that validates filds the way we need
   */
  render() {
    const { name, height } = this.state;
    const { styles } = this.props;
    return (
      <div {...css(styles.container)}>
        <Title label="Fiche du joueur" />
        <div>
          {name}
        </div>
        <div>
          {height}
        </div>
        <br />
        <form onSubmit={this.savePlayer}>
          <div>
            <label htmlFor="name">
              Nom complet :
              <input
                id="name"
                type="text"
                value={name}
                onChange={evt => this.handlePlayerEdit(evt.target.value, 'name')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="height">
              Taille (en cm):
              <input
                id="height"
                type="text"
                value={height}
                onChange={evt => this.handlePlayerEdit(evt.target.value, 'height')}
              />
            </label>
          </div>
          <input type="submit" value="Submit" {...css(styles.submitButton)} />
        </form>
        <br />
        <div {...css(styles.buttonsContainer)}>
          <Button label="Supprimer" onPress={this.deletePlayer} type="warning" />
          <Button label="Enregistrer" onPress={this.savePlayer} />
        </div>
      </div>
    );
  }
}

PlayerFile.propTypes = {
  fetchPlayerById: PropTypes.func.isRequired, // Used to fetch the user from parent state
  createPlayer: PropTypes.func.isRequired, // Callback to create the player
  updatePlayer: PropTypes.func.isRequired, // Callback to update the player
  deletePlayer: PropTypes.func.isRequired, // Callback to delete the player
  selectedPlayerCallback: PropTypes.func, // Callback to inform about the selected Player
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamId: PropTypes.node,
      playerId: PropTypes.node,
    }).isRequired,
  }).isRequired,
  location: PropTypes.string.isRequired,
};

PlayerFile.defaultProps = {
  selectedPlayerCallback: () => {},
};

export default withStyles(({ margin }) => ({
  container: {
    padding: `${margin.std} ${margin.L}`,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  submitButton: {
    display: 'none',
  },
}))(PlayerFile);
