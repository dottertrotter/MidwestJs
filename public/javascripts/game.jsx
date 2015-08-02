var timedRequest;

var Board = React.createClass({
  getBoard: function() {
    $.ajax({
      url: '/board',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('error retrieving board data')
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.getBoard();
    timedRequest = setInterval(this.getBoard, 2000);
  },
  render: function() {
    return (
      <div>
        <BoardSlots data={this.state.data} />
      </div>
    );
  }
});

var BoardSlots = React.createClass({
	render: function() {
		var slotNodes = this.props.data.map(function (slots, index) {
			return (
        <BoardSlot slotValue={slots} index={index} />
      );
    });

    return (
      <ul id="board-list">
        {slotNodes}
      </ul>
    );
	}
});

var BoardSlot = React.createClass({
	handleClick: function(event) {
		$.ajax({
      url: '/setMove',
      data: {
      	slotId: this.props.index,
      	playerId: PLAYERID
      },
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('worked');
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('failed');
      }.bind(this)
    });
	},
	render: function() {
		var displayText = "";

		switch(this.props.slotValue){
			case 1:
				displayText = "X";
			break;
			case 2:
				displayText = "O";
			break;
		}

		return (
      <li onClick={this.handleClick}>{displayText}</li>
    );
	}
});

var NewGame = React.createClass({
	handleClick: function(event) {
		$.ajax({
      url: '/newGame',
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('worked');
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('failed');
      }.bind(this)
    });
	},
	render: function() {
		return (
			<a href="#" className="new-game" onClick={this.handleClick}>New Game</a>
		);
	}
});

React.render(
	<div>
  	<Board />
  	<NewGame />
  </div>
  ,document.getElementById('example')
);
