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

  // Define any associations here
  photo.associate = (models) => {
    photo.belongsTo(models.user, {
      foreignKey: "userId",
    });
  };
  photo.associate = (models) => {
    // The tag belongs to a photo (many-to-one relationship)
    photo.hasMany(models.tag, {
      foreignKey: "photoId", // foreign key reference in tag
      as: "photoTags",
    });
  };

  return photo;
};
