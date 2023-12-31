const { isNodeModulesImport } = require(".");

describe("isNodeModulesImport", () => {
  describe("for a file inside project", () => {
    test("returns false for relative non node_modules import path", () => {
      expect(isNodeModulesImport(".", "./index.js")).toBe(false);
    });

    test("returns false for relative non node_modules import path", () => {
      expect(isNodeModulesImport(".", "./index.js")).toBe(false);
    });

    test("returns true for one-level node_modules import path", () => {
      expect(isNodeModulesImport(".", "prettier")).toBe(true);
    });

    test("returns false for one-level non-existent node_modules import path", () => {
      expect(isNodeModulesImport(".", "react")).toBe(false);
    });

    test("returns true for two-level node_modules import path", () => {
      expect(isNodeModulesImport(".", "prettier/plugins")).toBe(true);
    });

    test("returns true for relative node_modules import path", () => {
      expect(isNodeModulesImport(".", "./node_modules/prettier")).toBe(true);
    });

    test("returns true for absolute node_modules import path", () => {
      expect(isNodeModulesImport(".", `${__dirname}/node_modules/prettier`)).toBe(true);
    });

    test("returns false for absolute non node_modules import path", () => {
      expect(isNodeModulesImport(".", `${__dirname}/index.js`)).toBe(false);
    });
  });

  describe("for a file outside project", () => {
    test("returns false for project one-level node_modules import path", () => {
      expect(isNodeModulesImport("../index.js", "prettier")).toBe(false);
    });

    test("returns false for project two-level node_modules import path", () => {
      expect(isNodeModulesImport("../index.js", "prettier/plugins")).toBe(false);
    });

    test("returns false for project relative node_modules import path", () => {
      expect(isNodeModulesImport("../index.js", "./node_modules/prettier")).toBe(false);
    });

    test("returns false for project absolute non-existent node_modules import path", () => {
      expect(isNodeModulesImport("../index.js", `${__dirname}/node_modules/react`)).toBe(false);
    });

    test("returns true for relative node_modules import path", () => {
      expect(isNodeModulesImport("../index.js", "./is-node-modules-import/node_modules/prettier")).toBe(true);
    });

    test("returns true for absolute node_modules import path", () => {
      expect(isNodeModulesImport("../index.js", `${__dirname}/node_modules/prettier`)).toBe(true);
    });

    test("returns false for absolute non node_modules import path", () => {
      expect(isNodeModulesImport("../index.js", `${__dirname}/index.js`)).toBe(false);
    });
  });
});
