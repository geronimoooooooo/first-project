// blog_app/routes/ArticleRouter.js
import express from "express";
import ArticleModel from "./models/article.js";
import { User } from "./models/users.js";
const router = express.Router();

router.post("/articles", async (request, response) => {
  /*{"title":"First article3", "content":"Content for the first article"}*/
  const article = new ArticleModel(request.body);

  try {
    await article.save();
    response.send(article);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/articles", async (request, response) => {
  try {
    const articles = await ArticleModel.find({});
    response.send(articles);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.post("/user", async (req, res) => {
  try {
    const user = new User({ name: "afk", age: 42, email: "afk@a.a" })
    await user.save();

    const user2 = await User.create({
      name: "create",
      age: 42,
      email: "bro@bro.bro",
      hobbies: ["a", "b"]
    })
    user2.name = "Create2";
    await user2.save();
    console.log(user2);
    res.send(user);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
})
router.get("/user", async (request, response) => {
  try {
    //  const user = await User.findById("6684085a19aec47e6e71ec39")
    const users = await User.find({ name: "Kayle" })
    const user = await User.where("age").gt(20).lte(43).where("name").equals("afk").limit(2).select("email");
    console.log(user);
    response.send(user);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.get("/users", async (request, response) => {
  try {
    const users = await User.find({});
    response.send(users);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.delete("/user", async (request, response) => {
  try {
    //  const del = await User.deleteOne({_id: "6684085a19aec47e6e71ec39"})
    const del = await User.deleteMany({ name: ["Kyle", "Create2"] })
    if (del.deletedCount == 0) {
      console.log("No user found with that id!");
    } else {
      console.log(`${deletedCount} docs wurden deleted.`)
    }
    console.log(`${deletedCount} docs wurden deleted.`)
    const users = await User.find({ name: "Kayle" })
    console.log(user);
    response.send(user);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.delete("/user2", async (request, response) => {
  try {
    const del = await User.deleteOne({ _id: "6684085a19aec47e6e71ec39" })

    if (del.deletedCount == 0) {
      console.log("No user found with that id!");
    } else {
      console.log(`${deletedCount} docs wurden deleted.`)
    }
    console.log(`${deletedCount} docs wurden deleted.`)
    const users = await User.find({ name: "Kayle" })
    console.log(user);
    response.send(user);
  } catch (error) {
    response.status(500).send({ error });
  }
});

export default router;
