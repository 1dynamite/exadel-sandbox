const files = [];

function getFileById(id) {
  return files.find((file) => file.id === id);
}

module.exports = {
  getFileById,
};
