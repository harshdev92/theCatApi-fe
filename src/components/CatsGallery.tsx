import UnFavoriteIcon from './icons/UnFavouriteIcon'
import ThumbsDownIcon from './icons/ThumbsDownIcon'
import ThumbsUpIcon from './icons/ThumbsUpIcon'
import FavouriteIcon from './icons/FavouriteIcon'

type CatProps = {
    name: string
    id: string
    url: string
    width: number
    height: number
    breeds: Array<Breed>
    upvotes: number
    categories: Array<Category>
    isFavourite: boolean
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

type CatGalleryProps = {
    cats: Array<CatProps>
    handleCatUpVote: (id: string) => void
    handleCatDownVote: (id: string) => void
    handleCatFavourite: (id: string) => void
    handleCatUnFavourite: (id: string) => void
}

const CatGallery = ({
    cats,
    handleCatDownVote,
    handleCatUpVote,
    handleCatFavourite,
    handleCatUnFavourite,
}: CatGalleryProps) => (
    <section className="overflow-hidden text-gray-700 ">
        <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div className="flex flex-wrap -m-1 md:-m-2">
                {cats.map((cat: CatProps) => (
                    <div className="flex flex-wrap w-1/3" key={cat.id}>
                        <div className="w-full p-1 md:p-2">
                            <img
                                className="block object-cover object-center w-full h-full rounded-lg"
                                src={cat.url}
                                alt={cat.id}
                            />
                        </div>
                        <ThumbsUpIcon
                            id={cat.id}
                            handleCatUpVote={handleCatUpVote}
                        />
                        <ThumbsDownIcon
                            id={cat.id}
                            handleCatDownVote={handleCatDownVote}
                        />
                        <p className="ml-3">{cat.upvotes}</p>
                        {!cat.isFavourite ? (
                            <UnFavoriteIcon
                                id={cat.id}
                                handleCatUnFavourite={handleCatUnFavourite}
                            />
                        ) : (
                            <FavouriteIcon
                                id={cat.id}
                                handleCatFavourite={handleCatFavourite}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    </section>
)

export default CatGallery
