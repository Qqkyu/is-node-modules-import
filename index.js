const fs = require("fs");
const path = require("path");

function isNodeModulesImport(filePath, importPath, pathAliases) {
  const normalizedImportPath = path.normalize(pathAliases ? substitutePathAlias(importPath, pathAliases) : importPath);

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

function substitutePathAlias(importPath, pathAliases) {
  for (const alias in pathAliases) {
    const path = pathAliases[alias];
    if (importPath.startsWith(alias)) {
      return importPath.replace(alias, path);
    }
  }
  return importPath;
}

module.exports = { isNodeModulesImport };
