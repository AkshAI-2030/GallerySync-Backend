module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define("photo", {
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    altDescription: DataTypes.STRING,
    dateSaved: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
    },
  });

  photo.associate = (models) => {
    // A photo belongs to a user (many photos to one user)
    photo.belongsTo(models.user, {
      foreignKey: "userId",
    });

    // A photo has many tags (one photo to many tags)
    photo.hasMany(models.tag, {
      foreignKey: "photoId", // foreign key reference in the tag model
      as: "photoTags", // alias for the association
    });
  };

  return photo;
};
