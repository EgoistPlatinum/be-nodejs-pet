const extractNames = (collection = [] as Array<{ name: { common: string } }>) => {
    return collection.map(el => el.name.common)
}

export default extractNames;