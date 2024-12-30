"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      nameAr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortDescAr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortDescEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longDescAr: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      longDescEn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      keyObjectivesAr: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      keyObjectivesEn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      banner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      serviceImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      homeImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      previewImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      download: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      displayInHome: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
    await queryInterface.createTable("services", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      nameAr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortDescAr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortDescEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mainDescAr: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mainDescEn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      iconLight: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      iconDark: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isCommingSoon: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
    await queryInterface.createTable("achievements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      descAr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
    await queryInterface.createTable("admins", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
    await queryInterface.createTable("challenges", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      projectId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "projects",
          key: "id",
        },
      },
      nameAr: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      nameEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
    await queryInterface.createTable("contactUs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
    await queryInterface.createTable("features", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      serviceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "services",
          key: "id",
        },
      },

      nameAr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descAr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
    await queryInterface.createTable("feedbacks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      projectId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "projects",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
    await queryInterface.createTable("languages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      projectId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "projects",
          key: "id",
        },
      },
      nameAr: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      nameEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
    await queryInterface.createTable("platforms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      nameAr: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      nameEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });

    await queryInterface.createTable("projectPlatforms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      platformId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "platforms",
          key: "id",
        },
      },
      projectId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "projects",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
    await queryInterface.createTable("projectServices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      serviceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "services",
          key: "id",
        },
      },
      projectId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "projects",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
    await queryInterface.createTable("settings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      key: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
    await queryInterface.createTable("subscriptions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
    await queryInterface.createTable("tokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      adminId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "admins",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("projects");
    await queryInterface.dropTable("services");
    await queryInterface.dropTable("achievements");
    await queryInterface.dropTable("admins");
    await queryInterface.dropTable("challenges");
    await queryInterface.dropTable("contactUs");
    await queryInterface.dropTable("features");
    await queryInterface.dropTable("feedbacks");
    await queryInterface.dropTable("languages");
    await queryInterface.dropTable("platforms");
    await queryInterface.dropTable("projectServices");
    await queryInterface.dropTable("projectPlatforms");
    await queryInterface.dropTable("settings");
    await queryInterface.dropTable("subscriptions");
    await queryInterface.dropTable("tokens");
  },
};
