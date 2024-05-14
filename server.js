import app from './app.js';
import './config/mysqlConfig.js'
import './config/seeder.js'

const port = process.env?.PORT || 4001;

app.listen(port, () => {
  console.log('server running on port ', port);
});
