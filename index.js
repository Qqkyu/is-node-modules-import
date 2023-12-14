const fs = require("fs");
const path = require("path");

function isNodeModulesImport(filePath, importPath) {
  const normalizedImportPath = path.normalize(importPath);

  const fileDirname = path.dirname(filePath);
  const importedFilePath = path.resolve(fileDirname, normalizedImportPath);

  const nodeModulesPaths = module.paths.filter((nodeModulePath) => {
    return path.dirname(importedFilePath).startsWith(path.dirname(nodeModulePath));
  });

  return nodeModulesPaths.some((nodeModulesPath) => {
    return (
      (fs.existsSync(importedFilePath) && importedFilePath.startsWith(nodeModulesPath)) ||
      fs.existsSync(path.resolve(nodeModulesPath, importPath))
    );
  });
}

module.exports = { isNodeModulesImport };
