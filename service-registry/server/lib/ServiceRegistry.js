const semver = require('semver');

class ServiceRegistry {
  constructor(log) {
    this.log = log;
    this.services = {};
    this.timeout = 30;
  }

  get(name, version) {
    this.cleanUp();
    const candidates = Object.values(this.services).filter((service) => {
      return service.name === name && semver.satisfies(service.version, version);
    });

    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  register(name, version, ip, port) {
    this.cleanUp();
    const key = name + version + ip + port;

    if (!this.services[key]) {
      this.services[key] = {};
      this.services[key].timestamp = Math.floor(new Date() / 1000);
      this.services[key].ip = ip;
      this.services[key].port = port;
      this.services[key].name = name;
      this.services[key].version = version;
      this.log.debug(`Added service ${name}, version: ${version} listening at port: ${port}`);
      return key;
    }
    this.services[key].timestamp = Math.floor(new Date() / 1000);
    this.log.debug(`Updated service ${name}, version: ${version} listening at port: ${port}`);
    return key;
  }

  unregister(name, version, ip, port) {
    const key = name + version + ip + port;
    delete this.services[key];
    return key;
  }

  cleanUp() {
    const now = Math.floor(new Date() / 1000);
    Object.keys(this.services).forEach((key) => {
      if (this.services[key].timestamp + this.timeout < now) {
        delete this.services[key];
        this.log.debug(`Service with key:${key} removed`);
      }
    });
  }
}

module.exports = ServiceRegistry;
