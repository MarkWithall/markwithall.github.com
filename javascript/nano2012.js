google.load("visualization", "1", { packages: ["corechart"] });

google.setOnLoadCallback(drawGraph);

function drawGraph() {
    // Create camper data table structure
    var nanoData = new google.visualization.DataTable();

    nanoData.addColumn('string', 'Day');
    nanoData.addColumn('number', 'Words');
    nanoData.addColumn('number', 'Par');

    // Populate camper data table
    var rawNanoData = [
        2532,4005,6013,8342,10351,12022,13697,15507,17214,20001,
        22003,23699,25607,27275,29370,31506,33360,36455,38466,40505,
        42179,45683,47361,49036,50703,52373,53297,53297,53297,53297
    ];

    var parData = [
        1666,3333,5000,6666,8333,10000,11666,13333,15000,16666,
        18333,20000,21666,23333,25000,26666,28333,30000,31666,33333,
        35000,36666,38333,40000,41666,43333,45000,46666,48333,50000
    ];

    // Add first days for which we already have data
    for (var i=0; i < rawNanoData.length; i++) {
        nanoData.addRow([ 'Day ' + (i+1), rawNanoData[i], parData[i] ]);
    }

    // Initialize combo chart
    var nanoChart = new google.visualization.ComboChart($('#words_by_day_graph')[0]);

    nanoChart.draw(nanoData, {
        title: 'Words By Day',

        width:  400,
        height: 400,

        backgroundColor: '#FFFFFF',

        chartArea: {
            left: 100,
            top: 10,
            width: "70%",
            height:"70%"
        },

        vAxis: {
            title: 'Words',
            minValue: 0,
            maxValue: 50000
        },

        series: {
            0: { type: 'bars' },
            1: { type: 'line' }
        },

        colors: ['#674732', '#BCBCBC'],

        legend: 'none',

        pointSize: 2
    });
}
