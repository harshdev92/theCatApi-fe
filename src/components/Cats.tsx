import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
    getCats,
    upVoteCat,
    downVoteCat,
    getVotes,
    getFavourites,
    updateFavorite,
    deleteFavourite,
} from '../services/catServices'
import CatGallery from './CatsGallery'
import LoadingIcon from './icons/LoadingIcons'

type Cat = {
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

const Cats = () => {
    const [cats, setCats] = useState<Cat[]>([])
    const [favourites, setFavourites] = useState<Cat[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        handleRequest()
    }, [])

    const handleRequest = async () => {
        setLoading(true)
        const cats = await getCats()
        const votes = await getVotes()
        const favourites = await getFavourites()
        const newCats = cats.data.map((cat: Cat) => {
            let counter = 0
            for (let i = 0; i < votes.data.length; i++) {
                if (votes.data[i].image_id === cat.id) {
                    counter += votes.data[i].value
                }
            }
            let isFavourite = false
            for (let i = 0; i < favourites.data.length; i++) {
                if (favourites.data[i].image_id === cat.id) {
                    isFavourite = true
                }
            }
            return { ...cat, upvotes: counter, isFavourite }
        })

        setCats(newCats)
        setFavourites(favourites.data)
        setLoading(false)
    }

    const handleCatUpVote = async (id: string) => {
        const updatedCats = cats.map((cat) => {
            if (cat.id === id) {
                cat.upvotes = cat.upvotes + 1
            }
            return cat
        })
        setCats(updatedCats)

        try {
            await upVoteCat(id)
            toast.success('Cat voted successfully')
        } catch (error) {
            toast.error('Error upvoting cat')
        }
    }

    const handleCatDownVote = async (id: string) => {
        const updatedCats = cats.map((cat) => {
            if (cat.id === id) {
                cat.upvotes = cat.upvotes - 1
            }
            return cat
        })
        setCats(updatedCats)
        try {
            await downVoteCat(id)
            toast.success('Cat downvoted successfully')
        } catch (error) {
            toast.error('Error downvoting cat')
        }
    }

    const handleCatUnFavourite = async (id: string) => {
        const updatedCats = cats.map((cat) => {
            if (cat.id === id) {
                cat.isFavourite = true
            }
            return cat
        })
        setCats(updatedCats)
        try {
            await updateFavorite(id)
            toast.success('Cat Added as favourites')
        } catch (error) {
            toast.error('Error adding cat as favourite')
        }
    }

    const handleCatFavourite = async (id: string) => {
        const updatedCats = cats.map((cat) => {
            if (cat.id === id) {
                cat.isFavourite = false
            }
            return cat
        })
        setCats(updatedCats)
        favourites.find((favourite) => {
            if (favourite.image_id === id) {
                try {
                    deleteFavourite(favourite.id)
                    toast.success('Cat removed from favourites')
                } catch (error) {
                    toast.error('Error removing cat from favourites')
                }
            }
        })
    }

    return (
        <div className="container">
            <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
                <h2 className="text-5xl mb-3 text-black">Cat Application</h2>
                <Link
                    to={'/uploads'}
                    className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded"
                >
                    Upload A Cat Image{' '}
                </Link>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <LoadingIcon width="w-40" height="w-40" />
                </div>
            ) : (
                <CatGallery
                    cats={cats}
                    handleCatUpVote={handleCatUpVote}
                    handleCatDownVote={handleCatDownVote}
                    handleCatFavourite={handleCatFavourite}
                    handleCatUnFavourite={handleCatUnFavourite}
                />
            )}
        </div>
    )
}

export default Cats
