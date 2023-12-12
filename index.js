const fs = require("fs");
const path = require("path");

function isNodeModulesImport(filePath, importPath) {
  const fileDirname = path.dirname(filePath);
  const importedFilePath = path.resolve(fileDirname, importPath);

  const nodeModulesPaths = module.paths;
  return nodeModulesPaths.some((nodeModulesPath) => {
    return importedFilePath.startsWith(nodeModulesPath) || fs.existsSync(path.resolve(nodeModulesPath, importPath));
  });
}

module.exports = { isNodeModulesImport };
