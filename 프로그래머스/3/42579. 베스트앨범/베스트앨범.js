/**
 * 문제가 너무 길어서 읽기 싫습니다.
 * 그냥 예제만 보려고 했는데 이해 못해서 결국 읽었습니다.
 * 
 1. 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
 2. 모든 장르는 재생된 횟수가 다릅니다.
 3. 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
 4. 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.
 5. 장르 별로 가장 많이 재생된 노래를 최대 두 개까지 모아 베스트 앨범을 출시하므로 2번 노래는 수록되지 않습니다.
 */

function solution(genres, plays) {
  // 먼저 장르의 카운트 횟수를 기록해봅시다..
  const genresMap = new Map();

  // 저는 이상하게 forEach보다 for문이 더 보기 좋습니다.
  for (let i = 0; i < genres.length; i++) {
    if (genresMap.has(genres[i])) {
      const prev = genresMap.get(genres[i]);
      const obj = { idx: i, play: plays[i] };

      prev.numOfPlays.push(obj);

      genresMap.set(genres[i], {
        cnt: prev.cnt + plays[i],
        numOfPlays: prev.numOfPlays,
      });
    } else {
      genresMap.set(genres[i], {
        cnt: plays[i],
        numOfPlays: [{ idx: i, play: plays[i] }],
      });
    }
  }

  const processedGenres = [];

  for (const [_, genre] of genresMap) {
    if (genre.numOfPlays.length >= 2) {
      genre.numOfPlays.sort((a, b) => b.play - a.play || a.idx - b.idx);

      const plays = [genre.numOfPlays[0].idx, genre.numOfPlays[1].idx];

      processedGenres.push({
        cnt: genre.cnt,
        plays,
      });
    } else {
      processedGenres.push({
        cnt: genre.cnt,
        plays: [genre.numOfPlays[0].idx],
      });
    }
  }

  processedGenres.sort((a, b) => b.cnt - a.cnt);

  const ans = [];

  for (let i = 0; i < processedGenres.length; i++) {
    ans.push(...processedGenres[i].plays);
  }

  return ans;
}

const solution_genres = ["classic", "pop", "classic", "classic", "pop", "gayo"];
const solution_plays = [500, 600, 150, 800, 2500, 9999];

const result = solution(solution_genres, solution_plays);

console.log(result);

