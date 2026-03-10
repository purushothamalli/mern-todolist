const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const createRefreshToken = (_id) => {
    return jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "3d",
    });
};

const createAccessToken = (_id) => {
    return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ email, accessToken });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password);
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ email, accessToken });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const refreshUser = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.refreshToken)
        return res.status(401).json({ error: "Refresh token is required." });

    const refreshToken = cookies.refreshToken;
    try {
        const { _id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = createAccessToken(_id);
        res.status(200).json({ accessToken });
    } catch (err) {
        res.status(403).json({ error: "Invalid or expired refresh token." });
    }
};

const logoutUser = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.refreshToken) return res.sendStatus(204);

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    res.sendStatus(204);
};

module.exports = { loginUser, signupUser, refreshUser, logoutUser };
