const now = String(Date.now())

// Image transform plugin
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

// add id to headings
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

// Time to read plugin
const timeToRead = require('eleventy-plugin-time-to-read');

// CSV parser
const { parse } = require('csv-parse');

require('dotenv').config();

module.exports = function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setLayoutsDirectory("_layouts");

  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });
  
  eleventyConfig.addWatchTarget("src");

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

  eleventyConfig.addShortcode('year', function () {
    return new Date().getFullYear()
  });

  eleventyConfig.addFilter("ucfirst", function(value) {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
  });

  // Custom Split Filter
  eleventyConfig.addFilter("split", function(value, delimiter) {
    if (typeof value === "string") {
      return value.split(delimiter);
    }
    return value;
  });

  eleventyConfig.addFilter("length", function(JSONarray) {
    arr = [];
    len = 0;
    for(key in JSONarray) {
      arr.push(key);
      } 
    len = arr.length;    
    return len;
  });

    // Custom filter to split Patent Number data
    eleventyConfig.addFilter("splitPatentNumber", function(value) {
      const match = value.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return {
          text: match[1],
          url: match[2]
        };
      }
      return {
        text: value,
        url: "#"
      };
    });

  eleventyConfig.addDataExtension("csv", (contents) => {
    const records = parse(contents, {
      columns: true,
      skip_empty_lines: true,
    });
    return records;
  });
};