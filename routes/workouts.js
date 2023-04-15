const express = require("express");

const routes = express.Router();

const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutControllers");
const requireAuth = require('../middleware/requireAuth')

routes.use(requireAuth)

// get All workouts
routes.get("/", getWorkouts);

// GET single workout

routes.get("/:id", getWorkout);

// POST a workout

routes.post("/", createWorkout);

// DELETE a workout

routes.delete("/:id", deleteWorkout);

// update a workout

routes.patch("/:id", updateWorkout);

module.exports = routes;
