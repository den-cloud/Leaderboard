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

const resetErrorMsgs = () => {
  document.querySelector('.name-warning').classList.add('display-none');
  document.querySelector('.score-warning').classList.add('display-none');
  document.querySelector('.minus-score-warning').classList.add('display-none');
};

document.querySelector('.refresh-btn').addEventListener('click', () => {
  renderScores();
});

document.querySelector('.submit-btn').addEventListener('click', async () => {
  resetErrorMsgs();

  const userData = document.querySelector('#name');
  const scoreData = document.querySelector('#score');

  if (userData.value === '' || scoreData.value === '' || scoreData.value < 0) {
    if (userData.value === '') {
      document.querySelector('.name-warning').classList.remove('display-none');
    }
    if (scoreData.value === '') {
      document.querySelector('.score-warning').classList.remove('display-none');
    }

    if (scoreData.value < 0) {
      document.querySelector('.minus-score-warning').classList.remove('display-none');
    }
    return;
  }

  await leaderboard.postScore(userData.value, scoreData.value);

  userData.value = '';
  scoreData.value = '';

  resetErrorMsgs();
});