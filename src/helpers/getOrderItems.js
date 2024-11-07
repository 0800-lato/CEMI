module.exports = (array = []) => array.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase()
      ? 1
      : a.name.toLowerCase() < b.name.toLowerCase()
      ? -1
      : 0
  );