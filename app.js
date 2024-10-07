import bodyParser from "body-parser";
import express, { query } from "express";
import { get } from "http";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const __dirname = dirname(fileURLToPath(import.meta.url));

const getAllBlogs = (filename) => {
  let blogs = [];
  const blogFilePath = path.join(__dirname, filename);
  if (fs.existsSync(blogFilePath)) {
    const data = fs.readFileSync(blogFilePath);
    blogs = JSON.parse(data);
  }
  return blogs;
};

const saveBlogs = (blogs, filename) => {
  try {
    const blogFilePath = path.join(__dirname, filename);
    const jsonData = JSON.stringify(blogs, null, 2); // Beautified JSON
    fs.writeFileSync(blogFilePath, jsonData, "utf-8");
    console.log("Blogs saved successfully!");
  } catch (error) {
    console.error("Error saving blogs:", error.message);
  }
};

const getBlog = (blogId) => {
  const allBlogs = getAllBlogs("blogs.json").blogs;
  return allBlogs.find((b) => b.id === parseInt(blogId));
};
const searchBlogs = (query) => {
  const searchTerm = query;
  const blogs = getAllBlogs("blogs.json");
  const searchResults = blogs.blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.writer.toLowerCase().includes(searchTerm) ||
      blog.description.toLowerCase().includes(searchTerm) ||
      blog.blocks.some((block) =>
        block.paragraph.toLowerCase().includes(searchTerm)
      )
  );
  return searchResults;
};

app.post("/add-blog", (req, res) => {
  const data = req.body;
  const blogs = getAllBlogs("blogs.json");
  const homepage = getAllBlogs("homepage.json");
  const blocks = data.blockHeading.map((heading, index) => {
    const block = {
      heading: heading,
      paragraph: data.blockParagraph[index],
      image: data.blockImage[index],
    };
    return block;
  });
  data["id"] = getAllBlogs("blogs.json").blogs.length + 1;
  data.blocks = blocks;
  delete data.blockHeading;
  delete data.blockParagraph;
  delete data.blockImage;
  const homepageData = {
    id: data.id,
    title: data.title,
    writer: data.writer,
    genre: data.genre,
    image: data.image,
    description: data.description,
  };
  switch (data.position) {
    case "important":
      homepage.importantStory = homepageData;
      break;
    case "aside1":
      homepage.asideContent[0] = homepageData;
      break;
    case "aside2":
      homepage.asideContent[1] = homepageData;
      break;
    case "aside3":
      homepage.asideContent[2] = homepageData;
      break;
    case "aside4":
      homepage.asideContent[3] = homepageData;
      break;
    case "latest1":
      homepage.latestStories[0] = homepageData;
      break;
    case "latest2":
      homepage.latestStories[1] = homepageData;
      break;
    case "latest3":
      homepage.latestStories[2] = homepageData;
      break;
    case "latest4":
      homepage.latestStories[3] = homepageData;
      break;
    case "latest5":
      homepage.latestStories[4] = homepageData;
      break;
    case "latest6":
      homepage.latestStories[5] = homepageData;
      break;
    case "latest7":
      homepage.latestStories[6] = homepageData;
      break;
    case "latest8":
      homepage.latestStories[7] = homepageData;
      break;
    case "latest9":
      homepage.latestStories[8] = homepageData;
      break;
    case "latest10":
      homepage.latestStories[9] = homepageData;
      break;
    default:
      res.send("some error occured!");
  }
  blogs.blogs.push(data);
  saveBlogs(homepage, "homepage.json");
  saveBlogs(blogs, "blogs.json");
  res.redirect(`/blogs/${data.id}`);
});

app.post("/edit-blog", (req, res) => {
  const data = req.body;
  const blogs = getAllBlogs("blogs.json");
  const homepage = getAllBlogs("homepage.json");
  console.log(data);
  const blocks = data.blockHeading.map((heading, index) => {
    const block = {
      heading: heading,
      paragraph: data.blockParagraph[index],
      image: data.blockImage[index],
    };
    return block;
  });
  data.id = parseInt(data.id);
  data.blocks = blocks;
  delete data.blockHeading;
  delete data.blockParagraph;
  delete data.blockImage;
  const homepageData = {
    id: data.id,
    title: data.title,
    writer: data.writer,
    genre: data.genre,
    image: data.image,
    description: data.description,
  };
  switch (data.position) {
    case "important":
      homepage.importantStory = homepageData;
      break;
    case "aside1":
      homepage.asideContent[0] = homepageData;
      break;
    case "aside2":
      homepage.asideContent[1] = homepageData;
      break;
    case "aside3":
      homepage.asideContent[2] = homepageData;
      break;
    case "aside4":
      homepage.asideContent[3] = homepageData;
      break;
    case "latest1":
      homepage.latestStories[0] = homepageData;
      break;
    case "latest2":
      homepage.latestStories[1] = homepageData;
      break;
    case "latest3":
      homepage.latestStories[2] = homepageData;
      break;
    case "latest4":
      homepage.latestStories[3] = homepageData;
      break;
    case "latest5":
      homepage.latestStories[4] = homepageData;
      break;
    case "latest6":
      homepage.latestStories[5] = homepageData;
      break;
    case "latest7":
      homepage.latestStories[6] = homepageData;
      break;
    case "latest8":
      homepage.latestStories[7] = homepageData;
      break;
    case "latest9":
      homepage.latestStories[8] = homepageData;
      break;
    case "latest10":
      homepage.latestStories[9] = homepageData;
      break;
    default:
      res.send("some error occured!");
  }
  // blogs.blogs.push(data);
  blogs.blogs[data.id - 1] = data;

  saveBlogs(homepage, "homepage.json");
  saveBlogs(blogs, "blogs.json");
  res.redirect(`/blogs/${data.id}`);
});

app.get("/", (req, res) => {
  res.render("index", getAllBlogs("homepage.json"));
});

app.get("/addBlog", (req, res) => {
  res.render("addBlog.ejs");
});
app.get("/editBlog", (req, res) => {
  res.render("editBlog.ejs", {
    results: searchBlogs(req.query.query),
    query: req.query.query,
    id: req.query.id,
    blog: getBlog(req.query.id),
  });
});
app.get("/search", (req, res) => {
  const searchTerm = req.query.q;
  const searchResults = searchBlogs(searchTerm);
  console.log(searchResults);
  res.render("search.ejs", { query: req.query.q, results: searchResults });
});
app.get("/blogs/:id", (req, res) => {
  const blogId = req.params.id;

  const blog = getBlog(blogId);
  if (blog) {
    console.log(blog);
    res.render("blog-page-template.ejs", blog);
  } else {
    res.status(404).send("Blog not found");
  }
});
app.listen(port, () => {
  console.log(`App running on http:localhost:${port}`);
});
