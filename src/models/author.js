module.exports = (connection, DataTypes) => {
    const schema = {
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
          args: true,
          msg: 'The author could not be found.'
          }
        }
      },
    }
    const AuthorModel = connection.define('Author', schema)
    return AuthorModel
};