const getSecret = (): string => {
    console.log('callling get secret', process.env['jwt_secret'])
    return process.env['jwt_secret']
}

export {
    getSecret
}
