const validateName = (req, res, next) => {
  const product = req.body;

  const nameProperty = Object.keys(product).some((e) => e === 'name');
  
  if (!nameProperty) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const minimumLength = product.name.length > 5;
  if (!minimumLength) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

module.exports = {
  validateName,
};