const BigPromise = require('../Middleware/bigPromise');
const CustomError = require('../Utils/CustomError');
const validator = require('validator');
const User = require('../Models/User');
const cookieToken = require('../Utils/CookieToken');

exports.checkEmail = BigPromise(async (req, res, next) => {
    const { email } = req.body;

    if (!email) return next(CustomError(res, 'Email is required', 401));

    if (!validator.isEmail(email))
        return next(CustomError(res, 'Email is not valid', 401));

    const user = await User.findOne({ email });

    if (user) return next(CustomError(res, 'Email already exits', 401));

    res.status(200).json({
        success: true,
        message: 'Email doesnot exits',
    });
});

exports.checkMobile = BigPromise(async (req, res, next) => {
    const { mobile } = req.body;

    if (!mobile)
        return next(CustomError(res, 'Mobile number is required', 401));

    const user = await User.findOne({ mobile });

    if (user) return next(CustomError(res, 'Mobile number already exits', 401));

    res.status(200).json({
        success: true,
        message: 'Mobile number doesnot exits',
    });
});

exports.authenticateUser = BigPromise(async (req, res, next) => {
    const { email, mobile, password, userType } = req.body;

    if (!((email || mobile) && password && userType))
        return next(CustomError(res, 'All fields are required', 403));

    if (userType !== 'MOBILE' && userType !== 'EMAIL')
        return next(CustomError(res, 'Invalid User', 403));

    let user;

    if (userType === 'MOBILE') {
        user = await User.findOne({ mobile });
    } else if (userType === 'EMAIL') {
        if (!validator.isEmail(email)) {
            return next(CustomError(res, 'Invalid User', 403));
        }

        user = await User.findOne({ email });
    }

    if (user) return next(CustomError(res, 'User already exits', 403));

    if (userType === 'MOBILE') {
        user = await User.create({
            mobile,
            password: password,
        });
    } else if (userType === 'EMAIL') {
        user = await User.create({
            email,
            password,
        });
    }

    cookieToken(user, res);
});

exports.getAccessToken = BigPromise(async (req, res, next) => {
    const { refresh } = req.cookies;

    if (!refresh) return next(CustomError(res, 'You are not authorized', 401));

    if (!isValidRefresh) {
        return next(CustomError(res, 'Token expired ! Login Again', 401));
    }

    const user = await User.findOne({ user_id: isValidRefresh.user_id });

    if (!user) {
        return next(CustomError(res, 'You are not authorized', 401));
    }

    const jwtAccessToken = user.getAccessToken();

    const AccessOptions = {
        expires: new Date(
            Date.now() + process.env.ACCESS_COOKIE_EXPIRE_DAY * 60 * 1000,
        ),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    };

    user.password = undefined;

    return res
        .status(200)
        .cookie('access', jwtAccessToken, AccessOptions)
        .json({
            success: true,
            user,
        });
});
