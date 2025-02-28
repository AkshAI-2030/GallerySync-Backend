module.exports = (sequelize, DataTypes) => {
  const searchHistory = sequelize.define(
    "searchHistory",
    {
      query: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" }, // foreign key reference to the 'users' table
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true,
    }
  );

  searchHistory.associate = (models) => {
    // The searchHistory belongs to a user (one-to-many relationship)
    searchHistory.belongsTo(models.user, {
      foreignKey: "userId", // foreign key reference in searchHistory
    });
  };

  return searchHistory;
};
