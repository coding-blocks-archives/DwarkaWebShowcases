const express = require("express");
const router = express.Router();
const storeKeeper = require("../controllers/storeKeeper");
const handler = require("../handlers/errorHandlers");
const userKeeper = require("../controllers/userController");
const authkeeper = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

router.get("/", handler.catchErrors(storeKeeper.getStores));
router.get("/stores", handler.catchErrors(storeKeeper.getStores));
router.get("/add", authkeeper.isLoggedIn, storeKeeper.addStore);
router.post(
  "/add",
  storeKeeper.upload,
  handler.catchErrors(storeKeeper.resize),
  handler.catchErrors(storeKeeper.createStore)
);
router.get("/stores/:id/edit", handler.catchErrors(storeKeeper.editStore));
router.post(
  "/add/:id",
  storeKeeper.upload,
  handler.catchErrors(storeKeeper.resize),
  handler.catchErrors(storeKeeper.updateStore)
);

router.get("/store/:slug", handler.catchErrors(storeKeeper.getStoreBySlug));
router.get("/tags", handler.catchErrors(storeKeeper.getStoreByTag));
router.get("/tags/:tag", handler.catchErrors(storeKeeper.getStoreByTag));
router.get("/login", userKeeper.loginForm);
router.post("/login", authkeeper.login);
router.get("/register", userKeeper.registerForm);
router.post(
  "/register",
  userKeeper.validateRegister,
  userKeeper.register,
  authkeeper.login
);


router.get('/hearts', authkeeper.isLoggedIn, handler.catchErrors(storeKeeper.getHearts));


router.get("/logout", authkeeper.logout);
router.get("/account", authkeeper.isLoggedIn, userKeeper.account);
router.post("/account", handler.catchErrors(userKeeper.updateAccount));
router.post("/account/forgot", handler.catchErrors(authkeeper.forgot));
router.get("/account/reset/:token", handler.catchErrors(authkeeper.reset));
router.post(
  "/account/reset/:token",
  authkeeper.confirmPassword,
  handler.catchErrors(authkeeper.update)
);

router.post('/reviews/:id',
  authkeeper.isLoggedIn,
  handler.catchErrors(reviewController.addReview)
);

router.get("/api/search", handler.catchErrors(storeKeeper.searchStores));
router.post("/api/stores/:id/heart", handler.catchErrors(storeKeeper.heartStore));
module.exports = router;
