const fs = require("fs");
const Tree = require("../models/trees");
const DEFAULT_PAGE_NO = 1;
const DEFAULT_PAGE_SIZE = 5;

const getAllTrees = async (req, res) => {
  const page = isNaN(Number(req?.query?.page))
    ? DEFAULT_PAGE_NO
    : req?.query?.page;
  const size = isNaN(Number(req?.query?.size))
    ? DEFAULT_PAGE_SIZE
    : req?.query?.size;

  const startIndex = (page - 1) * size;

  const trees = await Tree.find({}).limit(size).skip(startIndex);
  const count = await Tree.find({}).countDocuments();
  res
    .status(200)
    .json({ message: "success", data: { trees, totalCount: count } });
};

const searchAllTrees = async (req, res) => {
  const page = isNaN(Number(req?.query?.page))
    ? DEFAULT_PAGE_NO
    : req?.query?.page;
  const size = isNaN(Number(req?.query?.size))
    ? DEFAULT_PAGE_SIZE
    : req?.query?.size;
  const startIndex = (page - 1) * size;

  // For partial search logic
  const searchArray = [];
  for (const key in req?.query) {
    const nameRegEx = new RegExp(req?.query[key], "i");
    if (!(String(key) === "page" || String(key) === "size")) {
      searchArray.push({ [key]: [nameRegEx] });
    }
  }
  const trees = await Tree.find({ $or: searchArray })
    .limit(size)
    .skip(startIndex);
  const count = await Tree.find({ $or: searchArray }).countDocuments();
  res
    .status(200)
    .json({ message: "success", data: { trees, totalCount: count } });
};

const createTree = async (req, res) => {
  const data = { ...req?.body };
  if (req?.file) {
    data.image = req?.file;
  }
  const tree = new Tree(data);
  await tree.save();
  res.status(200).json({ message: "Tree created successfully", data: tree });
};

const getTree = async (req, res) => {
  const tree = await Tree.findOne({ _id: req?.params?.id });
  if (tree) return res.status(200).json({ message: "success", data: tree });
  return res.status(404).json({ message: "Tree not found" });
};

const updateTree = async (req, res) => {
  const checkTree = await Tree.findOne({ _id: req?.params?.id });
  if (!checkTree) return res.status(404).json({ message: "Tree not found" });
  const data = { ...req?.body };

  if (req?.file) {
    if (checkTree?.image?.filename) {
      await fs.unlink(
        `${checkTree?.image?.destination}\\/${checkTree?.image?.filename}`,
        (err) => {
          if (err) return console.log("err:", err);
          console.log("file deleted");
        }
      );
    }
    data.image = req?.file;
  }
  const tree = await Tree.findOneAndUpdate(
    { _id: req?.params?.id },
    { $set: data },
    { new: "true" }
  );
  res.status(200).json({ message: "Tree updated successfully", data: tree });
};

const deleteTree = async (req, res) => {
  const checkTree = await Tree.findOne({ _id: req?.params?.id });
  if (!checkTree) return res.status(404).json({ message: "Tree not found" });

  // to delete the file
  if (checkTree?.image?.filename) {
    await fs.unlink(
      `${checkTree?.image?.destination}\\/${checkTree?.image?.filename}`,
      (err) => {
        if (err) return console.log("err:", err);
        console.log("file deleted");
      }
    );
  }

  const tree = await Tree.deleteOne({ _id: req?.params?.id });
  res.status(200).json({ message: "Tree deleted successfully", data: tree });
};

module.exports = {
  getAllTrees,
  searchAllTrees,
  createTree,
  getTree,
  updateTree,
  deleteTree,
};
