const getSecret = (): string => {
    return process.env['JWT_SECRET']
}

export {
    getSecret
}
