module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Account = mongoose.model("accounts", schema);
  return Account;
};
