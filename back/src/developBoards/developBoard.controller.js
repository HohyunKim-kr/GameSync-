class DevelopController {
  constructor(service) {
    this.service = service;
  }

  async create(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }
}

module.exports = DevelopController;

// exports.create = async (req, res, next) => {};
// exports.findAll = async (req, res, next) => {};
// exports.findOne = async (req, res, next) => {};
// exports.update = async (req, res, next) => {};
// exports.delete = async (req, res, next) => {};
