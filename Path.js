function Path(path, separator) {
  if (!(this instanceof Path)) {
    return new Path(path, separator);
  }
};


Path.prototype.getCurrentPath = function getCurrentPath() {
  return this.currentPath;
}

module.exports = Path;