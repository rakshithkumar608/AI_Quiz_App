import generateToken from "../utils/generateTokens";


resizeBy.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  token: generateToken(user._id),
});