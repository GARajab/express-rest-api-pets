const Pet = require("../models/pet.js")

const express = require("express")

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const createdPet = await Pet.create(req.body)
    res.status(201).json(createdPet)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/", async (req, res) => {
  try {
    const foundPets = await Pet.find({})
    res.status(200).json(foundPets)
  } catch (error) {
    res.status(500).json({ error: error.message }) // 500 Internal Server Error
  }
})

router.get("/:petId", async (req, res) => {
  try {
    const foundPet = await Pet.findById(req.params.petId)
    if (!foundPet) {
      res.status(404).json({ error: "Pet not found." })
    }
    res.status(200).json(foundPet)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/:petId", async (req, res) => {
  try {
    const updatePet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {
      new: true,
    })
    if (!updatePet) {
      res.status(400).json("pet not found")
    }
    res.status(200).json(updatePet)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete("/:petId", async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.petId)
    res.status(200)
    if (!deletedPet) {
      res.status(404).json("Pet not found.")
    }
    res
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

module.exports = router
