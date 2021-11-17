import './style.css';
import leaderboard from './leaderboard-api-controller';

const renderScores = async () => {
  let scores = await leaderboard.getScores();
  scores = scores.result;
  const scoresUL = document.querySelector('.scores');
  scoresUL.innerHTML = '';
  for (let i = 0; i < scores.length; i += 1) {
    const li = `<li>${scores[i].user}: ${scores[i].score}</li>`;
    scoresUL.innerHTML += li;
  }
};

const creatGame = async () => {
  await leaderboard.createGame();
  renderScores();
};

creatGame();

document.querySelector('.refresh-btn').addEventListener('click', () => {
  renderScores();
});

document.querySelector('.submit-btn').addEventListener('click', async () => {
  const userData = document.querySelector('#name');
  const scoreData = document.querySelector('#score');

  if (userData === '' || scoreData === '') {
    return;
  }

  await leaderboard.postScore(userData.value, scoreData.value);

  userData.value = '';
  scoreData.value = '';
});