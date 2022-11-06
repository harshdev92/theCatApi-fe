import react, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
    getCats,
    upVoteCat,
    downVoteCat,
    getVotes,
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
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        getCats().then((response) => {
            response.data.map((cat: Cat) => {
                cat.upvotes = 0
            })

            setCats(response.data)
        })
        getVotes().then((response) => {
            const votes = response.data
            const newCats = cats.map((cat) => {
                let counter = 0
                for (let i = 0; i < votes.length; i++) {
                    if (votes[i].image_id === cat.id) {
                        counter += votes[i].value
                    }
                }
                return { ...cat, upvotes: counter }
            })
            setCats(newCats)
        })
        setLoading(false)
    }, [])

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
                />
            )}
        </div>
    )
}

export default Cats
