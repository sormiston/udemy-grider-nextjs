#!/usr/bin/env node

const { execSync } = require("child_process");
const { default: inquirer } = require("inquirer");

const command = process.argv[3];

if (!command) {
  console.error("Please specify a command (e.g., build, dev, lint).");
  process.exit(1);
}

const packages = ["getting-started", "crud-server-actions", "discuss"];

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
