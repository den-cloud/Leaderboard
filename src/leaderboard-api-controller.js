let id = null;

const createGame = () => fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
  method: 'POST',
  body: JSON.stringify({
    name: 'my Shahier Game',
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    [, , , id] = json.result.split(' ');
  });

const getScores = () => fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores/`)
  .then((response) => response.json());

const postScore = (userData, scoreData) => fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores/`, {
  method: 'POST',
  body: JSON.stringify({
    user: userData,
    score: scoreData,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json());

export default { createGame, getScores, postScore };