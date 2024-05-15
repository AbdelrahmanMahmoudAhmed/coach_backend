'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //panel
    await queryInterface.createTable('persons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('admin', 'client'),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      personId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "persons",
          key: "id"
        }
      },
      role: {
        type: Sequelize.ENUM('superAdmin', 'admin'),
        allowNull: false,
      },
      allowEdit: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      allowDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      websiteManagement: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      adminId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "persons",
          key: "id",
        }
      },
      allowEdit: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      allowDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      allowManageWebsite: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      personId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "persons",
          key: "id",
        }
      },
      goal: {
        type: Sequelize.ENUM('loseFat', 'loseWeight', 'gainMuscle', 'gainWeight', 'maintain'),
        allowNull: false,
      },
      tall: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      weight: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    ///////////////////////////////////////////////////////
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('product', 'package'),
        allowNull: false,
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('product', 'package'),
        allowNull: false,
      },
      discountPercentage: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
      },
      price: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
      },
      titleAr: {
        type: Sequelize.STRING,
        allowNull: false
      },
      titleEn: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descriptionAr: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descriptionEn: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('clientOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "orders",
          key: "id",
        }
      },
      clientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "orders",
          key: "id",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('productOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.ENUM('ordered', 'prepared', 'shipped', 'arrived'),
        allowNull: false,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "orders",
          key: "id",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('packageOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.ENUM('ordered', 'pending', 'ready', 'started', 'progress', 'finished'),
        allowNull: false,
      },
      dietPlanAr: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dietPlanEn: {
        type: Sequelize.STRING,
        allowNull: false
      },
      supplementsAr: {
        type: Sequelize.STRING,
        allowNull: false
      },
      supplementsEn: {
        type: Sequelize.STRING,
        allowNull: false
      },
      trainingAr: {
        type: Sequelize.STRING,
        allowNull: false
      },
      trainingEn: {
        type: Sequelize.STRING,
        allowNull: false
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "orders",
          key: "id",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('itemOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "orders",
          key: "id",
        }
      },
      itemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "items",
          key: "id",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('packages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      period: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      itemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "items",
          key: "id",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shippingPrice: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
      },
      itemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "items",
          key: "id",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('packageFeatures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      featureAr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      featureEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      packageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "packages",
          key: "id",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // website
    await queryInterface.createTable('settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      key: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      titleAr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      titleEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contentAr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contentEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM('video', 'pic'),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descriptionAr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descriptionEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      titleAr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      titleEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('sections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      link: {
        type: Sequelize.STRING,
      },
      nameAr: {
        type: Sequelize.STRING,
      },
      nameEn: {
        type: Sequelize.STRING,
      },
      titleAr: {
        type: Sequelize.STRING,
      },
      titleEn: {
        type: Sequelize.STRING,
      },
      contentAr: {
        type: Sequelize.STRING,
      },
      contentEn: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      callToAction: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    
    await queryInterface.createTable('quickAnswers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionAr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      questionEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answerAr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answerEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('certifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titleAr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      titleEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contentAr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contentEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('contactUs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('testimonials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descriptionAr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descriptionEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('transformations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descriptionAr: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descriptionEn: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

  },
  async down(queryInterface, Sequelize) {
    //panel
    await queryInterface.dropTable('persons');
    await queryInterface.dropTable('admins');
    await queryInterface.dropTable('permissions');
    await queryInterface.dropTable('clients');

    await queryInterface.dropTable('orders');
    await queryInterface.dropTable('clientOrders');
    await queryInterface.dropTable('productOrders');
    await queryInterface.dropTable('packageOrders');
    await queryInterface.dropTable('itemOrders');
    await queryInterface.dropTable('items');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('packages');
    await queryInterface.dropTable('packageFeatures');
    //website
    await queryInterface.dropTable('settings');
    await queryInterface.dropTable('blogs');
    await queryInterface.dropTable('videos');
    await queryInterface.dropTable('quickAnswers');
    await queryInterface.dropTable('certifications');
    await queryInterface.dropTable('contactUs');
    await queryInterface.dropTable('testimonials');
    await queryInterface.dropTable('transformations');
  }
};




