const fs = require("fs");
const path = require("path");

const nodeModulesFiles = new Map();

function isNodeModulesImport(filePath, importPath) {
  if (nodeModulesFiles.size === 0) {
    const nodeModulesPaths = module.paths;
    nodeModulesPaths.forEach((nodeModulesPath) => {
      try {
        const files = fs.readdirSync(nodeModulesPath);
        nodeModulesFiles.set(nodeModulesPath, files);
      } catch (e) {}
    });
  }

  for (const [nodeModulesPath, files] of nodeModulesFiles.entries()) {
    for (const file of files) {
      const filePath = path.join(nodeModulesPath, file);
      const filePathStat = fs.statSync(filePath);
      console.log({ nodeModulesPath, file, filePath });

      if (filePathStat.isDirectory()) {
        console.log("dir");
      } else {
        console.log("file");
      }
    }
  }
}
isNodeModulesImport("index.js", "args");
module.exports = { isNodeModulesImport };
