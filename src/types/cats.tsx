export type Cat = {
    name: string
    id: string
    url: string
    width: number
    height: number
    breeds: Array<Breed>
    categories: Array<Category>
    upvotes: number
    isFavourite: boolean
    image_id: string
}

type Breed = {
    id: string
    name: string
    temperament: string
    origin: string
    life_span: string
}

type Category = {
    id: number
    name: string
}

export type CatGalleryProps = {
    cats: Array<Cat>
    handleCatUpVote: (id: string) => void
    handleCatDownVote: (id: string) => void
    handleCatFavourite: (id: string) => void
    handleCatUnFavourite: (id: string) => void
}
