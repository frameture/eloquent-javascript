var box = {
  locked: true,
  unlock: function() { this.locked = false; },
  lock: function() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

// the box always should be closed at the end - even during exceptions
function withBoxUnlocked(body) {
  try {
    if (box.locked)
      box.unlock();
    body();
  } catch (e) {
    console.log("Exception in withBoxUlocked() body", e);
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log(box.locked, "Expect true");