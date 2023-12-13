const fs = require("fs");
const path = require("path");

function isNodeModulesImport(filePath, importPath) {
  const fileDirname = path.dirname(filePath);
  const importedFilePath = path.resolve(fileDirname, importPath);

  const nodeModulesPaths = module.paths.filter((nodeModulePath) => {
    return path.dirname(importedFilePath).startsWith(path.dirname(nodeModulePath));
  });
  return nodeModulesPaths.some((nodeModulesPath) => {
    return fs.existsSync(path.resolve(nodeModulesPath, importPath));
  });
}

module.exports = { isNodeModulesImport };
