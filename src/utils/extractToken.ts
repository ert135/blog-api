let extractToken = (req): string => {
    return req.body.token || req.query.token || req.headers['x-access-token']
}

export {
    extractToken
}