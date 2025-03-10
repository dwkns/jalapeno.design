const childProcess = require('child_process');

module.exports = () => {
  // https://stackoverflow.com/a/34518749/5323344
  const latestGitCommitHash =
    childProcess
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim();

  return {
    // ... other values here
    hash: process.env.GIT_COMMIT_HASH || latestGitCommitHash,
  }
};