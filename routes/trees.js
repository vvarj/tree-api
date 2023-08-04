const express = require("express");
const router = express.Router();

const {
  getAllTrees,
  searchAllTrees,
  createTree,
  getTree,
  updateTree,
  deleteTree,
} = require("../controllers/trees");
const asyncWrapper = require("../middleware/wrapper");
const upload = require("../middleware/fileUpload");

router.get("/", asyncWrapper(getAllTrees));
router.get("/search", asyncWrapper(searchAllTrees));
router.post("/", upload.single("file"), asyncWrapper(createTree));
router.get("/:id", asyncWrapper(getTree));
router.put("/:id", upload.single("file"), asyncWrapper(updateTree));
router.delete("/:id", asyncWrapper(deleteTree));

module.exports = router;
