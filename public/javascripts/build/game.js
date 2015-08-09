var timedRequest;

var Board = React.createClass({displayName: "Board",
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
      React.createElement("div", null, 
        React.createElement(BoardSlots, {data: this.state.data})
      )
    );
  }
});

var BoardSlots = React.createClass({displayName: "BoardSlots",
	render: function() {
		var slotNodes = this.props.data.map(function (slots, index) {
			return (
        React.createElement(BoardSlot, {slotValue: slots, index: index})
      );
    });

    return (
      React.createElement("ul", {id: "board-list"}, 
        slotNodes
      )
    );
	}
});

var BoardSlot = React.createClass({displayName: "BoardSlot",
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
      React.createElement("li", {onClick: this.handleClick}, displayText)
    );
	}
});

var NewGame = React.createClass({displayName: "NewGame",
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
			React.createElement("a", {href: "#", className: "new-game", onClick: this.handleClick}, "New Game")
		);
	}
});

React.render(
	React.createElement("div", null, 
  	React.createElement(Board, null), 
  	React.createElement(NewGame, null)
  )
  ,document.getElementById('example')
);
