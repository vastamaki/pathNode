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
  // Check if path contains only English alphabets, if not, throw error
  const cleaned_path = path.replaceAll(".", "").replaceAll(this.separator, "");
  if (/[^a-zA-Z]/.test(cleaned_path)) {
    throw new Error("Path contains invalid characters");
  }
  if (path.startsWith(this.separator)) {
    this.currentPath = path;
  } else if (!path.includes(this.separator)) {
    this.currentPath = `${this.currentPath}${this.separator}${path}`;
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

  if (this.currentPath.endsWith("/")) {
    this.currentPath = this.currentPath.slice(0, -1);
  }
};

module.exports = Path;
