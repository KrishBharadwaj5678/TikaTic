let currentPlayer = "X";
let arr = Array(9).fill(null);

let checkWinner = (cp) => {
  if (arr[0] !== null && arr[0] == arr[1] && arr[1] == arr[2] ||
      arr[3] !== null && arr[3] == arr[4] && arr[4] == arr[5] ||
      arr[6] !== null && arr[6] == arr[7] && arr[7] == arr[8] ||
      arr[0] !== null && arr[0] == arr[3] && arr[3] == arr[6] ||
      arr[1] !== null && arr[1] == arr[4] && arr[4] == arr[7] ||
      arr[2] !== null && arr[2] == arr[5] && arr[5] == arr[8] ||
      arr[0] !== null && arr[0] == arr[4] && arr[4] == arr[8] ||
      arr[2] !== null && arr[2] == arr[4] && arr[4] == arr[6]) {
    document.getElementById("winner").innerText = `Winner: ${cp}`;
    document.getElementById("winner").classList.remove("hidden");
    gsap.to("#grid", { scale: 1.1, duration: 0.5, yoyo: true, repeat: 1 });
    confetti();
    return;
  }
  if (!arr.some((e) => e === null)) {
    document.getElementById("winner").innerText = "It's a draw!";
    document.getElementById("winner").classList.remove("hidden");
  }
};

let handleClick = (el) => {
  let id = Number(el.id);
  if (arr[id] !== null) return;
  arr[id] = currentPlayer;
  el.innerText = currentPlayer;
  el.classList.add("text-yellow-400", "glow");
  gsap.fromTo(el, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });
  checkWinner(currentPlayer);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

function resetGame() {
  gsap.to("#grid", { scale: 0.5, opacity: 0, duration: 0.5, onComplete: () => {
    arr.fill(null);
    document.querySelectorAll(".col").forEach(el => {
      el.innerText = "";
      el.classList.remove("text-yellow-400", "glow");
    });
    document.getElementById("winner").classList.add("hidden");
    currentPlayer = "X";
    gsap.to("#grid", { scale: 1, opacity: 1, duration: 0.5 });
  }});
}
