import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id = "Search">
        <input
          type="text"
          id="spotifySearch"
          name="search"
          value={this.props.search}
          onChange={this.props.searchUpdate}
          placeholder="Search"
          autoComplete="off"
        />
        <select id="spotifyType" onChange={this.props.typeUpdate}>
          <option value="album">Album</option>
          <option value="artist">Artist</option>
          <option value="playlist">Playlist</option>
        </select>
        <button id="searchButton"  type="button" onClick={this.props.searchFunc}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;