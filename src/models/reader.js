module.exports = (connection, DataTypes) => {
  const schema = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'The email is in incorrect format.'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
        args: true,
        msg: 'The name is missing.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 40],
          msg: 'The password length should be between 8 and 40 characters.'
        }
      }
    }
  }
  const ReaderModel = connection.define('Reader', schema)
  return ReaderModel
}