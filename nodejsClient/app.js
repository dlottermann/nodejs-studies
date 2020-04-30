const express = require("express");
const fetch = require("node-fetch");
const FormData = require("form-data");
const app = express();
const fs = require("fs");
const crypto = require("crypto");
const port = 19002;
const token = 'token';


const apiRequest = `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`;
const apiResponse = `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${token}`;

const formData = new FormData();
formData.append('answer', fs.createReadStream('answer.json'));
const options = {
  method: "POST",
  body: formData
};

const getData = async (url, options, upUrl) => {
  try {
    console.log("fetching data");
    const response = await fetch(url);
    console.log("json formatter");
    const json = await response.json();
    console.log("Solving phrase");
    const solved = await solveCrypt(json.cifrado, json.numero_casas);
    console.log("Generate sha1");
    const sha1 = await genCrypt(solved);
    console.log("Changing Object");
    json.decifrado = solved;
    json.resumo_criptografico = sha1

    console.log("writing file data")
    await writef(JSON.stringify(json))
    await postFile(upUrl,options)

    console.log('finish!!!')

  } catch (error) {
    console.log(error);
  }
};

getData(apiRequest,options, apiResponse);

const solveCrypt = async (str, dec) => {
  const alphabet = `abcdefghijklmnopqrstuvwxyz`;
  let decc = '';

  for (let i = 0; i < str.length; i++) {

    if (str[i].match(/[a-zA-Z]/i)) {
        decc += alphabet[alphabet.indexOf(str[i]) - dec]
    }else{
        decc += str[i]
    }
  }

  return decc;
};

const genCrypt = async str => {
  const hash = crypto.createHash("sha1");
  const data = hash.update(str, "utf-8");
  return data.digest("hex");
};


const writef = async str =>
  fs.writeFile("answer.json", `${str}`, (err) => {
    if (err) throw err;
    console.log("Saved!");
  });


const postFile = async (url, options) => {

      console.log('send file answer.json')
      const responseUp = await fetch(url, options);
      console.log('gettin response')
      const jsonUp = await responseUp.json();
      console.log('Response :',jsonUp)
}

app.listen(port, () => console.log(`Server started on port ${port}`));
