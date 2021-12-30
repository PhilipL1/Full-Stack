var Comments = require("./Comments");

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      // 1:N relationship
      onDelete: "cascade", //delete a post >> all comments associated with that post will be deleted aswell
    });
  };

  // Posts.associate = (models) => {
  //   Posts.belongsTo(models.Comments, {
  //     foreignKey: "ID",
  //     as: "Posts",
  //   });
  // };

  return Posts;
};
