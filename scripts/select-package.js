#!/usr/bin/env node

const { execSync } = require("child_process");
const { default: inquirer } = require("inquirer");
const fs = require("fs");
const path = require("path");

const command = process.argv[3];

if (!command) {
  console.error("Please specify a command (e.g., build, dev, lint).");
  process.exit(1);
}

// Dynamically get package names from the "packages" directory
const packagesDir = path.resolve(__dirname, "../packages");
const packages = fs.readdirSync(packagesDir).filter((dir) => {
  const packagePath = path.join(packagesDir, dir, "package.json");
  return fs.existsSync(packagePath);
});

(async () => {
  const { selectedPackage } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedPackage",
      message: `Which package would you like to ${command}?`,
      choices: packages,
    },
  ]);

  console.log(`Running ${command} for ${selectedPackage}...`);

  try {
    execSync(`pnpm --filter ${selectedPackage} run ${command}`, {
      stdio: "inherit",
    });
  } catch (error) {
    console.error(`Failed to run ${command} for ${selectedPackage}`);
    process.exit(1);
  }
})();
