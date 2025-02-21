const now = String(Date.now())

module.exports = function (eleventyConfig) {

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setLayoutsDirectory("_layouts");

  eleventyConfig.addPassthroughCopy("src/assets/images");

  eleventyConfig.addWatchTarget("src");

  eleventyConfig.addGlobalData("siteName", "jalapeno.design");

  eleventyConfig.addShortcode('version', function () {
    return now
  });
};