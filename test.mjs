import fetch from 'node-fetch';
import FormData from'form-data';
import fs from 'fs';

for (let i = 0; i < 10000; i++) {
  await new Promise(resolve => {
    const fileStream = fs.createReadStream('./test.zip');
    const formData = new FormData();
    formData.append('file', fileStream);
    fetch('http://127.0.0.1:7001/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      console.log(response.status);
      fileStream.close();
      resolve();
    })
    .catch(error => {
      console.error(error);
      resolve();
    });
  });
}