module.exports = () => {
  
    // https://stackoverflow.com/a/34518749/5323344
    const latestGitCommitHash =
      childProcess
      .execSync('git rev-parse --short HEAD')
      .toString()
      .trim();
  
    return {
      hash: latestGitCommitHash,
    }
  }