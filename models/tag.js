module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    "tag",
    {
      name: DataTypes.STRING,
      photoId: {
        type: DataTypes.INTEGER,
        references: { model: "photos", key: "id" }, // Foreign key reference to the 'photos' table
      },
    },
    {
      timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
    }
  );

  // Define associations (if any)
  tag.associate = (models) => {
    // The tag belongs to a photo (many-to-one relationship)
    tag.belongsTo(models.photo, {
      foreignKey: "photoId", // foreign key reference in tag
    });
  };
  return tag;
};
