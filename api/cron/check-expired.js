module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    message: "check-expired is alive (vercel api folder)",
  });
};
