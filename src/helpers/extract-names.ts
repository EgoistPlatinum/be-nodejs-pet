const extractNames = (collection = [] as Array<{ name: string }>) => {
    return collection.map(el => el.name)
}

export default extractNames;