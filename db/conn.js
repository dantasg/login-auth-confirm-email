const mongoose = require('mongoose');

const mongo_connection = process.env.MONGO_CONNECTION;

async function main() {
  await mongoose.connect(`mongodb://localhost:${mongo_connection}`);
  console.log('Conectado ao Mongoose');
}

main().catch((err) => {
  console.log(err);
});

module.exports = mongoose;
