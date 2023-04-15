const Workout = require("../models/workoutModels");
const mongoose = require("mongoose");

// GET all workout

const getWorkouts = async (req, res) => {
  const user_id = req.user._id

  const workouts = await Workout.find({user_id}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// GET single workout

const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "No such document found with this id  ", id });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res
      .status(404)
      .json({ error: "can not find the document with this id ", id });
  }
  res.status(200).json(workout);
};

// POST a workout

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;


  // if(!load) {
  //   emptyList.push('load')
  // }

  // if(!title) {
  //   emptyList.push('title')
  // }

  // if(!reps) {
  //   emptyList.push('reps')
  // }
  // if(emptyList.length > 0 ){
  //   return res.status(400).json({error: "Fill all the fields " , emptyList})
  // }

  try {
    const user_id = req.user._id
    const workout = await Workout.create({ title, reps, load , user_id});
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Can not find the document " });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "Can not find the document " });
  }
  res.status(200).json({ msg: "Deleted " });
};

// PATCH a workout

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Can not find the document " });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    return res.status(404).json({ error: "Can not find the document " });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
