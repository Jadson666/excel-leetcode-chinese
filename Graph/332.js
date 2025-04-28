const input = [
  [
    ['MUC', 'LHR'],
    ['JFK', 'MUC'],
    ['SFO', 'SJC'],
    ['LHR', 'SFO']
  ],
  [
    ['JFK', 'SFO'],
    ['JFK', 'ATL'],
    ['SFO', 'ATL'],
    ['ATL', 'JFK'],
    ['ATL', 'SFO']
  ],
  [
    ['JFK', 'SFO'],
    ['JFK', 'ATL'],
    ['SFO', 'JFK'],
    ['ATL', 'AAA'],
    ['AAA', 'ATL'],
    ['ATL', 'BBB'],
    ['BBB', 'ATL'],
    ['ATL', 'CCC'],
    ['CCC', 'ATL'],
    ['ATL', 'DDD'],
    ['DDD', 'ATL'],
    ['ATL', 'EEE'],
    ['EEE', 'ATL'],
    ['ATL', 'FFF'],
    ['FFF', 'ATL'],
    ['ATL', 'GGG'],
    ['GGG', 'ATL'],
    ['ATL', 'HHH'],
    ['HHH', 'ATL'],
    ['ATL', 'III'],
    ['III', 'ATL'],
    ['ATL', 'JJJ'],
    ['JJJ', 'ATL'],
    ['ATL', 'KKK'],
    ['KKK', 'ATL'],
    ['ATL', 'LLL'],
    ['LLL', 'ATL'],
    ['ATL', 'MMM'],
    ['MMM', 'ATL'],
    ['ATL', 'NNN'],
    ['NNN', 'ATL']
  ]
];
const expected = [
  ['JFK', 'MUC', 'LHR', 'SFO', 'SJC'],
  ['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO'],
  [
    'JFK',
    'SFO',
    'JFK',
    'ATL',
    'AAA',
    'ATL',
    'BBB',
    'ATL',
    'CCC',
    'ATL',
    'DDD',
    'ATL',
    'EEE',
    'ATL',
    'FFF',
    'ATL',
    'GGG',
    'ATL',
    'HHH',
    'ATL',
    'III',
    'ATL',
    'JJJ',
    'ATL',
    'KKK',
    'ATL',
    'LLL',
    'ATL',
    'MMM',
    'ATL',
    'NNN',
    'ATL'
  ]
];
function test1() {
  input.forEach((item, index) => {
    let t1 = performance.now();
    const result = findItinerary(item);
    let t2 = performance.now();
    console.log(`${t1} - ${t2} = cost ${t2 - t1} ms`);
    console.assert(JSON.stringify(result) === JSON.stringify(expected[index]), `1. Test case ${index + 1} failed`);
  });
}

function test2() {
  input.forEach((item, index) => {
    let t1 = performance.now();
    const result = findItinerary2(item);
    let t2 = performance.now();
    console.log(`${t1} - ${t2} = cost ${t2 - t1} ms`);
    console.assert(JSON.stringify(result) === JSON.stringify(expected[index]), `2. Test case ${index + 1} failed`);
  });
}
function test() {
  test2()
  // test1();
}

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
  tickets.sort();
  const edges = tickets.reduce((acc, cur) => {
    const [from, to] = cur;
    if (!acc[from]) acc[from] = {};
    if (acc[from][to] === undefined) acc[from][to] = 1;
    return acc;
  }, {});
  const path = ['JFK'];
  const backtrack = (cur) => {
    if (path.length < 10) console.log(path,cur)
    if (path.length === tickets.length + 1) {
      return true;
    }
    for (const to in edges[cur]) {
      if (edges[cur][to] > 0) {
        edges[cur][to]--;
        path.push(to);
        if (backtrack(to)) {
          return true;
        }
        path.pop();
        edges[cur][to]++;
      }
    }
    return false;
  };
  backtrack('JFK');
  return path;
};

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary2 = function (tickets) {
  tickets.sort();
  const edges = tickets.reduce((acc, cur) => {
    const [from, to] = cur;
    if (!acc[from]) acc[from] = [];
    acc[from].push(to);
    return acc;
  }, {});
  const itinerary = [];
  function backtrack(airport) {
    while (edges[airport]?.length > 0) {
      backtrack(edges[airport].shift());
    }
    itinerary.push(airport);
  }
  backtrack('JFK');
  return itinerary.reverse();
};

test();

// console.log(findItinerary2(input[2]));
