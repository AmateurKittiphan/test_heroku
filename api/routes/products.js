const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const ProductController = require("../controllers/products");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/", ProductController.products_get_all);
router.post(
  "/",
  upload.single("productImage"),
  ProductController.products_create_product
);
router.get("/:productId", ProductController.products_get_id);
router.patch(
  "/:productId",
  ProductController.products_update_product
);
router.delete(
  "/:productId",
  ProductController.products_delete_product
);
module.exports = router;
