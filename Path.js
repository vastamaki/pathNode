function Path(path, separator) {
  this.currentPath = path || "/";
  this.separator = separator || "/";

  if (!(this instanceof Path)) {
    return new Path(path, separator);
  }
}

Path.prototype.getCurrentPath = function getCurrentPath() {
  return this.currentPath;
};

Path.prototype.cd = function cd(path) {
  if (path.startsWith(this.separator)) {
    this.currentPath = path;
  } else if (!path.includes(this.separator)) {
    this.currentPath = `${this.currentPath}/${path}`;
  } else {
    let current_path = this.currentPath.split(this.separator);
    const requested_path = path.split(this.separator);
    requested_path.forEach((rec) => {
      if (rec === "..") {
        current_path.splice(-1);
      } else {
        current_path.push(rec);
      }
    });
    this.currentPath = current_path.join("/");
  }
};

module.exports = Path;
