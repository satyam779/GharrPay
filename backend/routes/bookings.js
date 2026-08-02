const express = require("express");
const Booking = require("../models/Booking");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

// GET /api/bookings — list all bookings (newest first)
router.get("/", authRequired, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bookings — create a booking inquiry
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      phone,
      city,
      roomType,
      moveInDate,
      notes,
    } = req.body || {};
    const booking = new Booking({
      fullName,
      phone,
      city,
      roomType,
      moveInDate,
      notes,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/bookings/:id — update status (new/contacted/closed)
router.patch("/:id", authRequired, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["new", "contacted", "closed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/bookings/:id — remove a booking
router.delete("/:id", authRequired, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
