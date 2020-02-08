module.exports = (req, res) => {
    res.status(200);
    res.json({user: { id: '1', name: 'Ray'}});
}
