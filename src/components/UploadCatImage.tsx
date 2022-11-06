import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { uploadCat } from '../services/catServices'
import LoadingIcon from '../icons/LoadingIcons'
import UploadIcon from '../icons/UploadIcon'

const UploadCatImage = () => {
    const [image, setImage] = useState<any>()
    const [uploading, setUploading] = useState(false)
    const navigate = useNavigate()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (image) {
            setUploading(true)
            try {
                await uploadCat(image)
                toast.success('Cat image uploaded successfully')
                setUploading(false)
                navigate('/')
            } catch (error) {
                toast.error('Error uploading cat image')
                setUploading(false)
            }
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex w-1/2 flex-col">
                <label className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    {!image ? (
                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <UploadIcon width="w-10" height="w-10" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                    Click to upload
                                </span>{' '}
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <UploadIcon width="w-10" height="w-10" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                    File Name:{' '}
                                </span>
                                {image?.name}
                            </p>
                        </div>
                    )}
                    <input
                        onChange={handleFileChange}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                    />
                </label>
                <button
                    onClick={handleUpload}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    {uploading ? (
                        <LoadingIcon width="w-4" height="w-4" />
                    ) : (
                        'Upload'
                    )}
                </button>
                <Link
                    to={'/'}
                    className="text-center text-indigo-900 cursor-pointer hover:text-indigo-400"
                >
                    View All Upload Cat Images
                </Link>
            </div>
        </div>
    )
}

export default UploadCatImage
