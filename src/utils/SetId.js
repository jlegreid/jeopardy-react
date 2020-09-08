// Sets a unique id for each game cell

let lastId = 0;

function setId() {
  lastId = lastId + 1;
  return lastId;
}

function resetId() {
  lastId = 0;
  return lastId;
}

export { setId, resetId, lastId };
