module.exports = (sequelize, DataTypes) => {
const user = sequelize.define(
    "user",
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );

  // Define associations (if any)
  user.associate = (models) => {
    // Example: a user might have many photos (one-to-many relationship)
    user.hasMany(models.photo, {
      foreignKey: "userId", // The foreign key in the 'photos' table
    });

    // Example: a user might have many search histories (one-to-many relationship)
    user.hasMany(models.searchHistory, {
      foreignKey: "userId", // The foreign key in the 'searchHistories' table
    });
  };
  return user;
};
