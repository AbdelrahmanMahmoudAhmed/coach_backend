const {
  Feedback,
  Service,
  ProjectService,
  Project,
  Challenge,
  Platforms,
  ProjectPlatform,
  Language,
} = require("../../models");
const { Op, where, Sequelize } = require("sequelize");

const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const path = require("path");
const {
  notFoundData,
  serverErr,
  requiredImg,
} = require("../../constant/errors");
const clearImage = require("../utils/clearImage");

const getFilePath = (fileName) => {
  return path.join(__dirname, "..", "..", "..", "uploads", "project", fileName);
};

const getSingleProject = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const data = await Project.findOne({
    where: { id },

    attributes: [
      "id",
      "nameAr",
      "nameEn",
      "shortDescAr",
      "shortDescEn",
      "longDescAr",
      "longDescEn",
      "keyObjectivesAr",
      "keyObjectivesEn",
      "download",
      "duration",
      "rating",
      "displayInHome",
      "color",
      [
        Sequelize.literal(`
          CASE 
            WHEN \`banner\` IS NOT NULL AND \`banner\` != '' THEN CONCAT('/u/project/', \`banner\`)
            ELSE NULL
          END
        `),
        'banner',
      ],

      [
        Sequelize.literal(`
          CASE 
            WHEN \`serviceImg\` IS NOT NULL AND \`serviceImg\` != '' THEN CONCAT('/u/project/', \`serviceImg\`)
            ELSE NULL
          END
        `),
        'serviceImg',
      ],
      [
        Sequelize.literal(`
          CASE 
            WHEN \`homeImg\` IS NOT NULL AND \`homeImg\` != '' THEN CONCAT('/u/project/', \`homeImg\`)
            ELSE NULL
          END
        `),
        'homeImg',
      ],
      [
        Sequelize.literal(`
          CASE 
            WHEN \`previewImg\` IS NOT NULL AND \`previewImg\` != '' THEN CONCAT('/u/project/', \`previewImg\`)
            ELSE NULL
          END
        `),
        'previewImg',
      ],
    ],
    include: [
      {
        model: Challenge,
        as: "challenges",
      },
      {
        model: Feedback,
        as: "feedback",

        attributes: [
          "id",
          "name",
          "jobTitle",
          "desc",
          [
            Sequelize.literal(`
              CASE 
                WHEN \`img\` IS NOT NULL AND \`img\` != '' THEN CONCAT('/u/project/', \`img\`)
                ELSE NULL
              END
            `),
            'img',
          ],
        ],
      },
      {
        model: Language,
        as: "languages",
        attributes: ["id", "nameAr", "nameEn"],
      },
      {
        model: ProjectService,
        as: "services",
        include: [
          {
            model: Service,
            as: "service",
            attributes: [
              "id",
              "nameAr",
              "nameEn",
    
              [
                Sequelize.literal(`
                  CASE 
                    WHEN \`image\` IS NOT NULL AND \`image\` != '' THEN CONCAT('/u/service/', \`image\`)
                    ELSE NULL
                  END
                `),
                'image', 
              ],

            ],
          },
        ],
      },

      {
        model: ProjectPlatform,
        as: "platforms",
        include: [
          {
            model: Platforms,
            attributes: ["id", "nameAr", "nameEn", "platform"],
          },
        ],
      },
    ],
  });

  if (!data)
    throw createAppError(
      "This project was not found",
      HttpStatus.NotFound,
      notFoundData
    );
  successResponse(res, data);
});

const getAllProjects = controllerWrapper(async (req, res, next) => {
  /* ------------------------------- START ------------------------------- */
  // pagination
  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const totalCount = await Feedback.count();
  /* ------------------------------- END ------------------------------- */
  const data = await Project.findAll({
    limit: perPage,
    offset,

    attributes: [
      "id",
      "nameAr",
      "nameEn",
      "shortDescAr",
      "shortDescEn",
      "longDescAr",
      "longDescEn",
      "keyObjectivesAr",
      "keyObjectivesEn",
      "download",
      "duration",
      "rating",
      "displayInHome",
      "color",
      [
        Sequelize.literal(`
          CASE 
            WHEN \`banner\` IS NOT NULL AND \`banner\` != '' THEN CONCAT('/u/project/', \`banner\`)
            ELSE NULL
          END
        `),
        'banner',
      ],

      [
        Sequelize.literal(`
          CASE 
            WHEN \`serviceImg\` IS NOT NULL AND \`serviceImg\` != '' THEN CONCAT('/u/project/', \`serviceImg\`)
            ELSE NULL
          END
        `),
        'serviceImg',
      ],
      [
        Sequelize.literal(`
          CASE 
            WHEN \`homeImg\` IS NOT NULL AND \`homeImg\` != '' THEN CONCAT('/u/project/', \`homeImg\`)
            ELSE NULL
          END
        `),
        'homeImg',
      ],
      [
        Sequelize.literal(`
          CASE 
            WHEN \`previewImg\` IS NOT NULL AND \`previewImg\` != '' THEN CONCAT('/u/project/', \`previewImg\`)
            ELSE NULL
          END
        `),
        'previewImg',
      ],
    ],
    include: [
      {
        model: Challenge,
        as: "challenges",
      },
      {
        model: Feedback,
        as: "feedback",

        attributes: [
          "id",
          "name",
          "jobTitle",
          "desc",
          [
            Sequelize.literal(`
              CASE 
                WHEN \`img\` IS NOT NULL AND \`img\` != '' THEN CONCAT('/u/project/', \`img\`)
                ELSE NULL
              END
            `),
            'img',
          ],        ],
      },
      {
        model: Language,
        as: "languages",
        attributes: ["id", "nameAr", "nameEn"],
      },
      {
        model: ProjectService,
        as: "services",
        include: [
          {
            model: Service,
            as: "service",
            attributes: [
              "id",
              "nameAr",
              "nameEn",
              [
                Sequelize.literal(`
                  CASE 
                    WHEN \`image\` IS NOT NULL AND \`image\` != '' THEN CONCAT('/u/service/', \`image\`)
                    ELSE NULL
                  END
                `),
                'image',
              ],
            ],
          },
        ],
      },

      {
        model: ProjectPlatform,
        as: "platforms",
        include: [
          {
            model: Platforms,
            attributes: ["id", "nameAr", "nameEn", "platform"],
          },
        ],
      },
    ],
  });

  if (!data)
    throw createAppError(" not found", HttpStatus.NotFound, notFoundData);

  successResponse(res, data, 200, [
    { pagination: { currentPage: page, perPage, totalCount } },
  ]);
});

const addProject = controllerWrapper(async (req, res, next) => {
  const {
    nameAr,
    nameEn,
    shortDescAr,
    shortDescEn,
    longDescAr,
    longDescEn,
    keyObjectivesAr,
    keyObjectivesEn,
    download,
    duration,
    rating,
    displayInHome,
    color,
    languages,
    platForms,
    services,
    challenges,
    clientName,
    clientJobTitle,
    clientDesc,
  } = req.body;
  const allImgs = req.files || [];
  const banner = allImgs?.banner?.[0]?.filename || "";
  const homeImg = allImgs?.homeImg?.[0]?.filename || "";
  const previewImg = allImgs?.previewImg?.[0]?.filename || "";
  const serviceImg = allImgs?.serviceImg?.[0]?.filename || "";
  const clientImg = allImgs?.clientImg?.[0]?.filename || "";

  if (Object.keys(allImgs)?.length != 5) {
    throw createAppError(
      "all images are required",
      HttpStatus.BadRequest,
      requiredImg
    );
  }

  await validationChecker(req, res);

  const createProject = await Project.create({
    nameAr,
    nameEn,
    shortDescAr,
    shortDescEn,
    longDescAr,
    longDescEn,
    keyObjectivesAr,
    keyObjectivesEn,
    download,
    duration,
    rating,
    displayInHome,
    color,
    previewImg,
    serviceImg,
    homeImg,
    banner,
  });

  // add platForms

  if (Array.isArray(platForms) && platForms?.length) {
    try {
      const validPlatforms = await Platforms.findAll({
        where: { id: platForms },
        attributes: ["id"],
      });

      const validPlatformIds = validPlatforms.map((platform) => {
        return { platformId: platform.id, projectId: createProject.id };
      });
      // successResponse(res, validPlatformIds, 201);

      const projectplatform = await ProjectPlatform.bulkCreate(
        validPlatformIds
      );

      createProject.dataValues.platforms = projectplatform;
    } catch (err) {
      const deletedProject = await createProject.destroy();
      throw createAppError(err, HttpStatus.BadRequest, serverErr);
    }
  }

  // add Services
  if (Array.isArray(services) && services?.length) {
    try {
      const validServices = await Service.findAll({
        where: { id: services },
        attributes: ["id"],
      });

      const validServicesIds = validServices.map((service) => {
        return { serviceId: service.id, projectId: createProject.id };
      });
      // successResponse(res, validPlatformIds, 201);

      const projectService = await ProjectService.bulkCreate(validServicesIds);

      createProject.dataValues.services = projectService;
    } catch (err) {
      const deletedProject = await createProject.destroy();
      throw createAppError(err, HttpStatus.BadRequest, serverErr);
    }
  }
  // create languages
  if (Array.isArray(languages) && languages?.length) {
    try {
      const preparedLanguages = languages.map((item) => {
        item.projectId = createProject.id;
        return item;
      });
      const addedLanguges = await Language.bulkCreate(preparedLanguages);
      createProject.dataValues.languages = addedLanguges;
    } catch (err) {
      const deletedProject = await createProject.destroy();
      throw createAppError(
        "issue in upload the project",
        HttpStatus.BadRequest,
        serverErr
      );
    }
  }
  // create Challenge
  if (Array.isArray(challenges) && challenges?.length) {
    const preparedChallenges = challenges.map((item) => {
      item.projectId = createProject.id;
      return item;
    });

    try {
      const addedChallenges = await Challenge.bulkCreate(preparedChallenges);
      createProject.dataValues.challenges = addedChallenges;
    } catch (err) {
      const deletedProject = await createProject.destroy();
      throw createAppError(
        "issue in upload the project",
        HttpStatus.BadRequest,
        serverErr
      );
    }
  }
  // create feedback

  try {
    const addedFeedback = await Feedback.create({
      name: clientName,
      jobTitle: clientJobTitle,
      desc: clientDesc,
      img: clientImg,
      projectId: createProject.id,
    });
    createProject.dataValues.feedback = addedFeedback;
    successResponse(res, createProject, 201);
  } catch (err) {
    const deletedProject = await createProject.destroy();
    throw createAppError(
      "issue in upload the project",
      HttpStatus.BadRequest,
      serverErr
    );
  }
});

const deleteProject = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;

  const data = await Project.findOne({
    where: { id },
    include: [
      {
        model: Feedback,
        as: "feedback",
      },
    ],
  });
  if (!data)
    throw createAppError(
      "This project was not found",
      HttpStatus.NotFound,
      notFoundData
    );

  const feedbackImg = data.dataValues?.feedback?.dataValues?.img;
  const banner = data.dataValues?.banner;
  const serviceImg = data.dataValues?.serviceImg;
  const homeImg = data.dataValues?.homeImg;
  const previewImg = data.dataValues?.previewImg;

  const allImages = [feedbackImg, banner, serviceImg, homeImg, previewImg];
  // to delete the images
  allImages.forEach((item) => {
    if (item) {
      clearImage(getFilePath(item));
    }
  });

  const deletedItemData = await data.destroy();
  successResponse(res, deletedItemData);
});

const updateProject = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;

  const data = await Project.findOne({
    where: { id },

    attributes: [
      "id",
      "nameAr",
      "nameEn",
      "shortDescAr",
      "shortDescEn",
      "longDescAr",
      "longDescEn",
      "keyObjectivesAr",
      "keyObjectivesEn",
      "download",
      "duration",
      "rating",
      "displayInHome",
      "color",
      "banner",
      "serviceImg",
      "homeImg",
      "previewImg",

    ],
    include: [
      {
        model: Challenge,
        as: "challenges",
      },
      {
        model: Feedback,
        as: "feedback",

        attributes: [
          "id",
          "name",
          "jobTitle",
          "desc",

          [
            Sequelize.literal(`
              CASE 
                WHEN \`img\` IS NOT NULL AND \`img\` != '' THEN CONCAT('/u/project/', \`img\`)
                ELSE NULL
              END
            `),
            'img', 
          ],
        ],
      },
      {
        model: Language,
        as: "languages",
        attributes: ["id", "nameAr", "nameEn"],
      },
      {
        model: ProjectService,
        as: "services",
        include: [
          {
            model: Service,
            as: "service",
            attributes: [
              "id",
              "nameAr",
              "nameEn",
              [
                Sequelize.literal(`
                  CASE 
                    WHEN \`image\` IS NOT NULL AND \`image\` != '' THEN CONCAT('/u/service/', \`image\`)
                    ELSE NULL
                  END
                `),
                'image', // Alias for the result
              ],
            ],
          },
        ],
      },

      {
        model: ProjectPlatform,
        as: "platforms",
        include: [
          {
            model: Platforms,
            attributes: ["id", "nameAr", "nameEn", "platform"],
          },
        ],
      },
    ],
  });
  if (!data)
    throw createAppError(
      "This project was not found",
      HttpStatus.NotFound,
      notFoundData
    );
  const {
    nameAr,
    nameEn,
    shortDescAr,
    shortDescEn,
    longDescAr,
    longDescEn,
    keyObjectivesAr,
    keyObjectivesEn,
    download,
    duration,
    rating,
    displayInHome,
    color,
    languages,
    platForms,
    services,
    challenges,
  } = req.body;
  const allImgs = req.files || [];
  const banner = allImgs?.banner?.[0]?.filename || "";
  const homeImg = allImgs?.homeImg?.[0]?.filename || "";
  const previewImg = allImgs?.previewImg?.[0]?.filename || "";
  const serviceImg = allImgs?.serviceImg?.[0]?.filename || "";

  await validationChecker(req, res);

  nameAr && (data.nameAr = nameAr);
  nameEn && (data.nameEn = nameEn);
  shortDescAr && (data.shortDescAr = shortDescAr);
  shortDescEn && (data.shortDescEn = shortDescEn);
  longDescAr && (data.longDescAr = longDescAr);
  longDescEn && (data.longDescEn = longDescEn);
  keyObjectivesAr && (data.keyObjectivesAr = keyObjectivesAr);
  keyObjectivesEn && (data.keyObjectivesEn = keyObjectivesEn);
  download && (data.download = download);
  duration && (data.duration = duration);
  rating && (data.rating = rating);
  displayInHome && (data.displayInHome = displayInHome);
  color && (data.color = color);


  /* --------- START VALIDATE SENT IDS FROM THE DATABASE ----------*/
  const validServices = await Service.findAll({
    where: { id: services },
    attributes: ["id"],
  });

  const validPlatforms = await Platforms.findAll({
    where: { id: platForms },
    attributes: ["id"],
  });

  // add Services
  if (Array.isArray(services) && services?.length && validServices?.length) {
    try {
      const currentServices = await ProjectService.findAll({
        where: { projectId: data.id },
        attributes: ["id"],
      });
      const idsToDelete = currentServices.map((service) => service.id);
      if (idsToDelete.length > 0) {
        // Step 3: Bulk delete using destroy
        try {
          const deletedCount = await ProjectService.destroy({
            where: {
              id: {
                [Op.in]: idsToDelete, // Delete all matching IDs
              },
            },
          });
        } catch (err) {
          throw createAppError(err, HttpStatus.BadRequest, serverErr);
        }
      }

      const validServicesIds = validServices.map((service) => {
        return { serviceId: service.id, projectId: data.id };
      });

      const projectService = await ProjectService.bulkCreate(validServicesIds);

      // createProject.dataValues.services = projectService;
    } catch (err) {
      throw createAppError(err, HttpStatus.BadRequest, serverErr);
    }
  }
  //  await successResponse(res, data, 200);

  // add platForms

  if (Array.isArray(platForms) && platForms?.length && validPlatforms?.length) {
    try {
      const validPlatformIds = validPlatforms.map((platform) => {
        return { platformId: platform.id, projectId: data.id };
      });

      const currentPlatforms = await ProjectPlatform.findAll({
        where: { projectId: data.id },
        attributes: ["id"],
      });
      const idsToDelete = currentPlatforms.map((platform) => platform.id);
      if (idsToDelete.length > 0) {
        // Step 3: Bulk delete using destroy
        try {
          const deletedCount = await ProjectPlatform.destroy({
            where: {
              id: {
                [Op.in]: idsToDelete, // Delete all matching IDs
              },
            },
          });
        } catch (err) {
          throw createAppError(err, HttpStatus.BadRequest, serverErr);
        }
      }

      const projectplatform = await ProjectPlatform.bulkCreate(
        validPlatformIds
      );
    } catch (err) {
      throw createAppError(err, HttpStatus.BadRequest, serverErr);
    }
  }

  // create languages
  if (Array.isArray(languages) && languages?.length) {
    try {
      const deletedCount = await Language.destroy({
        where: {
          projectId: data.id,
        },
      });

      const preparedLanguages = languages.map((item) => {
        item.projectId = data.id;
        return item;
      });
      const addedLanguges = await Language.bulkCreate(preparedLanguages);
    } catch (err) {
      throw createAppError(err, HttpStatus.BadRequest, serverErr);
    }
  }
  // create Challenge
  if (Array.isArray(challenges) && challenges?.length) {
    const deletedCount = await Challenge.destroy({
      where: {
        projectId: data.id,
      },
    });

    const preparedChallenges = challenges.map((item) => {
      item.projectId = data.id;
      return item;
    });
    // successResponse(res, preparedChallenges, 200);

    try {
      const addedChallenges = await Challenge.bulkCreate(preparedChallenges);
    } catch (err) {
      throw createAppError(err, HttpStatus.BadRequest, serverErr);
    }
  }

  // remove old imges if it updated

  banner && clearImage(getFilePath(data.banner));
  serviceImg && clearImage(getFilePath(data.serviceImg));
  homeImg && clearImage(getFilePath(data.homeImg));
  previewImg && clearImage(getFilePath(data.previewImg));


  previewImg && (data.previewImg = previewImg);
  serviceImg && (data.serviceImg = serviceImg);
  homeImg && (data.homeImg = homeImg);
  banner && (data.banner = banner);

  const savedData = await data.save();

  getAllProjects(req, res, next);
});

const updateProjectFeedback = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;

  const { name, jobTitle, desc } = req.body;
  const allImgs = req.files || [];

  const clientImg = allImgs?.clientImg?.[0]?.filename || "";

  await validationChecker(req, res);

  const data = await Feedback.findOne({ where: { projectId: id } });

  if (!data)
    throw createAppError(
      "This feedback was not found",
      HttpStatus.NotFound,
      notFoundData
    );

  // to delete the image if there is a new one
  if (clientImg) {
    // to delete the old image to replace it with the new one

    clearImage(getFilePath(data.img));

    data.img = clientImg;
  }

  name && (data.name = name);
  jobTitle && (data.jobTitle = jobTitle);
  desc && (data.desc = desc);

  const savedData = await data.save();

  savedData.img = `/u/project/${savedData.img}`;

  successResponse(res, savedData);
});

module.exports = {
  addProject,
  getAllProjects,
  deleteProject,
  updateProject,
  getSingleProject,
  updateProjectFeedback,
};
