import react, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getCats } from '../services/catServices'
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
            setCats(response.data)
            setLoading(false)
        })
    }, [])

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
                <CatGallery cats={cats} />
            )}
        </div>
    )
}

export default Cats
