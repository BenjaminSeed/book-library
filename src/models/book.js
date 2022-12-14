module.exports = (connection, DataTypes) => {
    const schema = {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        }
      },
      author:  {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        }
      },
      genre: {
        type: DataTypes.STRING,
      },
      ISBN: {
        type: DataTypes.STRING,
      },
    };
  
    const BookModel = connection.define('Book', schema);
    return BookModel;
  };