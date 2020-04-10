var datetime_options = {
  // weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};

// Transform and get json from abc.def/ghi/view --> abc.def/ghi
Plotly.d3.json( window.location.href.split( "/view", 1 )[ 0 ], function ( err, data ) {
  datetimes = data.map( element => new Date( element[ "time" ] ).toLocaleDateString( "en-GB", datetime_options ) );

  function unpack( input, key ) {
    return input.map( element => element[ key ] )
  }

  function unmeme_dates( input ) {
    return input.map( element => new Date( element[ "time" ] ).toLocaleDateString( "en-GB", datetime_options ) )
  }

  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: data[ 0 ].name + " buy price",
    // x: unpack( data, "time" ),
    // x: unmeme_dates( data ),
    x: datetimes,
    y: unpack( data, "buy_average" ),
    line: {
      color: '#ffb554'
    },
    yaxis: 'y1',
  }

  var trace2 = {
    type: "scatter",
    mode: "lines",
    name: data[ 0 ].name + " sell price",
    // x: unpack( data, "time" ),
    // x: unmeme_dates( data ),
    x: datetimes,
    y: unpack( data, "sell_average" ),
    line: {
      color: '#fe5e51'
    },
    yaxis: 'y1',
  }

  var trace3 = {
    type: "bar",
    // mode: "lines",
    name: data[ 0 ].name + " buy quantity",
    // x: unpack( data, "time" ),
    // x: unmeme_dates( data ),
    x: datetimes,
    y: unpack( data, "buy_quantity" ),
    marker: {
      color: '#9e3d64'
    },
    yaxis: 'y2',
  }

  var trace4 = {
    type: "bar",
    // mode: "lines",
    name: data[ 0 ].name + " sell quantity",
    // x: unpack( data, "time" ),
    // x: unmeme_dates( data ),
    x: datetimes,
    y: unpack( data, "sell_quantity" ),
    marker: {
      color: '#36abb5'
    },
    yaxis: 'y2',
  }

  var graph_traces = [ trace1, trace2, trace3, trace4 ];

  var layout = {
    title: {
      text: data[ 0 ].name,
    },
    xaxis: {
      tickmode: 'linear',
      tick0: 0,
      dtick: 36,
      autorange: true,
      automargin: true,
      rangeslider: {},
    },
    yaxis: {
      autorange: true,
      automargin: true,
      side: 'left',
      overlaying: 'y2',
    },
    yaxis2: {
      autorange: true,
      automargin: true,
      side: 'right',
    }
  };

  var config = {
    responsive: true
  };
  Plotly.newPlot( 'plotly', graph_traces, layout, config );
} )