/*
    FLOW ->
    generate access and refresh token
    send refresh token in cookie and access token in json
    store access token in cookkie and refresh token in cookie
    send access to verify protected routes
    if acess token expires send request with refresh token to ask access token
*/

const cookieToken = (user, res) => {
    const accessJwtToken = user.getAccessToken();
    const refreshJwtToken = user.getRefreshToken();

    const refreshCookieOptions = {
        // expires: new Date(
        // Date.now() + process.env.COOKIE_EXPIRE_DAY * 24 * 60 * 60 * 1000,
        // ),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    };

    const accessCookieOptions = {
        // expires: new Date(
        // Date.now() + process.env.ACCESS_COOKIE_EXPIRE_DAY * 60 * 60 * 1000,
        // ),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    };

    user.password = undefined;

    return res
        .status(200)
        .cookie('refresh', refreshJwtToken, refreshCookieOptions)
        .cookie('access', accessJwtToken, accessCookieOptions)
        .json({
            success: true,
            user,
        });
};

module.exports = cookieToken;
