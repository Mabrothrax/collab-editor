const cluster = require('cluster');
const os = require('os');
const config = require('./config.json');

if (cluster.isMaster) {
  let cpus = 0;
  if(os.cpus().length >= config.CPU) {
   cpus = config.CPU;
  } else {
    cpus = os.cpus().length;
  }
  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i<cpus; i++) {
    cluster.fork();
  }
} else {
  require('./app');
}