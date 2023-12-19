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
    const nodeModulesImportResolvedPath = path.resolve(nodeModulesPath, importPath);
    return (
      (fs.existsSync(importedFilePath) && importedFilePath.startsWith(nodeModulesPath)) ||
      (fs.existsSync(nodeModulesImportResolvedPath) && nodeModulesImportResolvedPath.includes("node_modules"))
    );
  });
}

module.exports = { isNodeModulesImport };
