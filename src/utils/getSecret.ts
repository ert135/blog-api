const getSecret = (): string => {
    return process.env['jwt_secret']
}

export {
    getSecret
}
