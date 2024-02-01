import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.yelp.com/v3";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "xsvwhqkDOEAC4aHfktkYQz_DSWiI8M5bC52xlGpniA424J2gQo_V7OPE0-RN0V_3rfYi3PnQrVJ3EFS4-PVdWVwHIkrUgTs0KNZp4klmbJKvp66EUsj8T2MwGe26ZXYx";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  const location = "San Francisco";
  const categories = "newamerican";
  try {
    const result = await axios.get(API_URL + "/businesses/search?location=" + location + "&categories=" + categories, config);
    const obj = JSON.parse(JSON.stringify(result.data));
    let i = 1;
    res.render("index.ejs", {number: i, content: obj.businesses[i].name, rating: obj.businesses[i].rating, price: obj.businesses[i].price, city: obj.businesses[i].location.city, phone: obj.businesses[i].display_phone, restaurantPic: obj.businesses[i].image_url});
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
