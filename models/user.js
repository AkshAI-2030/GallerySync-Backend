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

  user.associate = (models) => {
    // A user might have many photos (one-to-many relationship)
    user.hasMany(models.photo, {
      foreignKey: "userId", // The foreign key in the 'photos' table
    });

    // A user might have many search histories (one-to-many relationship)
    user.hasMany(models.searchHistory, {
      foreignKey: "userId", // The foreign key in the 'searchHistories' table
    });
  };
  return user; //returning this user
};
