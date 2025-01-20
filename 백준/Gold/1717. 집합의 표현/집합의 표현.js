/**
 * 어렵다...
 *
 * 우선 유니온 파인드에 대해 알아둬야될게..
 *
 * 우리는 특정 원소가 같은 집합에 있는지 찾고(find).. 특정 원소가 들어있는 집합을 합쳐야(union)됩니다..
 *
 * 먼저 모든 원소는 자기 자신을 부모로 가지고 있으니 parent 배열을 초기화해봅시다..
 * 이후에 rank 배열을 통해 트리의 높이를 판단해 높이가 낮은 트리를 높은 트리에 붙일 겁니다..
 *
 * 예를 들어 (0, 1, 3)이 입력으로 주어지면,, find(1), find(3)을 수행해 대표 노드를 찾을 건데요.
 * 처음엔 서로 자신이 대표 노드니까.. 1, 3이 반환되고, 당연히 트리의 높이도 동일하게 1이겠죠..?
 *
 * 그럼 임의로 3을 1에 붙여버립니다.. 그럼 parent 배열은 [0, 1, 2, 3]에서 [0, 1, 2, 1]로 변경되어 3의 대표 노드가 1로
 * { 1, 3 }이 같은 집합에 있다는 것을 알 수 있게됩니다.. 여기서 rank[1]은 2로 높이가 2가 되겠죠..?
 *
 * 이후에 (0, 3, 2)가 입력으로 주어지면, find(3) = 1, find(2) = 2로 3의 대표 노드는 1이고 rank[1] = 2로 높이가 더 높죠..?
 * 그럼 또 parent[2] = 1로 변경되며, parent = [0, 1, 1, 1]로 모두 대표 노드 1을 가리키며, { 1, 2, 3 }은 같은 집합인 것을 알 수 있겠죠..?
 */

const input = [];

require("readline")
  .createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  .on("line", (line) => {
    input.push(line);
  })
  .on("close", () => {
    solution();
    process.exit();
  });

function solution() {
  const [n, m] = input[0].split(" ").map(Number);

  const parent = Array.from({ length: n + 1 }, (_, i) => i);
  const rank = Array(n + 1).fill(1);

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }

    return parent[x];
  }

  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA === rootB) return;

    if (rank[rootA] > rank[rootB]) {
      parent[rootB] = rootA;
    } else if (rank[rootA] < rank[rootB]) {
      parent[rootA] = rootB;
    } else {
      parent[rootB] = rootA;
      rank[rootA]++;
    }
  }

  const result = [];
  for (let i = 1; i <= m; i++) {
    const [command, a, b] = input[i].split(" ").map(Number);

    if (command === 0) {
      union(a, b);
    } else {
      result.push(find(a) === find(b) ? "YES" : "NO");
    }
  }

  console.log(result.join("\n"));
}
