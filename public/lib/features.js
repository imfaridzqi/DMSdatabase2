module.exports = function APIfeatures(query, queryString) {
  this.query = query; //Data.find();
  this.queryString = queryString;

  this.paginating = async () => {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = limit * (page - 1);
    this.query = await this.query.limit(limit).skip(skip);
    return this;
  };
};
