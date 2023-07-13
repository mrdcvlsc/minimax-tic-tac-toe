# **MiniMax Tic-Tac-Toe**

![tests](https://github.com/mrdcvlsc/minimax-tic-tac-toe/actions/workflows/tests.yml/badge.svg)
![linter](https://github.com/mrdcvlsc/minimax-tic-tac-toe/actions/workflows/linter.yml/badge.svg)

A simple project demonstrating my **naive** implementation of the [**minimax**](https://en.wikipedia.org/wiki/Minimax#Pseudocode) algorithm for a tic-tac-toe board with dimensions N x N. It includes a straightforward web application game of tic-tac-toe, allowing you to observe the minimax algorithm in action.

### Test it over the internet :

If you have an internet connection, you can try out my Tic-Tac-Toe web application that showcases my implementation of the minimax-tic-tac-toe algorithm. Here are the links where you can access and test it.

- [Click here to view the DEMO](https://minimax-tic-tac-toe-demo.vercel.app/)
- **Demo raw link** - https://minimax-tic-tac-toe-demo.vercel.app/

### Run it locally :

You can also run the aforementioned Tic-Tac-Toe web application locally on your device. To do so, you will need to have Git and Node installed as prerequisites. Once you have them installed, simply enter the following commands in your terminal:

```shell
git clone https://github.com/mrdcvlsc/minimax-tic-tac-toe.git
cd minimax-tic-tac-toe
npm install
node dev
```

Then open `localhost:3000` in your browser.

### Example search tree of the minimax algorithm

The minimax algorithm is a backtraking (DFS) searching algorithm. It determines the best move by recursively evaluating possible moves. The three important functions are:

1. **minimax**: Recursively evaluates game states by alternating between maximizing and minimizing players. Returns the best score found at each level.

2. **evaluation**: Assigns a numerical score to a game state based on factors like material advantage and positioning. Guides the algorithm towards favorable positions.

3. **moveGeneration**: Generates all possible legal moves from a given game state, allowing exploration of different possibilities.

The algorithm guarantees an optimal solution, assuming both players play optimally. However, it can be computationally expensive in large state spaces, leading to more efficient algorithms like alpha-beta pruning and/or adding depth limitations to the recursive minimax function.

```mermaid
graph TB
  Description["Maximizing nodes will choose the child node that have the highest value.\nMinimizing nodes will choose the child node that have the lowest value."]

  Evaluation["if player 'X' wins: eval = 1\nif player 'O' wins: eval = -1\nelse: eval = 0"]
```

```mermaid
graph LR
  subgraph "depth = 3"
    P1["Maximizing (X)"]

    A["X #nbsp; #nbsp; #nbsp; #nbsp; X\n #nbsp; #nbsp; #nbsp; X #nbsp; O\nO #nbsp; #nbsp; #nbsp; #nbsp; O"]

  end

  subgraph "depth = 2"
    P2["Minimizing (O)"]
    subgraph "score = depth * eval = 2"
      B["X #nbsp; X #nbsp; X \n #nbsp; #nbsp; #nbsp; X #nbsp; O\nO #nbsp; #nbsp; #nbsp; #nbsp; O"]
    end
    C["X #nbsp; #nbsp; #nbsp; #nbsp; X\nX #nbsp; X #nbsp; O\nO #nbsp; #nbsp;#nbsp; #nbsp; O"]
    D["X #nbsp; #nbsp; #nbsp; #nbsp; X\n #nbsp; #nbsp; #nbsp; X #nbsp; O\nO #nbsp; X #nbsp; O"]
  end

  subgraph "depth = 1"
    P3["Maximizing (X)"]
    E["X #nbsp; O #nbsp; X\nX #nbsp; X #nbsp; O\nO #nbsp; #nbsp;#nbsp; #nbsp; O"]

    subgraph "score = depth * eval = -1"
      F["X #nbsp; #nbsp; #nbsp; #nbsp; X\nX #nbsp; X #nbsp; O\nO #nbsp; O #nbsp; O"]
    end
    G["X #nbsp; #nbsp; #nbsp; #nbsp; X\nO #nbsp; X #nbsp; O\nO #nbsp; X #nbsp; O"]
    H["X #nbsp; O #nbsp; X\n #nbsp; #nbsp; #nbsp; X #nbsp; O\nO #nbsp; X #nbsp; O"]
  end

  subgraph "depth = 0 + 1 since last depth"
    P4["Maximizing (O)"]
    subgraph "score = depth * eval = 0"
      I["X #nbsp; O #nbsp; X\nX #nbsp; X #nbsp; O\nO #nbsp; X #nbsp; O"]
    end
    subgraph "score = depth * eval = 1"
      J["X #nbsp; X #nbsp; X\nO #nbsp; X #nbsp; O\nO #nbsp; X #nbsp; O"]
    end
    subgraph "score = depth * eval = 0"
      K["X #nbsp; O #nbsp; X\nX #nbsp; X #nbsp; O\nO #nbsp; X #nbsp; O"]
    end
  end

  A <-- 2 --> B
  A <-. "(-1)" .-> C
  A <-. 0 .-> D

  C <-. "0" .-> E
  C <-- "(-1)" --> F
  D <-. 1 .-> G
  D <-- 0 --> H

  E <-- 0 --> I
  G <-- 1 --> J
  H <-- 0 --> K
```

```mermaid
graph TB
  Description["Terminal/leaf nodes are the only ones that are evaluated.\nTerminal/leaf nodes are nodes that don't have a child due to the following reasons:\n- There is no possible moves left\n- A player already won\n- The max depth was reached)"]
```
