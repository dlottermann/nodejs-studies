const app = require('./src/config/custom-express');
const port = process.env.PORT || 3000;


app.listen(port,()=>console.log(`Server started on port ${port}`)); 