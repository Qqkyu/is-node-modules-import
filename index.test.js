const { isNodeModulesImport } = require(".");

describe("isNodeModulesImport", () => {
  test("returns false for relative non node_modules import path", () => {
    expect(isNodeModulesImport(".", "./index.js")).toBe(false);
  });

  test("returns false for absolute non node_modules import path", () => {
    expect(isNodeModulesImport(".", "./index.js")).toBe(false);
  });

  test("returns true for one-level node_modules import path", () => {
    expect(isNodeModulesImport(".", "prettier")).toBe(true);
  });

  test("returns true for two-level node_modules import path", () => {
    expect(isNodeModulesImport(".", "prettier/plugins")).toBe(true);
  });

  test("returns true for relative node_modules import path", () => {
    expect(isNodeModulesImport(".", "./node_modules/prettier")).toBe(true);
  });
});
