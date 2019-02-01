import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { css, withStyles } from '../../skeleton/ressources/with-styles';
import thesportdbQueryService from '../../skeleton/services/thesportdb-query.service';
import Player from './player';
import PlayerFile from './player-file';
import ListItem from '../../bricks/list-item';
import Title from '../../bricks/title';

/**
 * Display a list of all the players in the team (based on teamId)
 * The ranking is based on how tall is the player
 */
class Team extends Component {
  /**
   * Parse the answer from the API and extract the data we need
   * sort the players based on theire height
   * @param {Object} data answer from the API
   * @returns {Array} the array of players sorted
   */
  static parseAPIData(data) {
    const players = data.player.map(player => (
      Team.parsePlayer({
        name: player.strPlayer,
        height: player.strHeight,
        uniqId: player.idPlayer,
        teamId: player.idTeam,
      })
    ));
    Team.sortPlayers(players);
    return players;
  }

  /**
   * sort the players based on theire height
   * @param {Array} players
   */
  static sortPlayers(players) {
    players.sort((playerA, playerB) => (playerA.height > playerB.height ? 1 : -1));
  }

  /**
   * parse the player fields
   * @param {Object} player
   * @return {Object} the parsed player
   */
  static parsePlayer(player) {
    const playerHeightString = player.height.toString(); // ensure we have a String
    return {
      name: player.name,
      height: parseInt(playerHeightString.replace('.', ''), 10),
      uniqId: player.uniqId,
      teamId: player.teamId,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
    this.fetchPlayerById = this.fetchPlayerById.bind(this);
    this.createPlayer = this.createPlayer.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
    this.deletePlayer = this.deletePlayer.bind(this);
    this.selectedPlayerCallback = this.selectedPlayerCallback.bind(this);
  }

  /** fetch players list by interrogating the API with teamID */
  componentWillMount() {
    const { match: { params: { teamId } } } = this.props;
    thesportdbQueryService.query({
      url: `lookup_all_players.php?id=${teamId}`,
    }).then((response) => {
      this.setState({
        players: Team.parseAPIData(response),
      });
    });
  }

  /**
   * Fetch a player in local state by its uniq id
   * Same as fetching it from API but faster
   * @param {String} playerId
   * @returns {Object} the found Player
   */
  fetchPlayerById(playerId) {
    const { players } = this.state;
    let playerResult;
    players.forEach((player) => {
      if (player.uniqId === playerId) {
        playerResult = player;
      }
    });
    return playerResult;
  }

  /**
   * Parse the incomming playerData
   * Updates the array of players and sort them once again
   * @param {String} playerId
   * @param {Object} playerData containing only data handled by playerFile
   */
  updatePlayer(playerId, playerData) {
    const { players } = this.state;
    const newPlayers = [];
    players.forEach((player) => {
      if (player.uniqId !== playerId) {
        newPlayers.push(player);
      } else {
        const newPlayer = Object.assign({}, player);
        newPlayer.name = playerData.name;
        newPlayer.height = playerData.height;
        newPlayers.push(Team.parsePlayer(newPlayer));
      }
    });
    Team.sortPlayers(newPlayers);
    this.setState({ players: newPlayers });
  }

  /**
   * removes the player locally from our players
   * then if we are deleting the current player, navigate to the
   * next player in the list
   * @param {String} playerId // id of the player to remove
   * @param {Boolean} isCurrentPlayer // tels if we neeed to navigate to next player
   */
  deletePlayer(playerId, isCurrentPlayer) {
    const { players } = this.state;
    const newPlayers = [];
    let playerIndex;
    players.forEach((player, index) => {
      if (player.uniqId !== playerId) {
        newPlayers.push(player);
      } else {
        playerIndex = index;
      }
    });
    this.setState({ players: newPlayers });
    // navigate to next player in list if needed
    if (isCurrentPlayer) {
      const { match: { params: { teamId } }, history } = this.props;
      const newPlayer = playerIndex < newPlayers.length
        ? newPlayers[playerIndex] : newPlayers[newPlayers.length - 1];
      history.push(`/team/${teamId}/${newPlayer.uniqId}`);
    }
  }

  /**
   * Parse the new player, add it to the players list
   * sort the list once again
   * navigate to the new player
   * @param {Object} player the newly created player with it's ID
   */
  createPlayer(player) {
    const { match: { params: { teamId } }, history } = this.props;
    const { players } = this.state;
    const newPlayers = [Team.parsePlayer(player)].concat(players);
    Team.sortPlayers(newPlayers);
    this.setState({ players: newPlayers });
    history.push(`/team/${teamId}/${player.uniqId}`);
  }

  /**
   * Stores the selected playerId in the state
   * usefull to display the selected plyer in the list
   * @param {String} playerId
   */
  selectedPlayerCallback(playerId) {
    this.setState({ selectedPlayerId: playerId });
  }

  render() {
    const { players, selectedPlayerId } = this.state;
    const { styles } = this.props;
    const { match: { params: { teamId } } } = this.props;
    // display a not found message if the list of players is empty
    if (players === undefined || players.length === 0) {
      return (
        <div>
          No player found
        </div>
      );
    }

    const playersVue = players.map(player => (
      <Player
        key={player.uniqId}
        name={player.name}
        height={player.height}
        id={player.uniqId}
        teamId={player.teamId}
        selectedPlayerId={selectedPlayerId}
      />
    ));
    return (
      <div {...css(styles.container)}>
        <div {...css(styles.list)}>
          <Title label="Liste des joueurs" />
          <ListItem
            labels={['Nom complet', 'taille (en cm)']}
            type="header"
          />
          <ListItem
            labels={['Ajouter un joueur']}
            type="button"
            link={`/team/${teamId}/create`}
          />
          {playersVue}
        </div>
        <div {...css(styles.detailsPage)}>
          <Route
            path="/team/:teamId/:playerId"
            render={
              props => (
                <PlayerFile
                  {...props}
                  fetchPlayerById={this.fetchPlayerById}
                  createPlayer={this.createPlayer}
                  updatePlayer={this.updatePlayer}
                  deletePlayer={this.deletePlayer}
                  selectedPlayerCallback={this.selectedPlayerCallback}
                />
              )
            }
          />
        </div>
      </div>
    );
  }
}

Team.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamId: PropTypes.node,
    }).isRequired,
  }).isRequired,
  styles: PropTypes.object.isRequired,
};

export default withStyles(() => ({
  container: {
    display: 'flex',
  },
  list: {
    flex: '0 0 50%',
  },
  detailsPage: {
    flex: '0 0 50%',
    boxSizing: 'border-box',
  },
}))(Team);
