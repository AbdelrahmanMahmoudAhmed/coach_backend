'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('person', {
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
        allowNull: false,
      },
      phone: {
        type: Sequelize.INTEGER,
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
    await queryInterface.createTable('admin', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      person_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        unique:true,
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
        references: {
          model: "person",
          key: "id"
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
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
        allowNull: false,
      },
      phone: {
        type: Sequelize.INTEGER,
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
    await queryInterface.createTable('permission', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        unique:true,
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
        references: {
          model: "person",
          key: "id",
        }
      },
      allow_edit: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      allow_delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      allow_manage_website: {
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
    await queryInterface.createTable('client', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      person_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        unique:true,
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
        references: {
          model: "person",
          key: "id",
        }
      },
      goal: {
        type: Sequelize.ENUM('lose_fat','lose_weight', 'gain_muscle' , 'gain_weight' , 'maintain' ),
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('person');
    await queryInterface.dropTable('admin');
    await queryInterface.dropTable('permission');
    await queryInterface.dropTable('client');
    
  }
};