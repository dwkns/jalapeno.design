const now = String(Date.now())
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setLayoutsDirectory("_layouts");

  eleventyConfig.addPassthroughCopy("src/assets/images");

  eleventyConfig.addWatchTarget("src");

  eleventyConfig.addGlobalData("siteName", "jalapeno.design");

  // Plug Ins
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  eleventyConfig.addShortcode('version', function () {
    return now
  });
};