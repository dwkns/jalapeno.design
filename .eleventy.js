const now = String(Date.now())

// Image transform plugin
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

// add id to headings
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

// Time to read plugin
const timeToRead = require('eleventy-plugin-time-to-read');

require('dotenv').config();

module.exports = function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setLayoutsDirectory("_layouts");

  eleventyConfig.addPassthroughCopy("src/assets/images");

  eleventyConfig.addWatchTarget("src");

  eleventyConfig.addGlobalData("siteName", "jalapeno.design");

  // read data from .env file to determine dev or prod
  eleventyConfig.addGlobalData("env", process.env.ELEVENTY_ENV);

  // Plug Ins
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addPlugin(timeToRead);

  // Markdown Overrides for adding id to headings
  const linkAfterHeader = markdownItAnchor.permalink.linkAfterHeader({
    class: "anchor",
    symbol: "<span hidden>#</span>",
    style: "aria-labelledby",
  });
  const markdownItAnchorOptions = {
    level: [1, 2, 3],
    tabIndex: false
  };
  
  let markdownLibrary = markdownIt({
    html: true,
  }).use(markdownItAnchor, markdownItAnchorOptions);
  
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Shortcodes
  eleventyConfig.addShortcode('version', function () {
    return now
  });

  // Custom Split Filter
  eleventyConfig.addFilter("split", function(value, delimiter) {
    if (typeof value === "string") {
      return value.split(delimiter);
    }
    return value;
  });
};