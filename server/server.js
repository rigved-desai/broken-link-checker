const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { default: parse } = require('node-html-parser');

const app = express();
const port = 4040;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/check-links', async (req, res) => {
    try {
        console.log(req.body);
        const { url } = req.body;
        console.log(url);

        const response = await axios(url);
        const htmlContent = response.data;

        const links = await extract404Links(htmlContent, url);

        res.json({ links });
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error connecting to the website, please check if the URL is valid or not!" });
  }
});

async function extract404Links(html, url) {
    const links = [];
    // const parser = new DOMParser();
    const doc = parse(html);
    const anchorTags = doc.getElementsByTagName('a');
  
    const promises = [];
  
    for (let i = 0; i < anchorTags.length; i++) {
      const href = anchorTags[i].getAttribute('href');
  
      if (href && href.substring(0, 4) == "http") {
        const promise = (async () => {
          try {
            let response;
            if (href[0] === '#') {
              response = await axios.head(url + href, {timeout: 10000});
            } else {
              response = await axios.head(href, {timeout: 10000});
            }
          } 
          catch (error) {
            if(error.response && error.response.status == 404) links.push(href);
            console.error('Error fetching:', href, error.message);
          }
        })();
        promises.push(promise);
      }
    }
    await Promise.all(promises);
    return links;
  }

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
